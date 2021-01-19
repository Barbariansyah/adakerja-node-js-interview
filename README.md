# adakerja-node-js-interview
AdaKerja node.js interview task

### Local setup
1. Clone repo

2. Install packages
```
$ npm i
```

3. Create a `.env` file, like this
```
PORT=3000
DATABASE_URL=mongodb://localhost:27017/messenger-bot
PAGE_ACCESS_TOKEN=<YOUR_PAGE_TOKEN>
```

4. To build and run use
```
$ npm run start
```
or, to run in dev mode you can use nodemon
```
$ nodemon
```

### Facebook Messenger Setup
- Please follow this tutorial: https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start
- For development, I personally use ngrok to expose my webhook

### Result
1. Answering yes to the last question
![example-0](/documentation/example-0.gif?raw=true)
![example-0-png](/documentation/example-0.png?raw=true)

2. Replying with unrecognized date format and answering no to the last question
![example-1](/documentation/example-1.gif?raw=true)
![example-1-png](/documentation/example-1.png?raw=true)

3. Get all messages
![get all](/documentation/getAll.png?raw=true)

4. Get message by id
![get by id](/documentation/getById.png?raw=true)

5. Delete message by id
![delete by id](/documentation/deleteById.png?raw=true)
