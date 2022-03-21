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
        contentType: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    slug: {
        type: String, contentType: String
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
