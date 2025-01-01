import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    creator: {
        type: String,
        required: true
    },

    tags: {
        type: [String],
        required: true
    },

    selectedFile: {
        type: String,
        required: true
    },

    likes: {
        type: [String],
        default: []
    },

    createdAt: {
        type: Date,
        default: new Date()
    }
    
}, {timestamps: true});

const postMessage = mongoose.model('postMessage', messageSchema);
export default postMessage;