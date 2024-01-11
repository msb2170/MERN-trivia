const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const questionSchema = new mongoose.Schema({
    id: {type: ObjectId},
    question: 
    {
        type: String
    },
    answer:
    {
        type: String
    }
})

module.exports = mongoose.model("Question", questionSchema, "Questions")

