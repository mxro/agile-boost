import utils from './utils';

import Column from '../models/column';
// required to initialize entry
import Entry from '../models/entry';
export default {
    RootQuery: {
        column: async (obj, args, context, info) => {
            const doc = await Column.findOne({ _id: args.columnId}).populate('entries');
            const extractedDoc = utils.extractDoc(doc);
            extractedDoc.entries = extractedDoc.entries.map( entry => utils.fixDates(utils.extractDoc(entry)));
            if (!doc) {
                throw new Error(`Cannot find column with id ${args.columnId}`);
            }
            return utils.fixDates(extractedDoc);
        }
    },
    RootMutation: {
    }
};