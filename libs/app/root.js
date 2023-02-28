const fs=require('fs');
function apphandle(req, res,path,port,os,fs,env){
    a=req.params[0].split('/')
    if(a[1]=='app.js'){
        res.header("Content-Type", "application/javascript");
        p='isssl="'+env.isssl+'";';
        p+=fs.readFileSync(env.rootpath+'/host/js/app.js');
        res.send(p);
    } else{
        res.header("Content-Type", "text/html");
        res.render('index.html');
    }
}
module.exports={
    apphandle:apphandle
};