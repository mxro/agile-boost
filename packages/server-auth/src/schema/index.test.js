import { buildSchema } from 'graphql';
import { graphqlUtils } from 'server-utils';
import typeDefs from './';
it('Schema compiles', () => {
    

    buildSchema(graphqlUtils.rootTypes() + typeDefs);


});