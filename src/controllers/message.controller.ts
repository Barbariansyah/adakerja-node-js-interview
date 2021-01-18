import Message, { IMessage } from '../models/message.model';
import { CreateQuery } from 'mongoose';

const CreateMessage = async ({ email, message }: CreateQuery<IMessage>): Promise<IMessage> => {
    return Message.create({ email, message })
        .then((data: IMessage) => {
            return data;
        })
        .catch((error: Error) => {
            throw error;
        });
};

export default {
    CreateMessage,
};
