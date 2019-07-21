import mongoose from "mongoose";

const Schema = mongoose.Schema;

const attendeeSchema = new Schema({
    talk: {
        type: Schema.Types.ObjectId,
        ref: 'talk'
    },
    attendee_name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    present_location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }


}, {timestamps: true});

export const attendee = mongoose.model('attendee', attendeeSchema);
module.exports = attendee;
