const db = require('../db/db.js');
async function getimg(t1, imgn, res, env) {
    r = await db.query({ uid: t1.uid }, 'stuimg', env);
    if (r.length == 1) { 
        imageBase64 = r[0].images[imgn];
        const imageBuffer = Buffer.from(imageBase64, 'base64');
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imageBuffer);
    } else {
        res.header('Content-Type', 'application/json');
        res.send('{error: "failed, No img found"}');
    }
}
async function applyatten(attc, res, t1, env) {
    try {
        await db.update({ $push: { atten: attc } }, { uid: t1.uid }, 'stuatten', env);
        res.send('{"stat":1,"r":"Applied"}');
    } catch (e) {
        res.send('{"stat":1,"r":"DB error"}');
    }
    
}
module.exports = {
    getimg: getimg,
    applyatten: applyatten
}