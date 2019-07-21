import mongoose from "mongoose";

const Schema = mongoose.Schema;

const talkSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    speaker: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }


}, {timestamps: true});

module.exports = mongoose.model('talk', talkSchema);
