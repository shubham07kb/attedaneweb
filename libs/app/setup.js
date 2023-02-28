const fs=require('fs');
function init(env){
    config=JSON.parse(fs.readFileSync(env.rootpath+'/config.json', 'utf8'));
    if(config.server==undefined || config.server==''){throw('Please Set Server in Config');}else if(config.server=='localhost' || config.server=='127.0.0.1'){env.server=0}else{env.server=1}
    if(config.isssl==true || config.isssl==false){if(config.isssl==true){env.isssl='y'}else{env.isssl='n'}}else{throw('Please Set SSL in Config');}
    
}
module.exports={ 
    init:init
} 