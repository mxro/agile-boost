export default `

type Board {
    _id: ID!
    title: String!
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
    board(boardId: String!): Board
    user(sessionId: String!): User
}

input UserInput {
    sessionId: String!
    email: String
}

input BoardInput {
    title: String!
    creatorId: String!
}

type RootMutation {
    createUser(userInput: UserInput): User
    createBoard(boardInput: BoardInput): Board
}

schema {
    query: RootQuery
    mutation: RootMutation
}

`;