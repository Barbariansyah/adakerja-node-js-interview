import request from 'request';

import MessageController from '../controllers/message.controller';
import UserController from '../controllers/user.controller';

export interface IMessage {
    sender_id: number;
    timestamp: number;
    mid: string;
    text: string;
}

const HandleMessage = ({ sender_id, timestamp, mid, text }: IMessage): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        await MessageController.CreateMessage({ sender_id, timestamp, mid, text });
        const user = await UserController.GetUserById(sender_id);
        if (!user) {
            UserController.CreateUser({ sender_id });
            sendMessage(sender_id, "What's your name?");
        } else {
            if (!user.first_name) {
                UserController.UpdateUserById(sender_id, { first_name: text });
                sendMessage(sender_id, 'When is your birth date? (please reply with this format: YYYY-MM-DD)');
            } else {
                if (!user.birth_date) {
                    UserController.UpdateUserById(sender_id, { birth_date: text });
                    sendMessage(sender_id, 'Do you want to know how many days until your next birhtday?');
                } else {
                    if (['yes', 'yeah', 'y', 'yup', 'yes please'].includes(text.toLowerCase())) {
                    } else if (['no', 'nah', 'n', 'nope'].includes(text.toLowerCase())) {
                        sendMessage(sender_id, 'Goodbye 👋');
                    } else {
                        sendMessage(sender_id, 'Do you want to know how many days until your next birhtday?');
                    }
                }
            }
        }

        resolve('message sent');
    });
};

const sendMessage = (sender_id: number, text: string) => {
    const requestBody = {
        recipient: {
            id: sender_id,
        },
        message: {
            text: text,
        },
    };

    request(
        {
            uri: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: process.env.PAGE_ACCESS_TOKEN,
            },
            method: 'POST',
            json: requestBody,
        },
        (err, res, body) => {
            if (!err && res.statusCode == 200) {
                console.log('message sent!');
            } else {
                console.error('Unable to send message:' + err);
            }
        },
    );
};

export default {
    HandleMessage,
};
