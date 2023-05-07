const { endsWith } = require('lodash');
const mod = require('../connect');
const page = require('./page');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const network = require('network');
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
        p += 'webdarkcss=`' + fs.readFileSync(env.rootpath + '/host/css/webdark.min.css') + '`;';
        p += 'weblightcss=`' + fs.readFileSync(env.rootpath + '/host/css/weblight.min.css') + '`;';
        p += 'webcss=`' + fs.readFileSync(env.rootpath + '/host/css/web.min.css') + '`;';
        p += 'inhtml=`' + fs.readFileSync(env.rootpath + '/host/html/inner.html') + '`;';
        reqip = req.header('x-forwarded-for') || req.socket.remoteAddress;
        p += 'reqip="' + reqip + '";';
        p += fs.readFileSync(env.rootpath + '/host/js/cbor.min.js');
        p += fs.readFileSync(env.rootpath + '/host/js/face-api.min.js');
        // p += fs.readFileSync(env.rootpath + '/host/js/chart.min.js');
        p += fs.readFileSync(env.rootpath + '/host/js/app.min.js');
        res.send(p);
    } else if (a[1] == 'manifest.json') {
        res.header("Content-Type", "application/json");
        res.send(fs.readFileSync(env.rootpath + '/host/json/manifest.json'));
    } else if (a[1] == 'sw.js') {
        res.header("Content-Type", "application/javascript");
        p = fs.readFileSync(env.rootpath + '/host/js/sw.min.js');
        res.send(p);
    } else if (a[1] == 'sp') {
        try {
            t1 = jwt.verify(req.cookies.accheader + '.' + req.cookies.accdata + '.' + req.cookies.acckey, env.jwtk);
            page.pin(a, req, res, t1, env, path, os, fs, port);
        } catch (e) {
            res.redirect('/');
        }
    } else if (a[1] == 'sys' && ((a[2] == 'attenapply' && (a[3] != undefined && a[3] != '')) || (a[2] == 'isproxy' && (a[3] != undefined && a[3] != '')) || (a[2] == 'faceapi' && (a[3] == '1' || a[3] == '2')) || (a[2] == 'sec' && (a[3] == 'crypto' && (a[4] == 'foratt'))) || a[2] == 'cron' || a[2] == 'acchandler' || (a[2] == 'minify' && (a[3] == undefined || a[3] == 'res')))) {
        if (a[2] == 'acchandler') {
            mod.acchandler(req, res, path, port, os, fs, env);
        } else if (a[2] == 'cron') {
            res.header('Content-Type', 'application/json');
            if (req.query.pass == 'atten') {
                mod.cron(env, req, res);
            } else {
                res.send('{cronstat:"' + req.query.pass + ' not accepted"}');
            }
        } else if (a[2] == 'minify') {
            const css = await getfiles(fs, env.rootpath + '/host/css');
            const html = await getfiles(fs, env.rootpath + '/host/html');
            const js = await getfiles(fs, env.rootpath + '/host/js');
            let all = await addarray(html, css).then(e => e);
            all = await addarray(all, js).then(e => e);
            all = await onlyhcj(path, all);
            mod.minify(all, env, res);
            // res.header("Content-Type", "application/javascript");
            // res.send('{"status":"ok","msg":"ok"}');
        } else if (a[2] == 'faceapi') {
            try {
                t1 = jwt.verify(req.cookies.accheader + '.' + req.cookies.accdata + '.' + req.cookies.acckey, env.jwtk);
                mod.getimg(t1, a[3], res, env);
            } catch (e) {
                res.redirect('/');
            }
        } else if (a[2] == 'sec') {
            if (a[3] == 'crypto') {
                if (a[4] == 'foratt') {
                    res.header("Content-Type", "application/json");
                    console.log('here')
                    try {
                        t1 = jwt.verify(req.cookies.accheader + '.' + req.cookies.accdata + '.' + req.cookies.acckey, env.jwtk);
                        const salt = crypto.randomBytes(16).toString('hex');
                        const saltedStr = salt + t1.uid;
                        const hash = crypto.createHash('sha256');
                        hash.update(saltedStr);
                        const hashedStr = hash.digest('hex');
                        res.send('{"stat":1,"url":"' + hashedStr + '","challange":"' + salt + '"}')
                    } catch (e) {
                        console.log(e);
                        res.send('{"stat":0,"error":"session end or error occured"}');
                    }
                }
            }
        } else if (a[2] == 'attenapply') {
            try {
                t1 = jwt.verify(req.cookies.accheader + '.' + req.cookies.accdata + '.' + req.cookies.acckey, env.jwtk);
                const saltedStr = req.body.challange + t1.uid;
                const generatedHash = crypto.createHash('sha256').update(saltedStr).digest('hex');
                if (generatedHash == a[3]) {
                    mod.applyatten(req.body.attc, res, t1, env);
                } else {
                    res.send('{"stat":0,"error":"Challenge failed"}');
                }
            } catch (e) {
                console.log(e);
                res.send('{"stat":0,"error":"session end or error occured"}');
            }
        }
    } else if (a[1] == 'hn') {
        network.get_active_interface(function (err, iface) {
            if (err) {
                res.send(err);
                return;
            }

            const ip = iface.ip_address;
            const port = 3000; // Replace with your desired port number
            const host = `${ip}:${port}`;

            res.send(`Host URL: http://${host}`);
        });
    } else{
        res.header("Content-Type", "text/html");
        res.render('index.min.html',{title:env.sitename});
    }
}
module.exports={
    apphandle:apphandle
}; 


