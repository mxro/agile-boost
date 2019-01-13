import { mongo } from 'server-utils';

import User from '../models/user';


export default {
    RootQuery: {
        user: async (obj, { sessionId }, context, info) => {
            const mongoose = context.mongoose;
            const res = await User.findOne({ sessionId: sessionId });
            if (!res) {
                throw new Error('User not found for sessionId: '+sessionId);
            }
            const doc = mongo.extractDoc(res);

            return mongo.fixDates(doc);

        },
    },
    RootMutation: {
        createUser: async (obj, {userInput: {sessionId, username}}, context, info) => {
            const user = new User({
                sessionId: sessionId,
                username: username 
            });
            const res =  mongo.fixDates(mongo.extractDoc(await user.save()));
            return res;
        }
    }
      
};