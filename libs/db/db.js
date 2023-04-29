const mongodb = require('./mongo.js');
async function query(q,table,env,qs=0){
    if(env.dbtype=='mongodb'){
        return await mongodb.query(table,q,env.dburl,env.dbname,qs);
    }
}
async function insert(q,table,env) {
    if (env.dbtype == 'mongodb'){
        return await mongodb.insert(table,q,env.dburl,env.dbname);
    }
}
async function update(q,qat,table,env) { 
    if (env.dbtype == 'mongodb') {
        return await mongodb.update(table, q, qat, env.dburl, env.dbname);
    }
}
module.exports={
    query: query,
    insert, insert,
    update:update
}