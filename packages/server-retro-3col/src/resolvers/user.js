import utils from './utils';

import User from '../models/user';


export default {
    RootQuery: {
        user: async (obj, { sessionId }, context, info) => {
            const mongoose = context.mongoose;

            const doc = utils.extractDoc(await User.findOne({ sessionId: sessionId }));

            return utils.fixDates(doc);

        },
    },
    RootMutation: {
        createUser: async (obj, {userInput: {sessionId, email}}, context, info) => {
            const user = new User({
                sessionId: sessionId,
                email: email
            });
            const res =  utils.fixDates(utils.extractDoc(await user.save()));
            return res;
        }
    }
      
};