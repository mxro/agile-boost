import { mongo } from 'server-utils';

import Column from '../models/column';
// required to initialize entry
import Entry from '../models/entry';
export default {
    RootQuery: {
        column: async (obj, args, context, info) => {
            const doc = await Column.findOne({ _id: args.columnId}).populate('entries');
            const extractedDoc = mongo.extractDoc(doc);
            extractedDoc.entries = extractedDoc.entries.map( entry => mongo.fixDates(mongo.extractDoc(entry)));
            if (!doc) {
                throw new Error(`Cannot find column with id ${args.columnId}`);
            }
            return mongo.fixDates(extractedDoc);
        }
    },
    RootMutation: {
    }
};