import mongoose from 'mongoose';

var commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    blogId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "blog"
    },
    date: {
        type: Date,
        default: Date.now(),
    }
})


export default new mongoose.model("comment", commentSchema);