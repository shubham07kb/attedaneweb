const fs=require('fs');
function init(env){
    config=JSON.parse(fs.readFileSync(env.rootpath+'/config.json', 'utf8'));
    if(config.sitename==undefined || config.sitename=='' || config.siteurl==undefined || config.siteurl==''){
        throw('Please set the sitename and siteurl in config.json');
    } else{
        env.sitename=config.sitename;
        env.siteurl=config.siteurl;
    }
    if(config.server==undefined || config.server==''){throw('Please Set Server in Config');}else if(config.server=='localhost' || config.server=='127.0.0.1'){env.server=0}else{env.server=1}
    if(config.isssl==true || config.isssl==false){if(config.isssl==true){env.isssl='y'}else{env.isssl='n'}}else{throw('Please Set SSL in Config');}
    if(typeof config.db=='object'){
        if(config.db.s==undefined || config.db.s==''){throw('Please Set Server in Config');}
        else if(config.db.s=='mongodb' || config.db.s=='sql'){
            if(config.db.s=='mongodb'){
                if(config.db.url==undefined || config.db.url=='' || config.db.dbname==undefined || config.db.dbname==''){
                    throw('Please Set Server in Config Correctly');
                } else{
                    env.dbtype=config.db.s;
                    env.dburl=config.db.url;
                    env.dbname=config.db.dbname;
                }
            } else if(config.db.s=='sql'){
                
            } 
        } else{
            throw('Please Set Server in Config Correctly');
        }
    } else{
        throw('Please Set DB in Config');
    }
    if(typeof config.security_keys=='object'){
        if(config.security_keys.jwt_key==undefined || config.security_keys.jwt_key=='' || config.security_keys.jwt_key_method==undefined || config.security_keys.jwt_key_method=='' || config.security_keys.jwt_key_v==undefined || config.security_keys.jwt_key_v=='' || config.security_keys.jwt_key_method_v==undefined || config.security_keys.jwt_key_method_v==''){
            throw('Please Set Server in Config Correctly');
        } else{
            env.jwtk=config.security_keys.jwt_key;
            env.jwtkm=config.security_keys.jwt_key_method;
            env.jwtkv=config.security_keys.jwt_key_v;
            env.jwtkmv=config.security_keys.jwt_key_method_v;
        }
    }
}
function cron() {
    
}
module.exports={ 
    init: init,
    cron: cron
} 