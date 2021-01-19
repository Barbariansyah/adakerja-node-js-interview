import User, { IUser } from '../models/user.model';
import { CreateQuery } from 'mongoose';

const CreateUser = async ({ sender_id, first_name, birth_date }: CreateQuery<IUser>): Promise<IUser> => {
    return User.create({ sender_id, first_name, birth_date })
        .then((data: IUser) => {
            return data;
        })
        .catch((error: Error) => {
            throw error;
        });
};

const GetUsers = async (): Promise<IUser[]> => {
    return User.find({});
};

const GetUserById = async (sender_id: number): Promise<IUser> => {
    return User.findOne({ sender_id: sender_id });
};

const DeleteUserById = async (sender_id: number): Promise<IUser> => {
    return User.deleteOne({ sender_id: sender_id });
};

const UpdateUserById = async (sender_id: number, update_data: any): Promise<IUser> => {
    return User.findOneAndUpdate({ sender_id: sender_id }, update_data, { upsert: true });
};

export default {
    CreateUser,
    GetUsers,
    GetUserById,
    DeleteUserById,
    UpdateUserById,
};
