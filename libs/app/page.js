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
                resend += `</table><br><br><a onclick="psi('/attendance/apply')">Attendance Apply</a>`;
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
    } else if (a[2] =='applyatt') {
        if (t1.at == 's') {
            var ptime = new Date();
            ptime = new Date(ptime.getTime() + (330 + ptime.getTimezoneOffset()) * 60000);
            formatMap = { mm: ptime.getMonth() + 1, dd: ptime.getDate(), yyyy: ptime.getFullYear(), d: ptime.getDay(), h: ptime.getHours(), m: ptime.getMinutes() };
            pcv = (formatMap.h * 60) + formatMap.m;
            r = await db.query({ branch: t1.uid.substring(0, t1.uid.length - 2) }, 'stuattenactive', env);
            pp = [];
            if (r.length == 1) { 
                r.forEach(element => {
                    element.atten.forEach(element1 => {
                        fv = Number(element1.p.fv);
                        tv = Number(element1.p.tv);
                        cv = (fv * 60) + tv;
                        rcv = pcv - cv;
                        if (rcv >= 0 && rcv < 50) {
                            pp.push(element1);
                        }
                    });
                });
            }
            ress = '<h1 style="text-align:center;">Apply Attendance Page</h1><br>';
            if (pp.length == 1) {
                pp = pp[0];
                r = await db.query({ uid: t1.uid }, 'stuatten', env);
                console.log(r[0].atten);
                console.log(pp.attc);
                if (r[0].atten.includes(pp.attc)) {
                    ress += `Current Active Period: ` + pp.sc + `<br> Status: Marked Present`;
                } else {
                    ress += `Current Active Period: ` + pp.sc + `<br> Status: Absent <br>`;
                    ress += `<div id='attensubid' style="display:none;">` + pp.attc + `</div>`;
                    ress += `<div id="attenapplybg"><button onclick="applyattencur()" style="background-color: #4CAF50;border: none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;">Apply</button></div>`;
                }
            } else {
                ress+= `<h1>No Current Lecture Found</h1>`;
            }
            res.send(ress);
        }
    } else if (a[2] == 'attendance') {
        if (t1.at == 's') { 
            r = await db.query({ branch: t1.uid.substring(0, t1.uid.length - 2) }, 'stuattenintive', env);
            j = await db.query({ uid: t1.uid }, 'stuatten', env);
            t = await db.query({ branch: t1.uid.substring(0, t1.uid.length - 2) }, 'timetables', env);
            r = r[0];
            j = j[0];
            t = t[0];
            subal = {};
            subaln = {};
            for (const property in t.st) {
                subal[property] = [];
                subaln[property] = [];
            }
            r.atten.forEach(element => {
                subal[element.sc].push(element.attc);
                if (j.atten.includes(element.attc)) {
                    subaln[element.sc].push(element.attc);
                }
            });
            ress = `<h1 style="text-align:center;">Attendance</h1><br><br><table style="width:100%;border:1px solid blue"><tr style="border:1px solid blue"><th style="border:1px solid blue">Subject</th><th style="border:1px solid blue">Total Lecture</th><th style="border:1px solid blue">Attended</th><th style="border:1px solid blue">Percentage</th><th style="border:1px solid blue">Exam Status</th></tr>`;
            esr = `<div style="color:red">•</div>`;
            esg = `<div style="color:green">•</div>`;
            esn = `<div style="color:gray">•</div>`;
            for (const property in t.st) {
                pers = (subaln[property].length / subal[property].length) * 100;
                if (Number.isNaN(pers)) {
                    csc = `<div style="color:gray">•</div>`;
                } else if (pers >= 75) {
                    csc = `<div style="color:green">•</div>`;
                } else {
                    csc = `<div style="color:red">•</div>`;
                }
                ress += `<tr style="border:1px solid blue"><td style="border:1px solid blue;text-align:center">` + property + `</td><td style="border:1px solid blue;text-align:center">` + subal[property].length + `</td><td style="border:1px solid blue;text-align:center">` + subaln[property].length + `</td><td style="border:1px solid blue;text-align:center">` + pers + `</td><td style="border:1px solid blue;text-align:center">` + csc + `</td></tr>`;
            }
            ress += `</table><br><br><a onclick="psi('/attendance/apply')">Attendance Apply</a>`;
            res.send(ress);
        }
    } else if (a[2] == 'meta') {
        if (a[3]=='timetable') {
            res.send('');
        } else if (a[3] == 'profile') {
            res.send('');
        } else if (a[3] == 'applyatt') {
            res.send('');
        } else if (a[3] == 'attendance') {
            res.send('');
        } else {
            res.send('');
        }
    } else {
        res.send('');
    }
}
module.exports = {
    pin:pin
}