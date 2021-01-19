import mongoose from 'mongoose';
import User from '../user.model';

const databaseUrl = 'mongodb://localhost:27017/user-model-test';

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

test('create new user with only sender_id', () => {
    const user = new User({
        sender_id: '2212121',
    });

    user.save();

    expect(user).toMatchObject({
        sender_id: 2212121,
    });
});

test('create new user', () => {
    const user = new User({
        sender_id: '23131312',
        first_name: 'barry',
        birth_date: '2000-07-21',
    });

    user.save();

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
