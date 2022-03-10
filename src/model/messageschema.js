import mongoose from 'mongoose';

var messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
        },
    email: {
        type: String,
        required: true,
    },
    subject: String,
    message: String,
    date: Date
})

export default new mongoose.model("message", messageSchema);