function apphandle(req, res,path,port,os,fs,envvar){
    a=req.params[0].split('/')
    if(a[1]=='ua'){
        res.send(DeviceDetector.DeviceDetectorAPI(req.get('User-Agent')));
    } else{
        res.header("Content-Type", "text/html");
        res.render('index.html');
    }
}
module.exports={
    apphandle:apphandle
};