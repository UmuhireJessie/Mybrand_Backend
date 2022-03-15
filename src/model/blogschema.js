import mongoose from 'mongoose';

var blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
        },
    blogdescription: {
        type: String,
        required: true,
    },
    blogimage: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    comments: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }],

    date: {
        type: Date,
        default: Date.now(),
    }
})

export default new mongoose.model("blog", blogSchema);
