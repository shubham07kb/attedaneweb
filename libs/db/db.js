const mongodb = require('./mongo.js');
async function query(q,table,env,qs=0){
    if(env.dbtype=='mongodb'){
        return await mongodb.query(table,q,env.dburl,env.dbname,qs);
    }
}
module.exports={
    query:query
}