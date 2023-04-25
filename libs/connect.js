const acc = require('./acc/acc.js');
const minify = require('./minify/minify.js');
function cron() {
    console.log('yo');
}
module.exports = {
    loginnow: acc.login,
    acchandler: acc.acchandler,
    minify: minify.minify,
    cron: cron
}