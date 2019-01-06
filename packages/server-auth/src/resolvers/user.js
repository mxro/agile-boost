import { mongo } from 'server-utils';

import User from '../models/user';


export default {
    RootQuery: {
        user: async (obj, { sessionId }, context, info) => {
            const mongoose = context.mongoose;

            const doc = mongo.extractDoc(await User.findOne({ sessionId: sessionId }));

            return mongo.fixDates(doc);

        },
    },
    RootMutation: {
        createUser: async (obj, {userInput: {sessionId, email}}, context, info) => {
            const user = new User({
                sessionId: sessionId,
                email: email
            });
            const res =  mongo.fixDates(mongo.extractDoc(await user.save()));
            return res;
        }
    }
      
};