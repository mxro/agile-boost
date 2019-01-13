import { mongo } from 'server-utils';

import Board from '../models/board';
import Column from '../models/column';

export default {
    RootQuery: {
        boards: async (obj, { creatorId }, context, info) => {

            const docs = await Board.find({
                creator: creatorId
            }).populate('creator');
            return docs.map(doc => {
                const extractedDoc = mongo.fixDates(mongo.extractDoc(doc));
                extractedDoc.creator = mongo.extractDoc(extractedDoc.creator);
                return extractedDoc;
            });

        },
        board: async (obj, args, context, info) => {
            const doc = await Board.findOne({ _id: args.boardId }).populate('columns').populate('creator');
            const extractedDoc = mongo.extractDoc(doc);
            extractedDoc.columns = extractedDoc.columns.map(column => mongo.fixDates(mongo.extractDoc(column)));
            extractedDoc.creator = mongo.extractDoc(extractedDoc.creator);
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
            let board = new Board({
                title: title,
                creator: creatorId,
                columns: [downwardColumn, sidewaysColumn, upColumn]
            });
            board = await board.save();
            // needs to obtain the board via find in order to be able to populate the creator field
            board = await Board.findOne({_id : board._id}).populate('creator');
            const extractedDoc = mongo.fixDates(mongo.extractDoc(board));

            extractedDoc.creator = mongo.extractDoc(extractedDoc.creator);
            return extractedDoc;
        }
    }

}