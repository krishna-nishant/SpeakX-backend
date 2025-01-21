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
        'grpc.max_receive_message_length': 20000000,
        'grpc.max_send_message_length': 20000000
    });

    server.addService(questionProto.QuestionService.service, {
        getQuestions: async (call, callback) => {
            console.log("getQuestions called");
            try {
                const { page = 1, limit = 5, search = "" } = call.request;
                const skip = (page - 1) * limit;
                const questions = await Question.find(
                    { title: new RegExp(search, 'i') }
                ).skip(skip)
                    .limit(limit);
                const total = await Question.countDocuments({
                    title: new RegExp(search, 'i')
                });
                callback(null, {
                    questions,
                    total,
                    page,
                    limit
                });
            } catch (err) {
                console.error("Error in getQuestions:", err);
                callback(err, null);
            }
        },
    });

    server.bindAsync(`${process.env.GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), (err, bindPort) => {
        if (err) {
            console.error(`Server failed to bind: ${err.message}`);
            return;
        }
        console.log(`Server is running on port ${bindPort}`);
    });
}

main();
