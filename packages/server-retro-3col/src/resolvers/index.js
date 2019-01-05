import userResolver from './user';
import boardResolver from './board';
export default {
    RootQuery: {
        ...userResolver.RootQuery,
        ...boardResolver.RootQuery
    },
    RootMutation: {
        ...userResolver.RootMutation,
        ...boardResolver.RootMutation
    }
};