const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');

async function storeImageInMongoDBAtlas() {
    const uri = 'mongodb+srv://Shubhamkb:Shubhamkb@cudatabase.jejqgjq.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db('cudb');
    const collection = db.collection('stuimg');
    
    const imageBuffer1 = fs.readFileSync(path.join(__dirname, '/host/other/3.jpeg'));
    const imageBase641 = imageBuffer1.toString('base64');
    const imageBuffer2 = fs.readFileSync(path.join(__dirname, '/host/other/4.jpeg'));
    const imageBase642 = imageBuffer2.toString('base64');
    console.log('putting image');
    const result = await collection.insertOne({ uid: "23BCS4302", images: { "1": imageBase641, "2": imageBase642 } });
    console.log('Done');
    console.log(`Image stored in MongoDB Atlas with ID ${result.insertedId}`);

    client.close();
}

storeImageInMongoDBAtlas();