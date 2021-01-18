import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
    email: string;
    message: string;
}

const MessageSchema: Schema = new Schema({
    email: { type: String, required: true },
    message: { type: String, required: true },
});

export default mongoose.model<IMessage>('Message', MessageSchema);
