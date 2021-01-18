import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { json } from 'body-parser';

import routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(json());

app.use(express.urlencoded({ extended: true }));

app.use('/messages', routes.message);
app.use('/webhook', routes.webhook);

mongoose.connect(
    `${process.env.DATABASE_URL}`,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log(`connected to ${process.env.DATABASE_URL}`);
        app.listen(port, () => {
            console.log(`server is listening on port ${port}`);
        });
    },
);
