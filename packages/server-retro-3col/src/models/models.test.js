import Board from './board';
import Entry from './entry';
import Column from './column';
import User from './user';
import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';


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
    
    let entry = new Entry({
        text: "Hello there!",
        creator: user
    });
    
    entry = await entry.save();

    let column = new Column({
        title: 'Good',
        icon: 'noicon',
        filter: 'only-creator-entries',
        entries: [entry]
    });
    
    column = await column.save();

    let board = new Board({
        title: 'Agile 3',
        creatorId: user,
        columns: [column]
    });

    await board.save();

    await mongoose.disconnect();
    return mongod.stop();

});
