const mod=require('../connect');
function apphandle(req,res,path,port,os,fs,env){
    a=req.params[0].split('/');
    // console.log(req.body);
    if(a[1]=='favicon.ico'){
        res.header('Content-Type','image/x-icon');
        res.send(fs.readFileSync(env.rootpath+'/host/img/favicon.ico'));
    }
    else if(a[1]=='app.js'){
        res.header("Content-Type", "application/javascript");
        p='sitename="'+env.sitename+'";';
        p+='siteurl="'+env.siteurl+'";';
        p+='isssl="'+env.isssl+'";';
        p+='webdarkcss=`'+fs.readFileSync(env.rootpath+'/host/css/webdark.css')+'`;';
        p+='weblightcss=`'+fs.readFileSync(env.rootpath+'/host/css/weblight.css')+'`;';
        p+='webcss=`'+fs.readFileSync(env.rootpath+'/host/css/web.css')+'`;';
        p+=fs.readFileSync(env.rootpath+'/host/js/cbor.js');
        p+=fs.readFileSync(env.rootpath+'/host/js/app.js');
        res.send(p);
    } else if(a[1]=='sys' && (a[2]=='acchandler' || a[2]=='minify')){
        if(a[1]=='sys'){
            if(a[2]=='acchandler'){
                mod.acchandler(req,res,path,port,os,fs,env);
            } else if(a[2]=='minify'){
                mod.minifier(env);
                res.header("Content-Type", "application/javascript");
                res.send('{"status":"ok","msg":"ok"}');
            }
        }
    } else{
        res.header("Content-Type", "text/html");
        res.render('index.html',{title:env.sitename});
    }
}
module.exports={
    apphandle:apphandle
}; 