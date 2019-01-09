import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import path from 'path';
import { graphqlUtils } from 'server-utils';
import { retro3ColResolvers, retro3ColSchema } from 'server-retro-3col';
import { authResolvers, authSchema } from 'server-auth';
import { merge } from 'lodash';


import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';

const app = express();
let port;
if (!process.env.PORT) {
    port = 4000;
} else {
    port = process.env.PORT
}

let typeDefs = gql(graphqlUtils.rootTypes() + authSchema + retro3ColSchema);

let resolvers = merge(authResolvers, retro3ColResolvers);


const init = async () => {
    const mongod = new MongoMemoryServer();
    const mongoport = await mongod.getPort();
    const dbName = await mongod.getDbName();

    console.log(`Connecting to mongodb on port ${mongoport}`);
    mongoose.connect(`mongodb://localhost:${mongoport}/${dbName}`, { useNewUrlParser: true });

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: {
            mongoose
        }

    });

    server.applyMiddleware({ app })

    app.get('/hello', (req, res) => res.send('Hello World!'))


    // Serving react client
    if (process.env.NODE_ENV === 'production') {

        app.use(express.static(path.join(__dirname, '../../client-main/build')));

        app.get('*', function (req, res) {
            res.sendFile(path.join(__dirname, '../../client-main/build', 'index.html'));
        });
    }

    app.listen(port, () => console.log(`Example app listening on port ${port}!`))

}
console.log('starting server ...');
init().then(res => {}).catch((e) => console.log(e));