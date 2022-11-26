import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'

import { Context } from './types.js'

type Author = {
  id: string
  name: string
}

type Book = {
  id: string
  title: string
  authors: Array<Author['id']>
}

const authors: Array<Author> = [
  {
    id: 'a0',
    name: 'Kate Chopin',
  },
  {
    id: 'a1',
    name: 'Paul Auster',
  },
]

const books: Array<Book> = [
  {
    id: 'b0',
    title: 'The Awakening',
    authors: ['a0'],
  },
  {
    id: 'b1',
    title: 'City of Glass',
    authors: ['a1'],
  },
]

const authorSchema = {
  type: new GraphQLObjectType({
    name: 'Author',
    description: 'An author',
    fields: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: new GraphQLNonNull(GraphQLString) },
    },
  }),
  args: {
    id: { type: GraphQLString },
  },
  resolve: (
    parent: Book | undefined,
    { id }: { id: string },
    context: Context,
    info: any,
  ) => {
    console.log(parent, context, info)
    return authors.find(a => a.id === id)
  },
}

const bookSchema = {
  type: new GraphQLObjectType({
    name: 'Book',
    description: 'A book',
    fields: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      authors: {
        type: new GraphQLList(authorSchema.type),
        resolve: (parent: Book) => {
          return parent.authors.map(aId => authors.find(({ id }) => aId === id))
        },
      },
    },
  }),
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (parent: any, { id }: { id: string }) => {
    return books.find(b => b.id === id)
  },
}

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      author: authorSchema,
      book: bookSchema,
    },
  }),
})
