export default `

type Board {
    _id: ID!
    creator: User!
    createdAt: String!
    updatedAt: String!
    columns: [Column!]
}

type User {
    _id: ID!
    email: String
    sessionId: String!
}

type Column {
    _id: ID!
    title: String!
    icon: String!
    entries: [Entry!]
}

type Entry {
    _id: ID!
    text: String!
    creator: User!
    createdAt: String!
    updatedAt: String!
}

type RootQuery {
    boards: [Board!]!
    user(sessionId: String!): User
}

type UserInput {
    sessionId: String!
    email: String
}

type BoardInput {
    title: String!
    creator: User!
}

type RootMutation {
    createUser(userInput: UserInput!): User
    createBoard(boardInput: BoardInput!): Board
}

schema {
    query: RootQuery
    mutation: RootMutation
}

`;