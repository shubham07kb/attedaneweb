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
            sta = 'Student';
        } else if (t1.at == 't') {
            sta = 'Teacher';
        } else if (t1.at == 'a') {
            sta = 'Employee';
        }
        resend = `<h1>Profile of UID: `+t1.uid+`</h1>
        <h4><b>Name</b>: `+ t1.name + `</h4>
        <h4><b>Email</b>: `+ t1.email + `</h4>
        <h4><b>University Email</b>: `+ t1.uemail + `</h4>
        <h4><b>Gender</b>: `+ t1.gen + `</h4>
        <h4><b>Date of Birth</b>: `+ t1.dob + `</h4>
        <h4><b>Address</b>: `+ t1.adr + `</h4>
        <h4><b>Type of Profile</b>:`+ sta +`</h4>`;
        res.send(resend);
    } else if (a[2] == 'meta') {
        if (a[3]=='timetable') {
            res.send('working yo');
        } else if (a[3] == 'profile') {
            res.send('working yo');
        }
    } else {
        res.send('page not found');
    }
}
module.exports = {
    pin:pin
}