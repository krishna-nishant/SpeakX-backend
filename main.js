import express from 'express';
import client from './client.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    client.getQuestions({}, (err, data) => {
        if (err) {
            res.status(500).send({
                msg: "gRPC error",
                details: err.message,
            });
            console.error(err);
        } else {
            res.send(data);
        }
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Express server is running on port ${process.env.PORT}`);
});
