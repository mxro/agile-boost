import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const entrySchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    sessionId: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model('Entry', entrySchema);