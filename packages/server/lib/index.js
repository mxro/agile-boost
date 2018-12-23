import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
const app = express();
const port = 4000;

const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

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
        books: () => books,
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.applyMiddleware({ app })

app.get('/hello', (req, res) => res.send('Hello World!'))


// Serving react client
if (process.env.NODE_ENV === 'production') {

    app.use(express.static(path.join(__dirname, '../../client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))