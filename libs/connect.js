const acc = require('./acc/acc.js');
const minify = require('./minify/minify.js');
const db = require('./db/db.js');
const att = require('./att/att.js');
async function cron(env) {
    console.log('Starting tt');
    var ptime = new Date();
    ptime = new Date(ptime.getTime() + (330 + ptime.getTimezoneOffset()) * 60000);
    formatMap = { mm: ptime.getMonth() + 1, dd: ptime.getDate(), yyyy: ptime.getFullYear(), d: ptime.getDay(), h: ptime.getHours(), m: ptime.getMinutes() };
    fMmm = formatMap.mm.toString(), fMdd = formatMap.dd.toString(), fMyyyy = formatMap.yyyy.toString(), fMd = formatMap.d.toString(), fMh = formatMap.h.toString(), fMm = formatMap.m.toString(), 1 == fMmm.length && (fMmm = "0" + fMmm), 1 == fMdd.length && (fMdd = "0" + fMdd);
    cr1 = fMmm + fMdd + fMyyyy + fMd + fMh + fMm;
    await db.insert({ n: cr1, e: '-' }, 'cronrecord', env);
    ttdb = await db.query({}, 'timetables', env);
    for (let loop1 = 0; loop1 < ttdb.length; loop1++) {
        stl = [];
        cbs = await db.query({ branchc: ttdb[loop1].branch }, 'students', env);
        for (let loop2 = 0; loop2 < cbs.length; loop2++){
            stl.push(cbs[loop2].uid);
        }
        ctrps = [];
        ctrpt = [];
        for (let loop2 = 0; loop2 <= 6; loop2++){
            fv = ttdb[loop1].tt[0][loop2].f.substring(0, ttdb[loop1].tt[0][loop2].f.length - 3);
            tv = ttdb[loop1].tt[0][loop2].f.substring(3, ttdb[loop1].tt[0][loop2].f.length);
            attcd = fMmm + fMdd + fMyyyy + fMd + fv + tv;
            if (fv == formatMap.h) {
                ism1 = { attc: attcd, sc: ttdb[loop1].tt[formatMap.d][loop2], time: formatMap };
                ctrps.push(ism1);
                ctrpt.push(ism1);
            } else if (fv == formatMap.h - 1 && tv !== '00' && tv != '10') {
                ism1 = { attc: attcd, sc: ttdb[loop1].tt[formatMap.d][loop2], time: formatMap };
                ctrps.push(ism1);
            }
            console.log('ctrps');
            console.log(ctrps);
            console.log('ctrpt');
            console.log(ctrpt);
        }
        await db.update({ $set: { atten:  ctrps } }, { branch: ttdb[loop1].branch }, 'stuattenactive', env);
        await db.update({ $push: { atten: { $each: ctrpt } } }, { branch: ttdb[loop1].branch }, 'stuattenintive', env);
        var ptime = new Date();
        ptime = new Date(ptime.getTime() + (330 + ptime.getTimezoneOffset()) * 60000);
        formatMap = { mm: ptime.getMonth() + 1, dd: ptime.getDate(), yyyy: ptime.getFullYear(), d: ptime.getDay(), h: ptime.getHours(), m: ptime.getMinutes() };
        fMmm = formatMap.mm.toString(), fMdd = formatMap.dd.toString(), fMyyyy = formatMap.yyyy.toString(), fMd = formatMap.d.toString(), fMh = formatMap.h.toString(), fMm = formatMap.m.toString(), 1 == fMmm.length && (fMmm = "0" + fMmm), 1 == fMdd.length && (fMdd = "0" + fMdd);
        cr2 = fMmm + fMdd + fMyyyy + fMd + fMh + fMm;
        await db.update({ e: cr2 }, { $set: { n: cr1 }}, 'cronrecord', env);
    }
    console.log('Ending tt');
}
module.exports = {
    loginnow: acc.login,
    acchandler: acc.acchandler,
    minify: minify.minify,
    cron: cron,
    getimg: att.getimg
}