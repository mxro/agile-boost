import Entry from '../models/entry';
import {mongo} from 'server-utils';

import Column from '../models/column';

export default {
    RootQuery: {
    },
    RootMutation: {
        createEntry: async (obj, { entryInput: { text, creatorId, columnId } }, context, info) => {

            let entry = new Entry({
                text: text,
                creator: creatorId
            });
            
            entry = await entry.save();

            const column = await Column.findOne({_id: columnId});

            column.entries.push(entry);
            
            await column.save();

            return mongo.fixDates(mongo.extractDoc(entry)); 
            

        }
    }
};