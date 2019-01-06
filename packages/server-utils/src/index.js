
const dateToString = date => new Date(date).toISOString();

const extractDoc = (obj) => {
    return {
        ...obj._doc,
        _id: obj.id
    }
}

const fixDates = (obj) => {
    return {
        ...obj,
        createdAt: dateToString(obj.createdAt),
        updatedAt: dateToString(obj.updatedAt)
    }
}

const mongo = {
    extractDoc,
    fixDates
};


const rootTypes = () => `
    type RootQuery {
        _empty: String
    }

    type RootMutation {
        _empty: String
    }

    schema {
        query: RootQuery,
        mutation: RootMutation
    }
`;

const graphqlUtils = {
    rootTypes
};

export {
   mongo,
   graphqlUtils 
};