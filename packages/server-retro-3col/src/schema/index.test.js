import { buildSchema } from 'graphql';
import { authSchema } from 'server-auth';
import { graphqlUtils } from 'server-utils';
import typeDefs from './';

it('Schema compiles', () => {

    const stitchedSchema = graphqlUtils.rootTypes() + authSchema + typeDefs;


    buildSchema(stitchedSchema); 



});