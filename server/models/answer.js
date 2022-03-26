import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    forumid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Forum",
    },
    answer: String,
    name: String,
    creator: String,
    votes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    commentid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    },
});

const Answer = mongoose.model('Answer', answerSchema);

export default Answer;
//module.exports = mongoose.model('Answer', answerSchema);