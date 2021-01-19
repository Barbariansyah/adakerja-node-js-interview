import { Router, Request, Response } from 'express';
import MessageController from '../controllers/message.controller';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const messages = await MessageController.GetMessages();
    return res.status(200).send({ messages });
});

router.get('/:id', async (req: Request, res: Response) => {
    const messages = await MessageController.GetMessageById(req.params.id);
    return res.status(200).send({ messages });
});

router.delete('/:id', async (req: Request, res: Response) => {
    const messages = await MessageController.DeleteMessageById(req.params.id);
    return res.status(200).send({ messages });
});

export default router;
