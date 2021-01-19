import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
    sender_id: number;
    timestamp: number;
    mid: string;
    text: string;
}

const MessageSchema: Schema = new Schema({
    sender_id: { type: Number, required: true },
    timestamp: { type: Number, required: true },
    mid: { type: String, required: true },
    text: { type: String, required: true },
});

export default mongoose.model<IMessage>('Message', MessageSchema);
