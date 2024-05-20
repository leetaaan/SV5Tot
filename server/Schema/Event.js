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