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

const GetMessages = async (): Promise<IMessage[]> => {
    return Message.find({});
};

export default {
    CreateMessage,
    GetMessages,
};
