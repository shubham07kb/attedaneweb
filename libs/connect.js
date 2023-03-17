const acc=require('./acc/acc.js');
const minify = require('./minify/minify.js');
module.exports={
    loginnow:acc.login,
    acchandler:acc.acchandler,
    minify:minify.minify
}