const acc = require('./acc/acc.js');
const minify = require('./minify/minify.js');
const db = require('./db/db.js');
async function cron(env) {
    console.log('getting tt');
    ttdb = await db.query({}, 'timetables', env);
    console.log('done tt');
    var ptime = new Date();
    ptime = new Date(ptime.getTime() + (330 + ptime.getTimezoneOffset()) * 60000);
    const formatMap = { mm: ptime.getMonth() + 1, dd: ptime.getDate(), yyyy: ptime.getFullYear(), d: ptime.getDay(), h: ptime.getHours(), m: ptime.getMinutes() };
    console.log(formatMap);
    for (let loop1 = 0; loop1 < ttdb.length; loop1++) {
        stl = [];
        console.log('getting names');
        cbs = await db.query({ branchc: ttdb[loop1].branch }, 'students', env);
        console.log('done names');
        for (let loop2 = 0; loop2 < cbs.length; loop2++){
            stl.push(cbs[loop2].uid);
        }
        ctrps = [];
        for (let loop2 = 0; loop2 <= 6; loop2++){
            fv = ttdb[loop1].tt[0][loop2].f.substring(0, ttdb[loop1].tt[0][loop2].f.length - 3);
            tv = ttdb[loop1].tt[0][loop2].f.substring(3, ttdb[loop1].tt[0][loop2].f.length);
            if (fv == formatMap.h) {
                ism1 = { sc: ttdb[loop1].tt[formatMap.d][loop2], time: formatMap};
                ctrps.push(ism1);
                // mongo
            } else if (fv == formatMap.h - 1 && tv !== '00') {
                ism1 = { sc: ttdb[loop1].tt[formatMap.d][loop2] };
                ctrps.push(ism1);
            }
            console.log(ctrps);
        }
    }
}
module.exports = {
    loginnow: acc.login,
    acchandler: acc.acchandler,
    minify: minify.minify,
    cron: cron
}