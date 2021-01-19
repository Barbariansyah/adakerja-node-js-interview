import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    sender_id: number;
    first_name?: string;
    birth_date?: string;
}

const UserSchema: Schema = new Schema({
    sender_id: { type: Number, required: true },
    first_name: { type: String, required: false },
    birth_date: { type: String, required: false },
});

export default mongoose.model<IUser>('User', UserSchema);
