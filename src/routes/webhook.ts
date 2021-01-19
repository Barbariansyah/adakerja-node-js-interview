import { Router, Request, Response } from 'express';
import MessageController from '../controllers/message.controller';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const body = req.body;

    if (body.object === 'page') {
        const webhook_event = body.entry[0].messaging[0];
        console.log(webhook_event);
        const message = await MessageController.CreateMessage({
            sender_id: webhook_event.sender.id,
            timestamp: webhook_event.timestamp,
            mid: webhook_event.message.mid,
            text: webhook_event.message.text,
        });
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});

router.get('/', (req: Request, res: Response) => {
    const VERIFY_TOKEN = 'super_secret_token';

    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

export default router;
