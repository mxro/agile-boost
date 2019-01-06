import { makeExecutableSchema } from 'graphql-tools'
import { graphql } from 'graphql'
import retro3ColResolvers from '../src/resolvers'
import { authResolvers, authSchema } from 'server-auth'
import typeDefs from '../src/schema'
import { graphqlUtils } from 'server-utils';
import { merge } from 'lodash';
import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';

let mongod;

let lastResult = {};

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
        assert: (result) => expect(result).toEqual({ data: { createUser: { sessionId: "dummysessionid" } } })
    },
    {
        query: `
            query {
                user(sessionId: "dummysessionid") {
                    email
                }
            }
        `,
        variables: {
        },
        assert: (result) => expect(result).toEqual({ data: { user: { email: "test@test.com" } } })
    },
    {
        query: `
            query {
                user(sessionId: "dummysessionid") {
                    _id
                }
            }
        `,
        variables: {
        },
        assert: (result) => expect(result.data.user._id).not.toBeUndefined()
    },
    {
        query: `
            mutation CreateBoard($boardInput: BoardInput) {
                createBoard(boardInput: $boardInput) {
                    _id
                }
             }
        `,
        variables: {
            boardInput: {
                title: "Test board",
                creatorId: () => lastResult.data.user._id
            }
        },
        assert: (result) => expect(result.data.createBoard._id).not.toBeUndefined()
    },
    {
        query: `
            query {
                boards {
                    _id
                    title
                }
            }
        `,
        variables: {
        },
        assert: (result) => {
            expect(result.data.boards.length).toBeGreaterThan(0)
            expect(result.data.boards[0]._id).not.toBeUndefined();
            expect(result.data.boards[0].title).toEqual("Test board")
        }
    },
    {
        query: `
            query Board($boardId: String!) {
                board(boardId: $boardId) {
                    _id
                    title
                    columns {
                        _id
                        title
                    }
                }
            }
        `,
        variables: {
            boardId: () => lastResult.data.boards[0]._id
        },
        assert: (result) => {
            expect(result.data.board.title).toEqual("Test board");
            expect(result.data.board.columns.length).toBe(3);

        }
    },
    {
        query: `
            query ColumnAndUser($columnId: String!) {
                column(columnId: $columnId) {
                    _id
                    title
                }
                user(sessionId: "dummysessionid") {
                    _id
                }
            }
        `,
        variables: {
            columnId: () => lastResult.data.board.columns[0]._id
        },
        assert: (result) => {
            expect(result.data.column.title).not.toBeUndefined();
            expect(result.data.column._id).not.toBeUndefined();
        }
    },
    {
        query: `
            mutation CreateEntry($entryInput: EntryInput) {
                createEntry(entryInput: $entryInput) {
                    _id
                }
             }
        `,
        variables: {
            entryInput: {
                    text: "Test Entry",
                    creatorId: () => lastResult.data.user._id,
                    columnId: () => lastResult.data.column._id,
            }
        },
        assert: (result) => {
            expect(result.data.createEntry._id).not.toBeUndefined();
        }
    },
    ],
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

const resolvers = merge(authResolvers, retro3ColResolvers);
const cases = [userTestCase]
const schema = makeExecutableSchema({ typeDefs: graphqlUtils.rootTypes() + authSchema + typeDefs, resolvers: resolvers })

const evaluateVariables = (variables) => {
    Object.keys(variables).forEach(key => {

        if (typeof variables[key] === 'function') {
            variables[key] = variables[key]();
        }
        Object.keys(variables[key]).forEach(varkey => {
            if (typeof variables[key][varkey] === 'function') {
                variables[key][varkey] = variables[key][varkey]();
            }
        });

    });
    return variables;
};

describe('Test Cases', async () => {

    it('Test initialized', () => {});

    cases.forEach(obj => {
        const { id, queries, variables, context } = obj
        context.mongoose = mongoose;
        test(`query: ${id}`, async () => {
            for (let query of queries) {

                const result = await graphql(schema, query.query, null, context, evaluateVariables(query.variables));
                if (query.assert) {
                    query.assert(result);
                }
                lastResult = result;
            }
        })
    })

});


