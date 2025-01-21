import client from '../client.js'
import express from 'express'

const router = express.Router()

router.get('/questions', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    client.getQuestions({ page, limit, search }, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send({
                msg: "gRPC error",
                details: err.message,
            });
        } else {
            res.status(200).json({
                error: false,
                total: data.total,
                page: data.page,
                limit: data.limit,
                questions: data.questions,
            });
        }
    });
});

export default router;