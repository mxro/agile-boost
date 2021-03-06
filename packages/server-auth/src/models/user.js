import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: false,
    },
    sessionId: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model('User', userSchema);