const fs = require('fs');
async function minifyjs(fn,res) {
    e = fs.readFileSync(fn, 'utf-8');
    e = e.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').replace(/\s+/g, '');
    d = '';
    dd = '';
    ob = {};
    p = 0;
    s = 0;
    for (let i = 0; i < e.length; i++) { 
        if ((e[i] == '`' || e[i] == '"' || e[i] == "'") && p == 0) {
            s += 1;
            if (e[i] == '`') {
                p = 1;
                d += '`' + s + '`';
            } else if (e[i] == '"') {
                p = 2;
                d += '"' + s + '"';
            } else if (e[i] == "'") {
                p = 3;
                d += "'" + s + "'";
            }
        } else if (p == 0) {
            d += e[i];
        } else if (p == 1 && e[i] == '`') {
            ob['' + s + ''] = dd;
            dd = '';
            p = 0;
        } else if (p == 2 && e[i] == '"') {
            ob['' + s + ''] = dd;
            dd = '';
            p = 0;
        } else if (p == 3 && e[i] == "'") { 
            ob['' + s + ''] = dd;
            dd = '';
            p = 0;
        } else {
            dd+=e[i];
        }
    }
    res.send('precheck - ' + d);
    // let argumentCount = 0;
    // d = d.replace(/(function|class)\s+(\w+)\s*\(([\w\s,]*)\)/g, (match, type, name, args) => {
    //     argumentCount++;
    //     let shortenedArgs = args.trim().split(/\s*,\s*/).map(arg => `a${argumentCount}_${arg.replace(/\s/g, '')}`).join(',');
    //     return `${type} ${name}(${shortenedArgs})`;
    // });


    // // Convert all if-else statements to ternary operators
    // d = d.replace(/if\s*\((.*?)\)\s*{([^{}]*(?:(?!if|else)[^{}])*)}\s*(else\s*{([^{}]*(?:(?!if|else)[^{}])*)})?/g, (match, condition, ifBlock, elseBlock) => {
    //     let ternary = `(${condition})?(${ifBlock}):`;
    //     if (elseBlock) {
    //         ternary += `(${elseBlock})`;
    //     } else {
    //         ternary += 'undefined';
    //     }
    //     return ternary;
    // });
    // console.log(e);
    // res.send(e);
}
module.exports = {
    jsminify:minifyjs
}