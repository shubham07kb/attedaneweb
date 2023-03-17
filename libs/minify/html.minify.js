const fs=require('fs');
async function minifyhtml(fn) {
    const e = fs.readFileSync(fn, 'utf-8');
    let f = e.replace(/\s+/g, ' ');
    f = f.replaceAll('> <', '><').trim();
    p = '';
    po = 0;
    for (let i = 0; i < f.length; i++) {
        if (f.length - i > 3) {
            if (f[i] == '<' && f[i + 1] == '!' && f[i + 2] == '-' && f[i + 3] == '-') {
                po = 1;
            }
        }
        if (po == 0) {
            p += f[i];
        }
        if (f[i] == '-' && f[i+1] == '-' && f[i+2] == '>' && po == 1) {
            po = 2;
        } else if (f[i] == '-' && po == 2) {
            po = 3;
        }
        else if (f[i] == '>' && po == 3) {
            po = 0;
        }
    }
    // console.log(p);
    return p;
}
module.exports = {
    htmlminify:minifyhtml
}