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

export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: String
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`

export const resolvers = {
  Query: {
    books: () => books,
  },
}