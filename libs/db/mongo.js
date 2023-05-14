MongoClient = require('mongodb').MongoClient;
async function query(a,b,c,d,e={}){
  var db = await MongoClient.connect(c);
  var dbo = await db.db(d);
  var r = await dbo.collection(a).find(b, e).toArray();
  db.close();
  return r;
}
async function insert(a,b,c,d){
  var db = await MongoClient.connect(c);
  var dbo =await db.db(d);
  try{
    var r = await dbo.collection(a).insertOne(b);
    db.close();
    return {status:'success',statcode:1,message:r};
  } catch(e){
    return {status:'error',statcode:0,message:e};
  }
}
async function del(a,b,c,d){
  var db = await MongoClient.connect(c);
  var dbo =await db.db(d);
  try{
    var r = await dbo.collection(a).deleteOne(b);
    db.close();
    return {status:'success',statcode:1,message:r};
  } catch(e){
    return {status:'error',statcode:0,message:e};
  }
}
async function update(a,b,c,d,e){
  var db = await MongoClient.connect(d);
  var dbo =await db.db(e);
  try{
    var r = await dbo.collection(a).updateOne(c, b);
    db.close();
    return {status:'success',statcode:1,message:r};
  } catch(e){
    return {status:'error',statcode:0,message:e};
  }
}
module.exports = {
  query: query,
  insert: insert,
  del: del,
  update: update
};