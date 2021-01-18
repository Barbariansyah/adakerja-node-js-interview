import { Router, Request, Response } from 'express';
import MessageController from '../controllers/message.controller';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const messages = await MessageController.GetMessages();
    return res.send({ messages });
});

router.post('/', async (req: Request, res: Response) => {
    const message = await MessageController.CreateMessage({
        email: req.body.email,
        message: req.body.message,
    });
    return res.send({ message });
});

export default router;
