import { app } from './app';
import { MongoClient, ConnectOptions } from 'mongodb';
import { configApp } from './common/config';

const PORT = configApp.PORT || 5000
const uri = configApp.MONGO_CONNECTION || "";
const clientMongoDb = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);


clientMongoDb.connect();
clientMongoDb.on('error', console.error.bind(console, 'Connection error:'));
clientMongoDb.once('open', async function() {
  console.log('Connected to DB successfully!');
  await clientMongoDb.db('mo_less2').collection('bloggers').drop();
  await clientMongoDb.db('mo_less2').collection('posts').drop();
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});

export { clientMongoDb }