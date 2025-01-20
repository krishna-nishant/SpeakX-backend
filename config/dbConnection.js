import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const mongoURI = `mongodb+srv://${dbUsername}:${dbPassword}@speakx.ai9ip.mongodb.net/speakxquestions`
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI)
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;