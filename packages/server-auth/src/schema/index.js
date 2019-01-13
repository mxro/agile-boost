export default `
type User {
    _id: ID!
    username: String
    sessionId: String!
}

extend type RootQuery {
    user(sessionId: String!): User
}

input UserInput {
    sessionId: String!
    username: String
}

extend type RootMutation {
    createUser(userInput: UserInput): User
}
`;