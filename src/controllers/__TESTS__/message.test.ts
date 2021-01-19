import mongoose from 'mongoose';
import MessageController from '../message.controller';

const databaseUrl = 'mongodb://localhost:27017/message-controller-test';

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

test('create new message', async () => {
    const message = await MessageController.CreateMessage({
        sender_id: '2212121',
        timestamp: '1610987334458',
        mid: 'm_28309180',
        text: 'some text',
    });

    expect(message).toMatchObject({
        sender_id: 2212121,
        timestamp: 1610987334458,
        mid: 'm_28309180',
        text: 'some text',
    });
});

test('get message by id', async () => {
    await MessageController.CreateMessage({
        sender_id: '1234',
        timestamp: '1610987334458',
        mid: 'm_1234',
        text: 'some text',
    });

    const message = await MessageController.GetMessageById('m_1234');

    expect(message).toMatchObject({
        sender_id: 1234,
        timestamp: 1610987334458,
        mid: 'm_1234',
        text: 'some text',
    });
});

test('get messages', async () => {
    await MessageController.CreateMessage({
        sender_id: '1234',
        timestamp: '1610987334458',
        mid: 'm_1234',
        text: 'some text',
    });

    const message = await MessageController.GetMessages();

    expect(message[0]).toMatchObject({
        sender_id: 1234,
        timestamp: 1610987334458,
        mid: 'm_1234',
        text: 'some text',
    });
});

test('delete message by id', async () => {
    await MessageController.CreateMessage({
        sender_id: '1234',
        timestamp: '1610987334458',
        mid: 'm_1234',
        text: 'some text',
    });

    const result = await MessageController.DeleteMessageById('m_1234');

    expect(result).toMatchObject({
        n: 1,
        ok: 1,
        deletedCount: 1,
    });
});

async function removeAllCollections() {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        await collection.deleteMany({});
    }
}
