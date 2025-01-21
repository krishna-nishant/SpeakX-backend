import express from 'express';
import dotenv from 'dotenv';
import questionRoutes from './routes/route.js';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api", questionRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Express server is running on port ${process.env.PORT}`);
});
