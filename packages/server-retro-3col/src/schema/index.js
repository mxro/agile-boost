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

`;