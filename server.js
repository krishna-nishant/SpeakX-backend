const PROTO_PATH = "./proto/question.proto";

import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import dotenv from 'dotenv';
import connectDB from './config/dbConnection.js';
import Question from './models/questions.js';

dotenv.config();
connectDB();

async function main() {
    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        arrays: true,
        defaults: true,
        oneofs: true,
    });

    const questionProto = grpc.loadPackageDefinition(packageDefinition);
    const server = new grpc.Server({
        'grpc.max_receive_message_length': 20000000, // Increase receive message limit to 10MB
        'grpc.max_send_message_length': 20000000    // Increase send message limit to 10MB
    });

    server.addService(questionProto.QuestionService.service, {
        getQuestions: async (_, callback) => {
            console.log("getQuestions called"); // Log if this function is called
            try {
                const questions = await Question.find();
                callback(null, { questions });
            } catch (err) {
                console.error("Error in getQuestions:", err); // Log any error
                callback(err, null);
            }
        },
    });

    server.bindAsync(`127.0.0.1:${process.env.GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), (err, bindPort) => {
        if (err) {
            console.error(`Server failed to bind: ${err.message}`);
            return;
        }
        console.log(`Server is running on port ${bindPort}`);
    });
}

main();
