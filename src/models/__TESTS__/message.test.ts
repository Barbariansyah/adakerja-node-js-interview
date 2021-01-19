import mongoose from 'mongoose';
import Message from '../message.model';

const databaseUrl = 'mongodb://localhost:27017/message-model-test';

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

test('create new message', () => {
    const message = new Message({
        sender_id: '2212121',
        timestamp: '1610987334458',
        mid: 'm_28309180',
        text: 'some text',
    });

    message.save();

    expect(message).toMatchObject({
        sender_id: 2212121,
        timestamp: 1610987334458,
        mid: 'm_28309180',
        text: 'some text',
    });
});

async function removeAllCollections() {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        await collection.deleteMany({});
    }
}
