
import books from './resolvers/books'


const typeDefs = `

  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

`;

const resolvers = {
    Query: {
        books,
    },
};


export default {typeDefs, resolvers};