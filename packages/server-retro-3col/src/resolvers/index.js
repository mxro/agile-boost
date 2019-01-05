import userResolver from './user';
import boardResolver from './board';
import columnResolver from './column';
import entryResolver from './entry';

export default {
    RootQuery: {
        ...userResolver.RootQuery,
        ...boardResolver.RootQuery,
        ...columnResolver.RootQuery, 
        ...entryResolver.RootQuery,
    },
    RootMutation: {
        ...userResolver.RootMutation,
        ...boardResolver.RootMutation,
        ...columnResolver.RootMutation,
        ...entryResolver.RootMutation
    }
};