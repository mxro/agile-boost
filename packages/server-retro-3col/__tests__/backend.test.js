import { makeExecutableSchema } from 'graphql-tools'
import { graphql } from 'graphql'
import resolvers from '../src/resolvers'
import typeDefs from '../src/schema'

import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';

let mongod;

const userTestCase = {
    id: 'Create and query user',
    queries: [{
        query: `
            mutation CreateUser($userInput: UserInput) {
                createUser(userInput: $userInput) {
                    sessionId
                }
            }
        `,
        variables: {
            userInput: {
                sessionId: "dummysessionid",
                email: "test@test.com" 
            }
        },
        expectedResult: { data: { createUser: { sessionId: "dummysessionid" } } }
    }
    ],
    variables: {},
    context: {}
};

beforeAll(async () => {
    mongod = new MongoMemoryServer();
    const uri = await mongod.getConnectionString();
    const port = await mongod.getPort();
    const dbPath = await mongod.getDbPath();
    const dbName = await mongod.getDbName();
    return mongoose.connect(`mongodb://localhost:${port}/${dbName}`, { useNewUrlParser: true });
})

afterAll(async () => {
    await mongoose.disconnect();
    return mongod.stop();
})



const cases = [userTestCase]
const schema = makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers })
describe('Test Cases', async () => {

    cases.forEach(obj => {
        const { id, queries, variables, context } = obj
        context.mongoose = mongoose;
        test(`query: ${id}`, async () => {
            for (let query of queries) {
                const result = await graphql(schema, query.query, null, context, query.variables);
                expect(result).toEqual(query.expectedResult)
            }
        })
    })

});


