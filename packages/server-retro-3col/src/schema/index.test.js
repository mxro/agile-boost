import { buildSchema } from 'graphql';
import typeDefs from './';
it('Schema compiles', () => {
    buildSchema(typeDefs);
});