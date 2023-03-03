const mongodb = require('./mongo.js');
async function query(q,table,env){
    if(env.dbtype=='mongodb'){
        return await mongodb.query(table,q,env.dburl,env.dbname);
    }
}
module.exports={
    query:query
}