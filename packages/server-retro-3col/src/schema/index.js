export default `

type Board {
    _id: ID!
    title: String!
    creator: User!
    createdAt: String!
    updatedAt: String!
    columns: [Column!]
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

extend type RootQuery {
    boards(creatorId: String!): [Board!]!
    board(boardId: String!): Board
    column(columnId: String!): Column
}

input BoardInput {
    title: String!
    creatorId: String!
}

input EntryInput {
    text: String!
    creatorId: String!
    columnId: String!
}

extend type RootMutation {
    createBoard(boardInput: BoardInput): Board
    createEntry(entryInput: EntryInput): Entry
}


`;