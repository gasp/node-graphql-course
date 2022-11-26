import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'

const books = [
  {
    id: 'a0',
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    id: 'b1',
    title: 'City of Glass',
    author: 'Paul Auster',
  },
]

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      book: {
        type: new GraphQLObjectType({
          name: 'Book',
          description: 'A book',
          fields: {
            id: { type: GraphQLID },
            title: { type: new GraphQLNonNull(GraphQLString) },
          },
        }),
        args: {
          id: { type: GraphQLString },
        },
        // https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-arguments
        resolve: (_, { id }) => {
          return books.find(b => b.id === id)
        },
      },
    },
  }),
})
