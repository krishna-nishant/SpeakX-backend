const PROTO_PATH = "./proto/question.proto";

import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
    defaults: true,
    oneofs: true,
});

const QuestionService = grpc.loadPackageDefinition(packageDefinition).QuestionService;
const client = new QuestionService("localhost:30043", grpc.credentials.createInsecure(), {
    'grpc.max_receive_message_length': 20000000,
    'grpc.max_send_message_length': 20000000
});

export default client;
