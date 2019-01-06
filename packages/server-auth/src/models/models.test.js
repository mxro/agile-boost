
import User from './user';
import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';

// longer timeout since mongodb needs to be downloaded
jest.setTimeout(120000);

it('Can create models and save to db', async () => {

    const mongod = new MongoMemoryServer();
    const uri = await mongod.getConnectionString();
    const port = await mongod.getPort();
    const dbPath = await mongod.getDbPath();
    const dbName = await mongod.getDbName();
    mongoose.connect(`mongodb://localhost:${port}/${dbName}`, { useNewUrlParser: true });

    let user = new User({
        email: 'test@test.email',
        sessionId: 'dummyId'
    });

    user = await user.save();
    
    

    await mongoose.disconnect();
    return mongod.stop();

});
