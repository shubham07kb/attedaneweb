const htmlminify = require('./html.minify.js');
const cssminify = require('./css.minify.js');
const jsminify = require('./js.minify.js');
const fs = require('fs');
const path = require('path');
async function minify(e,env, res, { html, css, js } = {}) {
    d = [];
    let htmlg = [];
    let cssg = [];
    let jsg = [];
    if (typeof e === "string") {
        d.push(e);
    } else if (typeof e === "object" && typeof e.length === "number" && e.length != 0) {
        d = e;
    }
    for (let i = 0; i < d.length; i++) {
        if (d[i].endsWith('.html')) {
            htmlg.push(d[i]);
        } else if (d[i].endsWith('.css')) {
            cssg.push(d[i]);
        } else if (d[i].endsWith('.js')) { 
            jsg.push(d[i]);
        }
    }
    cssminify.cssminify(cssg[0]);
    jsminify.jsminify(jsg[0],res);
    fd = false;
    if (typeof html === "object" && typeof html.length === undefined) {
        if (htmlg.length == 1 && (html.filename != undefined && html.filename != "" && html.filename != null)) { 
            t = 'sf';
            fn = html.filename;
            fd = true;
        } else if (htmlg.length == 1) {
            t = 'sf';
            fn = path.win32.basename(htmlg[0]);
        } else {
            t = 'mf';
        }
    } else {
        if (htmlg.length == 1) {
            t = 'sf';
            fn = path.win32.basename(htmlg[0]);
        } else {
            t = 'mf';
        }
    }
    if (t == 'sf') {
        htmls = await htmlminify.htmlminify(htmlg[0]);
        if (fd == true) {
            if (!fn.endsWith('.html') && !fn.endsWith('.htm')) {
                fn = fn + '.html';
            }
        }
        fnss = await fs.existsSync(fn);
        if (fnss == true)  {
            await fs.unlinkSync(fn);
        }

    }
    fd = false;
    if (typeof css === "object" && typeof css.length === undefined) {
        if (css.type = 'single' && (css.filename != undefined || css.filename != "" || css.filename != null)) {
            t = 'sf';
            fn = css.filename;
            fd = true;
        } else {
            t = 'mf';
        }
        if (cssg.length == 1 && (css.filename != undefined && css.filename != "" && css.filename != null)) {
            t = 'sf';
            fn = css.filename;
            fd = true;
        }
    }
    fd = false;
    if (typeof js === "object" && typeof js.length === undefined) {
        if (js.type = 'single' && (js.filename != undefined || js.filename != "" || js.filename != null)) {
            t = 'sf';
            fn = js.filename;
            fd = true;
        } else {
            t = 'mf';
        }
        if (jsg.length == 1 && (js.filename != undefined && js.filename != "" && js.filename != null)) {
            t = 'sf';
            fn = js.filename;
            fd = true;
        }
    } 
}
module.exports = {
  minify:minify
}