const db=require('../db/db.js');
const bcrypt=require('bcryptjs');
const jwt = require("jsonwebtoken");
function login(){
    
}
function isstude(input){
    let regex = /^\d\d[A-Za-z][A-Za-z][A-Za-z]\d\d\d\d$/ism;
    return regex.test(input);
}
function isteach(input) {
    let regex = /^ET\d\d\d\d\d\d$/ism;
    return regex.test(input);
}
function isadmin(input) {
    let regex = /^EA\d\d\d\d\d\d$/ism;
    return regex.test(input);
}
function ispass(input){
    let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    return re.test(input);
}
async function acchandler(req,res,path,port,os,fs,env){
    if(req.body.t=='log'){
        res.header('Content-Type', 'application/json');
        if(req.body.uid!=undefined && req.body.uid!='' && req.body.pass!=undefined && req.body.pass!='' && req.body.at!=undefined && req.body.at!=''){
            q={uid:req.body.uid};
            p=[];
            if(req.body.at=='a'){
                if(isadmin(req.body.uid)){p=await db.query(q,'employees',env);}
            } else if(req.body.at=='t'){
                if(isteach(req.body.uid)){p=await db.query(q,'teachers',env);}
            } else if(req.body.at=='s'){
                if(isstude(req.body.uid)){p=await db.query(q,'students',env);}
            }
            if(p.length!=1){
                res.send('{"status":"error","statusCode":0,"msg":"UID not found"}');
            } else{
                if(bcrypt.compareSync(req.body.pass, p[0].pass)){
                    ps={uid:p[0].uid,name:p[0].name,email:p[0].email,uemail:p[0].uemail,gen:p[0].gen,dob:p[0].dob,adr:p[0].adr,at:req.body.at};
                    let token=jwt.sign(ps,env.jwtk,{expiresIn:'1h',algorithm:env.jwtkm});
                    let tokenv=jwt.sign(ps,env.jwtkv,{expiresIn:'1h',algorithm:env.jwtkmv});
                    token=token.split('.');
                    tokenv=tokenv.split('.');
                    let tokend={th:token[0],td:token[1],ts:token[2],tvh:tokenv[0],tvd:tokenv[1],tvs:tokenv[2]};
                    res.send('{"status":"success","statusCode":1,"run":"loginapply(this.responseText)","data":'+JSON.stringify(tokend)+'}');
                } else{
                    res.send('{"status":"error","statusCode":0,"msg":"Password incorrect"}');
                }
            }
        } else{
            res.send('{"status":"error","statusCode":0,"msg":"Incorrect parameters"}');
        }
    } else if(req.body.t=='cr'){
        console.log(req.cookies.accdata+'.'+req.cookies.accheader+'.'+req.cookies.acckey);
        console.log(req.cookies.accvdata+'.'+req.cookies.accvheader+'.'+req.cookies.accvkey);
        let t1=jwt.verify(req.cookies.accdata+'.'+req.cookies.accheader+'.'+req.cookies.acckey,env.jwtk,{algorithms:env.jwtkm});
        let t2=jwt.verify(req.cookies.accvdata+'.'+req.cookies.accvheader+'.'+req.cookies.accvkey,env.jwtkv,{algorithms:env.jwtkm});
        if(t1==t2){
            res.send('{"status":"success","statusCode":1,"run":"loadcr(this.responseText)","data":'+JSON.stringify(tokend)+'}');
        } else{
            
        }
    }
}
async function r(pass){
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(pass, salt);
    return secPass;
}
module.exports={
    login:login,
    acchandler:acchandler
}