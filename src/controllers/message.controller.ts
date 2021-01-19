import Message, { IMessage } from '../models/message.model';
import { CreateQuery } from 'mongoose';

const CreateMessage = async ({ sender_id, timestamp, mid, text }: CreateQuery<IMessage>): Promise<IMessage> => {
    return await Message.create({ sender_id, timestamp, mid, text })
        .then((data: IMessage) => {
            return data;
        })
        .catch((error: Error) => {
            throw error;
        });
};

const GetMessages = async (): Promise<IMessage[]> => {
    return await Message.find({});
};

const GetMessageById = async (mid: string): Promise<IMessage> => {
    return await Message.findOne({ mid: mid });
};

const DeleteMessageById = async (mid: string): Promise<IMessage> => {
    return await Message.deleteOne({ mid: mid });
};

export default {
    CreateMessage,
    GetMessages,
    GetMessageById,
    DeleteMessageById,
};
