const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

app.get('/image/:id', async (req, res) => {
    const uri = 'mongodb+srv://Shubhamkb:Shubhamkb@cudatabase.jejqgjq.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db('cudb');
    const collection = db.collection('stuimg');

    const result = await collection.findOne({ uid:"23BCS4301" });

    if (!result) {
        res.status(404).send('Image not found');
    } else {
        const imageBase64 = result.images[req.params.id];
        const imageBuffer = Buffer.from(imageBase64, 'base64');

        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imageBuffer);
    }

    client.close();
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});