export default `
type User {
    _id: ID!
    email: String
    sessionId: String!
}

extend type RootQuery {
    user(sessionId: String!): User
}

input UserInput {
    sessionId: String!
    email: String
}

extend type RootMutation {
    createUser(userInput: UserInput): User
}
`;