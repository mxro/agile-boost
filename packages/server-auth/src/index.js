import schema from './schema';

import authResolver from './resolvers/user';

import User from './models/user';

const authSchema = schema;
const authResolvers = authResolver;
const authModels = [User];

export {
    authSchema,
    authResolvers,
    authModels,
    User
};