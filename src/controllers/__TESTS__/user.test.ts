import mongoose from 'mongoose';
import UserController from '../user.controller';

const databaseUrl = 'mongodb://localhost:27017/user-controller-test';

beforeAll(async () => {
    await mongoose
        .connect(databaseUrl, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('connected');
        })
        .catch((err) => {
            console.log(err);
        });
});

afterEach(async () => {
    await removeAllCollections();
});

afterAll(async () => {
    await mongoose.connection.close();
});

test('create new user', async () => {
    const user = await UserController.CreateUser({
        sender_id: '23131312',
        first_name: 'barry',
        birth_date: '2000-07-21',
    });

    expect(user).toMatchObject({
        sender_id: 23131312,
        first_name: 'barry',
        birth_date: '2000-07-21',
    });
});

test('create new user with only sender_id', async () => {
    const user = await UserController.CreateUser({
        sender_id: '23131312',
    });

    expect(user).toMatchObject({
        sender_id: 23131312,
    });
});

test('get user by id', async () => {
    await UserController.CreateUser({
        sender_id: '23131312',
        first_name: 'barry',
        birth_date: '2000-07-21',
    });

    const user = await UserController.GetUserById(23131312);

    expect(user).toMatchObject({
        sender_id: 23131312,
        first_name: 'barry',
        birth_date: '2000-07-21',
    });
});

test('get users', async () => {
    await UserController.CreateUser({
        sender_id: '23131312',
        first_name: 'barry',
        birth_date: '2000-07-21',
    });

    const user = await UserController.GetUsers();

    expect(user[0]).toMatchObject({
        sender_id: 23131312,
        first_name: 'barry',
        birth_date: '2000-07-21',
    });
});

test('update user by id', async () => {
    await UserController.CreateUser({
        sender_id: '23131312',
    });

    await UserController.UpdateUserById(23131312, { first_name: 'barry', birth_date: '2000-07-21' });

    const user = await UserController.GetUserById(23131312);

    expect(user).toMatchObject({
        sender_id: 23131312,
        first_name: 'barry',
        birth_date: '2000-07-21',
    });
});

async function removeAllCollections() {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        await collection.deleteMany({});
    }
}
