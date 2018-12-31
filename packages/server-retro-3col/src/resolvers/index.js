import userResolver from './user';

export default {
    RootQuery: {
        ...userResolver.RootQuery
    },
    RootMutation: {
        ...userResolver.RootMutation
    }
};