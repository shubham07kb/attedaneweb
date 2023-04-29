var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Shubhamkb:Shubhamkb@cudatabase.jejqgjq.mongodb.net/?retryWrites=true&w=majority";
console.log('starting Code');
async function upa() {
    var db = await MongoClient.connect(url);
    var dbo = await db.db('cudb');
    var c = { branch: "23BCS43" };
    var b = { $push: { atten: [{ chilu: 'bhs', pilio: "ajnd" }] } };
    try {
        var r = await dbo.collection("stuattenintive").updateOne(c,  b);
        console.log('pass');
        console.log(r);
    } catch (e) {
        console.log('Failed to update active')
        console.log(e);
    }
}
upa();
// MongoClient.connect(url, function (err, db) {
//     console.log('Inside Connection');
//     if (err) throw err;
//     var dbo = db.db("cudb");
//     console.log('starting query');
//     dbo.collection("stuattenactive").updateOne(myquery, newvalues, function (err, res) {
//         if (err) throw err;
//         console.log("1 document updated");
//         db.close();
//     });
// });
console.log('Failed to update');