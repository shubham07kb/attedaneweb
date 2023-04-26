const db = require('../db/db.js');
async function pin(a, req, res, t1, env, path, os, fs, port) {
    if(a[2] == 'timetable') {
        if (t1.at=='s') {
            r = await db.query({ branch: t1.uid.substring(0, t1.uid.length - 2) }, 'timetables', env);
            if (r.length == 1) {
                resend = `<h1 style="text-align:center">Time Table for UID: ` + t1.uid + `</h1><br><table style="width:100%;border:1px solid blue"><tr style="border:1px solid blue"><th style="border:1px solid blue"></th>`;
                rtn = [];
                rtn1 = [];
                for (va in r[0].st) {
                    rtn.push({ "uid": r[0].st[va] });
                    rtn1.push({ "sc": va });
                }
                rtn = await db.query({ "$or": rtn }, 'teachers', env);
                rtn1 = await db.query({ "$or": rtn1 }, 'subjects', env);
                rtnp = {};
                rtn.forEach(element => {
                    rtnp[element.uid] = element.name;
                });
                rtnp1 = {};
                rtn1.forEach(element => {
                    rtnp1[element.sc] = element.sn;
                });
                for (let loop1 = 0; loop1 <= 6;loop1++) {
                    resend += `<th style="border:1px solid blue">` + r[0].tt[0][loop1].f + `-` + r[0].tt[0][loop1].t + `<br>Period-` + (loop1+1) +`</th>`;
                }
                resend += '</tr>';
                console.log(rtnp);
                console.log(rtnp1);
                for (loop1 = 1; loop1 <= 6; loop1++) {
                    1 == loop1 ? wd = "Monday" : 2 == loop1 ? wd = "Tuesday" : 3 == loop1 ? wd = "Wednesday" : 4 == loop1 ? wd = "Thursday" : 5 == loop1 ? wd = "Friday" : 6 == loop1 && (wd = "Saturday");
                    resend += `<tr style="border:1px solid blue"><td style="border:1px solid blue;text-align:center">`+wd+`</td>`;
                    for (loop2 = 0; loop2 <= 6; loop2++) { 
                        if (r[0].tt[loop1][loop2].sub.trim() != '') {
                            resend += `<td style="border:1px solid blue;text-align:center">` + r[0].tt[loop1][loop2].sub + `<br>` + rtnp1[r[0].tt[loop1][loop2].sub] + `<br>` + rtnp[r[0].st[r[0].tt[loop1][loop2].sub]] + `</td>`;
                        } else {
                            resend += `<td style="border:1px solid blue;text-align:center"></td>`;
                        }
                    }
                    resend += `</tr>`;
                }
                resend += `</table>`;
                res.send(resend);
            } else {
                res.send('No timetable found for ' + t1.uid);
            }
        } else {
            res.send('No timetable found for ' + t1.uid);
        }
    } else if (a[2] == 'profile') {
        if (t1.at == 's') { 
            tn = 'students';
            sta = 'Student';
        } else if (t1.at == 't') {
            tn = 'teachers';
            sta = 'Teacher';
        } else if (t1.at == 'a') {
            tn = 'employees';
            sta = 'Employee';
        }
        r = await db.query({ uid: t1.uid }, tn, env);
        if (r.length == 1) {
            resend=
            res.send(r);
        } else {
            res.send('{"error":"UID Data Not able to Fetch"}');
        }
    } else {
        res.send('page not found');
    }
}
module.exports = {
    pin:pin
}