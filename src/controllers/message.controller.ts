import Message, { IMessage } from '../models/message.model';
import { CreateQuery } from 'mongoose';

const CreateMessage = async ({ sender_id, timestamp, mid, text }: CreateQuery<IMessage>): Promise<IMessage> => {
    return Message.create({ sender_id, timestamp, mid, text })
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

const GetMessageById = async (mid: string): Promise<IMessage> => {
    return Message.find({ mid: mid });
};

const DeleteMessageById = async (mid: string): Promise<IMessage> => {
    return Message.deleteOne({ mid: mid });
};

export default {
    CreateMessage,
    GetMessages,
    GetMessageById,
    DeleteMessageById,
};
