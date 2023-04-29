const { endsWith } = require('lodash');
const mod = require('../connect');
const page = require('./page');
const jwt = require("jsonwebtoken");
async function getfiles(fs, f) {
    d=[]
    e = fs.readdirSync(f);
    for (i = 0; i < e.length; i++) {
        if (fs.statSync(f + "/" + e[i]).isDirectory()) { 
            g = await getfiles(fs, f + "/" + e[i]);
            e = await addarray(d, g);
        } else {
            d.push(f + "/" + e[i]);
        }
    }
    return d;
}
async function addarray(e, f) {
    for (let i = 0; i < f.length; i++) {
        e.push(f[i]);
    }
    return e;
}
async function onlyhcj(path, e) {
    let d=[]
    for (let i = 0; i < e.length; i++) {
        if ((e[i].endsWith('.html') || e[i].endsWith('.css') || e[i].endsWith('.js')) && (!e[i].endsWith('.min.html') && !e[i].endsWith('.min.css') && !e[i].endsWith('.min.js'))) {
            d.push(e[i]);
        }
    }
    return d;
}
async function apphandle(req, res, path, port, os, fs, env) {
    a = req.params[0].split('/');
    // console.log(req.body);
    if (a[1] == 'favicon.ico') {
        res.header('Content-Type', 'image/x-icon');
        res.send(fs.readFileSync(env.rootpath + '/host/img/favicon.ico'));
    } else if (a[1] == 'app.js') {
        res.header("Content-Type", "application/javascript");
        p = 'sitename="' + env.sitename + '";';
        var ptime = new Date();
        ptime = new Date(ptime.getTime() + (330 + ptime.getTimezoneOffset()) * 60000);
        const formatMap = { mm: ptime.getMonth() + 1, dd: ptime.getDate(), yyyy: ptime.getFullYear(), d: ptime.getDay(), h: ptime.getHours(), m: ptime.getMinutes() };
        p += 'cltime=`' + JSON.stringify(formatMap) + '`;';
        p += 'siteurl="' + env.siteurl + '";';
        p += 'isssl="' + env.isssl + '";';
        p += 'webdarkcss=`' + fs.readFileSync(env.rootpath + '/host/css/webdark.css') + '`;';
        p += 'weblightcss=`' + fs.readFileSync(env.rootpath + '/host/css/weblight.css') + '`;';
        p += 'webcss=`' + fs.readFileSync(env.rootpath + '/host/css/web.css') + '`;';
        p += 'inhtml=`' + fs.readFileSync(env.rootpath + '/host/html/inner.html') + '`;';
        reqip = req.header('x-forwarded-for') || req.socket.remoteAddress;
        p += 'reqip="' + reqip + '";';
        p += fs.readFileSync(env.rootpath + '/host/js/cbor.js');
        p += fs.readFileSync(env.rootpath + '/host/js/app.js');
        res.send(p);
    } else if (a[1] == 'manifest.json') {
        res.header("Content-Type", "application/json");
        res.send(fs.readFileSync(env.rootpath + '/host/json/manifest.json'));
    } else if (a[1] == 'sw.js') {
        res.header("Content-Type", "application/javascript");
        p = fs.readFileSync(env.rootpath + '/host/js/sw.js');
        res.send(p);
    } else if (a[1] == 'sp') {
        try {
            t1 = jwt.verify(req.cookies.accheader + '.' + req.cookies.accdata + '.' + req.cookies.acckey, env.jwtk);
            page.pin(a, req, res, t1, env, path, os, fs, port);
        } catch (e) {
            res.redirect('/');
        }
    } else if (a[1] == 'sys' && ((a[2] == 'faceapi' && (a[3] == '1' || a[3] == '2'))  || a[2]=='cron' || a[2]=='acchandler' || (a[2]=='minify' && (a[3]==undefined || a[3]=='res')))){
        if(a[2]=='acchandler'){
            mod.acchandler(req,res,path,port,os,fs,env);
        } else if (a[2] == 'cron') { 
            res.header('Content-Type', 'application/json');
            if (req.query.pass=='atten'){
                mod.cron(env,req,res);
            } else {
                res.send('{cronstat:"'+req.query.pass + ' not accepted"}');
            }
        } else if (a[2] == 'minify') {
            const css = await getfiles(fs, env.rootpath + '/host/css');
            const html = await  getfiles(fs, env.rootpath + '/host/html');
            const js = await  getfiles(fs, env.rootpath + '/host/js');
            let all = await addarray(html, css).then(e => e);
            all = await addarray(all, js).then(e => e);
            all = await onlyhcj(path, all);
            mod.minify(all,env,res);
            // res.header("Content-Type", "application/javascript");
            // res.send('{"status":"ok","msg":"ok"}');
        } else if (a[2] == 'faceapi') {
            try {
                t1 = jwt.verify(req.cookies.accheader + '.' + req.cookies.accdata + '.' + req.cookies.acckey, env.jwtk);
                mod.getimg(t1, a[3], res, env);
            } catch (e) {
                res.redirect('/');
            }
        }
    } else{
        res.header("Content-Type", "text/html");
        res.render('index.html',{title:env.sitename});
    }
}
module.exports={
    apphandle:apphandle
}; 


