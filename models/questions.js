import mongoose from 'mongoose';

const questionSchema = mongoose.Schema({
    type: { type: String, required: true },
    options: [
        {
            text: { type: String, required: true },
            isCorrectAnswer: { type: Boolean, required: true }
        }
    ],
    siblingId: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true }
});

const Question = mongoose.model('questions', questionSchema);

export default Question;