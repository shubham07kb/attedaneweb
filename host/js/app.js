class account{
    constructor(name,uid,role){
        
    }
    age() {
        let date = new Date();
        return date.getFullYear() - this.year;
      }
}
async function loadlogin(){
    
}
function cl(a){console.log(a)}function ct(a){console.table(a)}function gebi(a){return document.getElementById(a);}function gesbcn(a){return document.getElementsByClassName(a);}function setls(a,b){localStorage.setItem(a,b);}function getls(a){return localStorage.getItem(a);}function removels(a){localStorage.removeItem(a);}function clearls(){localStorage.clear();;}function jwthandler(a){try{p=jwt_decode(a)}catch(e){p=undefined};return p;}function randomIntFromInterval(min,max){return Math.floor(Math.random()*(max-min+1)+min)}
async function setCookie(cname,cvalue,exdays){const d=new Date();d.setTime(d.getTime()+(exdays*24*60*60*1000));let expires="expires="+d.toUTCString();document.cookie=cname+"="+cvalue+";"+expires+";path=/";}function getCookie(cname){let name=cname+"=";let ca=document.cookie.split(";");for(let i=0;i<ca.length;i++){let c=ca[i];while(c.charAt(0)==" "){c=c.substring(1);}if(c.indexOf(name)==0){return c.substring(name.length,c.length);}}return "";}function checkCookie(cname){let va=getCookie(cname);if(va!="" && va!=undefined){return true;}else{return false;}}async function removeAllCookie(){var pairs=document.cookie.split(";");var cookies = {};for (var i=0; i<pairs.length; i++){var pair = pairs[i].split("=");setCookie(pair[0],'',-1);}} function deleteCookie(a){setCookie(a,'',-1)}
async function httpscheck(){if(window.location.protocol=='http:'){window.location.href=window.location.href.replace('http:','https:');}}
async function app(){
    if(isssl=='y'){await httpscheck()}
    if(getCookie('accdata')!=undefined && getCookie('accdata')!=null && getCookie('accdata')!='' && getCookie('accheader')!=undefined && getCookie('accheader')!=null && getCookie('accheader')!='' && getCookie('acckey')!=undefined && getCookie('acckey')!=null && getCookie('acckey')!=''){
        
    } else{
        loadlogin();
    }
}
app();