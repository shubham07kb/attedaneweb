function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function apphandle(req, res,path,port,os,fs,envvar){
    a=req.params[0].split('/')
    if(a[1]=='ua'){
        res.send(DeviceDetector.DeviceDetectorAPI(req.get('User-Agent')));
    } else{
        res.send('Hello '+a[1]);
    }
}
module.exports={
    apphandle:apphandle
};