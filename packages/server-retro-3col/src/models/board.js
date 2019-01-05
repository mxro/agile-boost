import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const boardSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    columns: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Column',
            required: true,
        }
    ],
}, { timestamps: true });

export default mongoose.model('Board', boardSchema);