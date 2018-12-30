import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const columnSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    filter: {
        type: String,
        enum: ['only-creator-entries', 'show-all'],
        required: true,
    },
    entries: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Entry',
            required: true,
        }
    ],
}, { timestamps: true });

export default mongoose.model('Column', columnSchema);

