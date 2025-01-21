import client from '../client.js'
import express from 'express'

const router = express.Router()

router.get('/questions', (req, res) => {
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

export default router;