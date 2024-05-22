import mongoose, { Schema } from "mongoose";

const eventSchema = mongoose.Schema({

    event_id: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    tcc: {
        type: String,
        required: true,
    },
    ddtbb: {
        type: String,
    },
    ddt1: {
        type: String,
    },
    ddt2: {
        type: String,
    },
    ddt3: {
        type: String,
    },
    ddt4: {
        type: String,
    },
    httbb: {
        type: String,
    },
    htt1: {
        type: String,
    },
    htt2: {
        type: String,
    },
    htt3: {
        type: String,
    },
    htt4: {
        type: String,
    },
    htt5: {
        type: String,
    },
    tlt1: {
        type: String,
    },
    tlt2: {
        type: String,
    },
    tnt1: {
        type: String,
    },
    tnt2: {
        type: String,
    },
    hntbb: {
        type: String,
    },
    hnt1: {
        type: String,
    },
    hnt2: {
        type: String,
    },
    hnt3: {
        type: String,
    },
    
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    comments: {
        type: [Schema.Types.ObjectId],
        ref: 'comments'
    },

}, 
{ 
    timestamps: {
        createdAt: 'publishedAt'
    } 

})

export default mongoose.model("events", eventSchema);