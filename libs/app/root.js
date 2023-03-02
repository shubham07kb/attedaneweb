const fs=require('fs');
function apphandle(req, res,path,port,os,fs,env){
    a=req.params[0].split('/')
    if(a[1]=='app.js'){
        res.header("Content-Type", "application/javascript");
        p='isssl="'+env.isssl+'";';
        p+='webdarkcss=`'+env.isssl+'`;';
        p+='weblightcss=`'+env.isssl+'`;';
        p+='webcss=`'+env.isssl+'`;';
        p+=fs.readFileSync(env.rootpath+'/host/js/app.js');
        res.send(p);
    } else if(a[1]=='sys' && (a[2]=='acchandler')){
        if(a[1]=='sys'){
            if(a[2]=='acchandler'){
                res.send('done');
            }
        }
    } else{
        res.header("Content-Type", "text/html");
        res.render('index.html');
    }
}
module.exports={
    apphandle:apphandle
};