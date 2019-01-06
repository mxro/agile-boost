import {mongo} from 'server-utils';

import Board from '../models/board';
import Column from '../models/column';

export default {
    RootQuery: {
        boards: async (obj, { }, context, info) => {

            const docs = await Board.find({});
            return docs.map(doc => {
                return mongo.fixDates(mongo.extractDoc(doc));
            });

        },
        board: async (obj, args, context, info) => {
            const doc = await Board.findOne({ _id: args.boardId }).populate('columns');
            const extractedDoc = mongo.extractDoc(doc); 
            extractedDoc.columns = extractedDoc.columns.map( column => mongo.fixDates(mongo.extractDoc(column)));
            if (!doc) {
                throw new Error(`Cannot find board with id ${args.boardId}`);
            }
            return mongo.fixDates(extractedDoc);
        }
    },
    RootMutation: {
        createBoard: async (obj, { boardInput: { title, creatorId } }, context, info) => {
            const downwardColumn = new Column({
                title: "Downward",
                icon: "rocket-down",
                filter: "only-creator-entries",
                entries: []
            });
            const sidewaysColumn = new Column({
                title: "Sideways",
                icon: "rocket-sideways",
                filter: "only-creator-entries",
                entries: []
            });
            const upColumn = new Column({
                title: "Up",
                icon: "rocket-up",
                filter: "only-creator-entries",
                entries: []
            });

            await Promise.all([downwardColumn.save(), sidewaysColumn.save(), upColumn.save()]);
            const board = new Board({
                title: title,
                creatorId: creatorId,
                columns: [downwardColumn, sidewaysColumn, upColumn]
            });
            const res = mongo.fixDates(mongo.extractDoc(await board.save()));
            return res;
        }
    }

}