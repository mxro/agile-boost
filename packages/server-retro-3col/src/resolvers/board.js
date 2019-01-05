import utils from './utils';

import Board from '../models/board';
import Column from '../models/column';

export default {
    RootQuery: {
        boards: async (obj, { }, context, info) => {

            const docs = await Board.find({});
            return docs.map(doc => {
                return utils.fixDates(utils.extractDoc(doc));
            });

        },
        board: async (obj, args, context, info) => {
            const doc = await Board.findOne({ _id: args.boardId });
            if (!doc) {
                throw new Error(`Cannot find board with id ${args.boardId}`);
            }
            return utils.fixDates(utils.extractDoc(doc));
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
            const res = utils.fixDates(utils.extractDoc(await board.save()));
            return res;
        }
    }

}