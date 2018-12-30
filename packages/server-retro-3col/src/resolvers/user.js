import utils from './utils';

import User from '../models/user';

export default {
    user: async (obj, {sessionId}, context, info) => {
        const mongoose = context.mongoose;

        const doc = utils.extractDoc(await mongoose.findOne({sessionId: sessionId}));

        return utils.fixDates(doc);

    },
    createUser: async (obj, {sessionId, email}, context, info) => {

        const user = new User({
            sessionId: sessionId,
            email: email
        });

        return utils.fixDates(utils.extractDoc(await user.save()));
        
    }

};