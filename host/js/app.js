class account {
    constructor(name, uid, role) {

    }
    age() {
        let date = new Date();
        return date.getFullYear() - this.year;
    }
}
logpagecss = `@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap'); body{ margin: 0; padding: 0; font-family: 'Montserrat', sans-serif; } :root{ --corprincipal: #000; --cinza: #D6D6D6; --branco: #FFF; --preto: #000; } .flex{ justify-content: space-between; display: flex; } #telalogin{ background: linear-gradient(-45deg, #0000FF, #0096FF, #00FFFF); animation: gradient 15s ease infinite; background-size: 400% 400%; justify-content: center; flex-direction: column; align-items: center; display: flex; text-align: center; height: 100vh; transition: 0.3s; } @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } } .container-fundo{ box-shadow: 0px 11px 34px #00000033; background-color: var(--branco); box-sizing: border-box; border-radius: 15px; max-width: 450px; padding: 50px; height: auto; width: 100%; } #logo-cliente img{ max-width: 200px; width: 100%; } .container-logins{ padding: 25px 0px; max-width: 440px; margin: auto; } .container-logins .login input{ border: 1px solid var(--cinza); box-sizing: border-box; margin: 5px 0 15px 0; color: var(--preto); border-radius: 6px; font-size: 16px; padding: 10px; height: 44px; width: 100%; transition: 0.3s; } .container-logins .login input::placeholder{ color: var(--cinza); } .container-logins .login input:focus-visible{ outline: 1px solid var(--corprincipal); border: 1px solid var(--corprincipal); } .container-logins .login p{ font-size: 14px; opacity: 0.6; margin: 0; } .container-logins .botao-login{ background-color: var(--branco); border: 1px solid var(--cinza); border-radius: 6px; margin-top: 30px; font-size: 16px; cursor: pointer; width: 150px; height: 45px; transition: 0.3s; } .container-logins .botao-login:hover{ background-color: var(--corprincipal); border: 1px solid var(--corprincipal); color: var(--branco); } .authenticate{ box-shadow: 0px 11px 34px #0000001a; background-color: var(--branco); border-radius: 10px; width: fit-content; padding: 10px 5px; margin: 20px auto; display: flex; } .authenticate svg{ margin: 5px 10px 0; cursor: pointer; width: 25px; } #logo-empresa{ width: 100%; } #logo-empresa img{ max-width: 100px; } @media screen and (max-width: 500px) { .container-fundo { max-width: 350px; padding: 35px; } } .ph:hover{color:blue;} .err{color:red;}`;
fingerprinticon = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M123 472q-4-2-4-6.5t2-8.5q62-86 157-133t203-47q108 0 203.5 46T843 455q3 5 2.5 8t-3.5 6q-3 3-7.5 3t-8.5-5q-59-82-150.5-126T481 297q-103 0-193 44.5T138 467q-4 5-7.5 6t-7.5-1Zm477 503q-103-26-169.5-103T364 685q0-47 34.5-79t82.5-32q48 0 82.5 32t34.5 79q0 38 29.5 64t68.5 26q38 0 66.5-26t28.5-64q0-123-91.5-206T481 396q-127 0-218.5 83T171 685q0 24 5.5 62.5T200 835q2 5 0 7.5t-5 4.5q-4 2-8.5 1t-6.5-6q-13-38-20.5-77.5T152 685q0-129 98-220.5T481 373q136 0 233.5 90T812 685q0 46-34 78t-82 32q-49 0-84-32t-35-78q0-39-28.5-65T481 594q-39 0-68 26t-29 65q0 104 63 173.5T604 956q6 2 7.5 5t.5 7q-1 5-4 7t-8 0ZM247 255q-5 2-7.5.5T235 251q-2-2-2-6t3-6q57-31 119.5-47T481 176q65 0 127.5 16T728 237q5 2 5.5 6t-1.5 7q-2 3-5.5 5t-8.5 0q-55-27-115-42.5T481 197q-62 0-121 14.5T247 255Zm134 709q-58-60-90.5-126T258 685q0-89 65.5-150T481 474q92 0 158.5 61T706 685q0 5-2.5 7.5T696 695q-5 0-8-2.5t-3-7.5q0-81-60.5-136T481 494q-83 0-142.5 55T279 685q0 85 29.5 145T396 950q4 4 3.5 7.5T396 964q-2 2-6.5 3.5T381 964Zm306-73q-88 0-152.5-58.5T470 685q0-5 2.5-8t7.5-3q5 0 7.5 3t2.5 8q0 81 59.5 133.5T687 871q8 0 19-1t24-3q5-1 8 1.5t4 5.5q1 4-.5 7t-6.5 4q-18 5-31.5 5.5t-16.5.5Z"/></svg>`;
async function presetup() {
    window.onpopstate = function () { route(); };
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/sw.js', { scope: '/' })
                .then(reg => cl('Service registered:', reg))
                .catch(err => cl('Service worker registration failed:', err));
        });
    }
    if (getls('isWebAuthnActive') == undefined || getls('isWebAuthnActive') == null || getls('isWebAuthnActive') == '') {
        setls('isWebAuthnActive', 2);
    } else if (getls('isWebAuthnActive') != 2 || getls('isWebAuthnActive') != 1 || getls('isWebAuthnActive') != 0) {
        setls('isWebAuthnActive', 2);
    }
    const style = document.createElement("style");
    style.id = 'style';
    gebi('head').appendChild(style);
    const body = document.createElement("div");
    body.id = 'main';
    gebi('body').appendChild(body);
}
async function webauthncreate() {
    const publicKeyCredentialCreationOptions = {
        challenge: Uint8Array.from("randomStringFromServer", c => c.charCodeAt(0)),
        rp: {
            name: sitename,
            id: siteurl,
        },
        user: {
            id: Uint8Array.from(
                "UZSL85T9AFC", c => c.charCodeAt(0)),
            name: "lee@webauthn.guide",
            displayName: "Lee",
        },
        pubKeyCredParams: [{ alg: -7, type: "public-key" }, { alg: -257, type: "public-key" }],
        authenticatorSelection: {
            authenticatorAttachment: "cross-platform",
        },
        timeout: 60000,
        attestation: "direct"
    };
    const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions
    });
    console.log(credential);
    const utf8Decoder = new TextDecoder('utf-8');
    const decodedClientData = utf8Decoder.decode(credential.response.clientDataJSON);
    const clientDataObj = JSON.parse(decodedClientData);
    console.log(clientDataObj);
    const decodedAttestationObj = CBOR.decode(credential.response.attestationObject);
    console.log(decodedAttestationObj);
    const { authData } = decodedAttestationObj;
    const dataView = new DataView(new ArrayBuffer(2));
    const idLenBytes = authData.slice(53, 55); idLenBytes.forEach((value, index) => dataView.setUint8(index, value));
    const credentialIdLength = dataView.getUint16();
    const credentialId = authData.slice(55, 55 + credentialIdLength);
    console.log(credentialId);
    const publicKeyBytes = authData.slice(55 + credentialIdLength);
    const publicKeyObject = CBOR.decode(publicKeyBytes.buffer);
    console.log(publicKeyObject);
    const publicKeyCredentialRequestOptions = {
        challenge: Uint8Array.from(
            'randomStringFromServer', c => c.charCodeAt(0)),
        allowCredentials: [{
            id: Uint8Array.from(
                credentialId, c => c.charCodeAt(0)),
            type: 'public-key',
            transports: ['usb', 'ble', 'nfc'],
        }],
        timeout: 60000,
    }
    const assertion = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions
    });
    console.log(assertion);
    const storedCredential = await getCredentialFromDatabase(
        userHandle, credentialId);
}
function isteach(input) {
    let regex = /^ET\d\d\d\d\d\d$/ism;
    return regex.test(input);
}
function isadmin(input) {
    let regex = /^EA\d\d\d\d\d\d$/ism;
    return regex.test(input);
}
function ispass(input) {
    let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    return re.test(input);
}
function isstude(input) {
    let regex = /^\d\d[A-Za-z][A-Za-z][A-Za-z]\d\d\d\d$/ism;
    return regex.test(input);
}
async function loginnow() {
    uid = gebi('uid').value;
    pass = gebi('passwd').value;
    let v = 1;
    if (uid == "") {
        gebi("uiderr").innerHTML = "Please enter your UID!"; v = 0;
    } else if (!isstude(uid) && !isteach(uid) && !isadmin(uid)) {
        gebi("uiderr").innerHTML = "Enter Valid UID!"; v = 0;
    } else if (isadmin(uid)) {
        at = 'a';
    } else if (isteach(uid)) {
        at = 't';
    } else if (isstude(uid)) {
        at = 's';
    }
    if (pass == "") {
        gebi("passerr").innerHTML = "Please enter your password!"; v = 0;
    } else if (!ispass(pass)) {
        gebi("passerr").innerHTML = "Wrong Password!"; v = 0;
    }
    if (v == 1) {
        await oneajax('/sys/acchandler', 't=log&uid=' + uid + '&pass=' + pass + '&at=' + at);
    }
}
function shasp() {
    if (gebi("passwd").type == "password") {
        gebi("passwd").type = "text";
        gebi("shasp").innerHTML = "Hide Password";
    } else {
        gebi("passwd").type = "password";
        gebi("shasp").innerHTML = "Show Password";
    }
}
async function loadlogin() {
    gebi('style').innerHTML = logpagecss;
    gebi('main').innerHTML = `<div id="telalogin"><div class="container-fundo"><div id="logo-cliente"><h1>CU</h1></div><div class="container-logins"><div class="login"><input type="text" id="uid" placeholder="UID"><i class="err" id="uiderr"></i><input id="passwd" type="password" placeholder="Passowrd"><i class="err" id="passerr"></i><div class="flex"><p class='ph'>Reset Password</p><p class='ph' id="shasp" onClick="shasp()">Show Password</p></div><button class="botao-login" onClick="loginnow()">Enter</button></div><div class="authenticate">` + fingerprinticon + `</div></div></div></div>`;
}
function webauthpage() {
    ps('/webauthn');
    gebi('style').innerHTML = logpagecss;
    if (getls('isWebAuthnActive') == 2 || ls('isWebAuthnActive') == 1) {
        gebi('main').innerHTML = `<div id="telalogin"><div class="container-fundo"><div id="logo-cliente"><h1>CU</h1></div><div class="container-logins"><h2>WebAuthn Activate</h2><br><h4>Fast Login</h4><div class="authenticate">` + fingerprinticon + `</div><div class="login"><button class="botao-login" onClick="ps('/');setls('isWebAuthnActive',1,);makenav();callpage()">Skip</button></div></div></div></div>`;
    } else {
        gebi('main').innerHTML = `<div id="telalogin"><div class="container-fundo"><div id="logo-cliente"><h1>CU</h1></div><div class="container-logins"><div class="login"><input type="text" id="uid" placeholder="UID"><i class="err" id="uiderr"></i><input id="passwd" type="password" placeholder="Passowrd"><i class="err" id="passerr"></i><div class="flex"><p class='ph'>Reset Password</p><p class='ph' id="shasp" onClick="shasp()">Show Password</p></div><button class="botao-login" onClick="loginnow()">Enter</button></div><div class="authenticate">` + fingerprinticon + `</div></div></div></div>`;
    }
}
function loginapply(res) {
    res = JSON.parse(res);
    if (res.statusCode == 1) {
        setCookie('accheader', res.data.th, 1);
        setCookie('accdata', res.data.td, 1);
        setCookie('acckey', res.data.ts, 1);
        setCookie('accvheader', res.data.tvh, 1);
        setCookie('accvdata', res.data.tvd, 1);
        setCookie('accvkey', res.data.tvs, 1);
        if (getls('isWebAuthnActive') == 2) {
            webauthpage();
        }
    }
}
async function callpage() {
    const udata = await loadurldata();
    ct(udata);
    if (udata.urlpna[0] == 'webauthn') {
        webauthpage();
    } else if (udata.urlpna[0] == 'logout') {
        logout();
    } else {
        gebi('content').innerHTML = 'Loading...';
        applytheme();
        if (udata.urlpna[0] == '' || udata.urlpna[0] == 'home') {
            
        } else if (udata.urlpna[0] == 'attendance' || (udata.urlpna[0] == 'attendance' && udata.urlpna[1]=='apply')) {

        } else if (udata.urlpna[0] == 'createattendance') {

        } else if (udata.urlpna[0] == 'createacc') {

        } else if (udata.urlpna[0] == 'profile') {
            propagereq('profile')
        } else if (udata.urlpna[0] == 'timetable') {
            propagereq('timetable')
        } else if (udata.urlpna[0] == 'createsubject') {

        } else if (udata.urlpna[0] == 'createclass') {

        } else if (udata.urlpna[0] == 'createbranch') {

        } else if (udata.urlpna[0] == 'applymed') {

        } else if (udata.urlpna[0] == 'approvemed') {

        }
    }
    // const successCallback = async (position) =>  {
    // };
    // const errorCallback = (error) => {
    //     gebi('style').innerHTML=logpagecss;
    //     gebi('main').innerHTML=`<div id="telalogin"><div class="container-fundo"><div id="logo-cliente"><h1>CU</h1></div><div class="container-logins"><h2>Allow Location Permisson</h2><div class="login"><button class="botao-login" onClick="ps('/');setls('isWebAuthnActive',1,);callpage()">Check</button></div></div></div></div>`;
    // }; 
    // navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}
async function pageload() {

}
function cl(a) { console.log(a) } function print(a) { console.log(a) } function ct(a) { console.table(a) } function gebi(a) { return document.getElementById(a); } function gesbcn(a) { return document.getElementsByClassName(a); } function setls(a, b) { localStorage.setItem(a, b); } function getls(a) { return localStorage.getItem(a); } function removels(a) { localStorage.removeItem(a); } function clearls() { localStorage.clear();; } function jwthandler(a) { try { p = jwt_decode(a) } catch (e) { p = undefined }; return p; } function randomIntFromInterval(min, max) { return Math.floor(Math.random() * (max - min + 1) + min) }
async function requestsAreComplete(requests) { return requests.every(function (request) { return request.readyState == 4; }); } function unsuccessfulRequests(requests) { var unsuccessful = requests.filter(function (request) { return request.status != 200; }); return unsuccessful.length ? unsuccessful : null; } function onRequestsComplete(requests, callback) { function sharedCallback() { if (requestsAreComplete(requests)) { callback(requests, unsuccessfulRequests(requests)); } } requests.forEach(function (request) { request.onreadystatechange = sharedCallback; }); }
async function setCookie(cname, cvalue, exdays) { const d = new Date(); d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000)); let expires = "expires=" + d.toUTCString(); document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"; } function getCookie(cname) { let name = cname + "="; let ca = document.cookie.split(";"); for (let i = 0; i < ca.length; i++) { let c = ca[i]; while (c.charAt(0) == " ") { c = c.substring(1); } if (c.indexOf(name) == 0) { return c.substring(name.length, c.length); } } return ""; } function checkCookie(cname) { let va = getCookie(cname); if (va != "" && va != undefined) { return true; } else { return false; } } async function removeAllCookie() { var pairs = document.cookie.split(";"); var cookies = {}; for (var i = 0; i < pairs.length; i++) { var pair = pairs[i].split("="); setCookie(pair[0], '', -1); } } function deleteCookie(a) { setCookie(a, '', -1) }
async function httpscheck() { if (window.location.protocol == 'http:') { window.location.href = window.location.href.replace('http:', 'https:'); } }
async function loadurldata() { var urldata = []; urldata['url'] = window.location.href; urldata['urlp'] = window.location.protocol; urldata['urlh'] = window.location.host; urldata['urlpn'] = window.location.pathname; urldata['urlpna'] = window.location.pathname.split('/'); urldata['urlpna'].shift(); urldata['urlse'] = window.location.search; var urlsef = new URLSearchParams(urldata['urlse']); var urlsea = []; for (const [key, value] of urlsef) { urlsea[key] = value; } urldata['urlsea'] = urlsea; return urldata; }
async function switchtheme(a) { if (a == "a") { setCookie("theme_mode", "a", 365); } else if (a == "d") { setCookie("theme_mode", "d", 365); } else if (a == "l") { setCookie("theme_mode", "l", 365); } else if (a == "s") { if (getCookie("theme_mode") == "a") { setCookie("theme_mode", "d", 365); } else if (getCookie("theme_mode") == "d") { setCookie("theme_mode", "l", 365); } else if (getCookie("theme_mode") == "l") { setCookie("theme_mode", "a", 365); } } else { cl("Error: Invalid theme mode"); throw ("Error: Invalid theme mode"); } theme(); applytheme(); } async function theme() { if (checkCookie("theme_mode") == true) { if (getCookie("theme_mode") == "a") { setCookie("theme", "a", 365); } else if (getCookie("theme_mode") == "d") { setCookie("theme", "d", 365); } else if (getCookie("theme_mode") == "l") { setCookie("theme", "l", 365); }} else { if (typeof prefered_theme_mode != "undefined") { if (prefered_theme_mode == "a" && prefered_theme_mode == "d" && prefered_theme_mode == "l") { switchtheme(prefered_theme_mode); } else { switchtheme("a"); } } else { switchtheme("a"); } theme(); } } function applytheme() { let a = getCookie('theme'); if (a == "a") { gebi('mode-ty').innerHTML = 'System: '; gebi("style").innerHTML = "@media(prefers-color-scheme:dark){" + webdarkcss + "}@media(prefers-color-scheme:light){" + weblightcss + "}" + webcss } else if (a == "d") { gebi('mode-ty').innerHTML = ''; gebi("style").innerHTML = webcss + webdarkcss } else if (a == "l") { gebi('mode-ty').innerHTML = ''; gebi("style").innerHTML = webcss + weblightcss } }
async function ps(a, b = sitename) { let stateObj = { id: "100" }; window.history.pushState(stateObj, b, a); }
async function psi(a, b = sitename) { let stateObj = { id: "100" }; window.history.pushState(stateObj, b, a); callpage(); }
async function oneajax(a, b = '') {
    xhttp = new XMLHttpRequest();
    xhttp.open("POST", a, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(b);
    xhttp.onreadystatechange = await function () {
        if (this.readyState == 4 && this.status == 200) {
            let res = JSON.parse(this.responseText);
            eval(res.run);
        }
    };
}
async function propagereq(n) {
    xhrp = new XMLHttpRequest();
    xhrd = new XMLHttpRequest();
    onRequestsComplete([xhrp, xhrd], function (requests, unsuccessful) { 
        if (unsuccessful) {
            return;
        } else {
            gebi('content').innerHTML = requests[0].responseText;
        }
    });
    xhrp.open("GET", "/sp/"+n, true);
    xhrd.open("GET", "/sp/meta/"+n, true);
    xhrp.send();
    xhrd.send();
}
function loadcr(res) {
    res = JSON.parse(res);
    if (res.statusCode == 0) {
        logout();
    } else if (res.statusCode == 1) {
        callpage();
    }
}
async function logout() {
    removeAllCookie();
    const udata = await loadurldata();
    if (udata.urlpna[0] == 'logout'){
        ps('/');
    }
    app();
}
async function makeip(){
    return await fetch("https://ipwho.is/" + reqip + "?fields=ip,message,success,type,continent,continent_code,country,country_code,region,region_code,city,latitude,longitude,postal,calling_code,calling_code,capital,borders,flag,connection.isp,connection.domain,timezone").then((a => a.json())).then((a => JSON.stringify(a)));
}
async function isipok() {
    if (reqip == '::1') {
        return 0;
    } else if (getCookie('ip') != undefined && getCookie('ip') != '' && getCookie('ip') !== null && getls('ip') != undefined && getls('ip') != '' && getls('ip') !== null) {
        let tt = decodeURI(getCookie('ip'))
        if (tt != getls('ip')) {
            let t = await makeip();
            let ttt = encodeURI(t);
            setCookie('ip', ttt, 1);
            setls('ip', t);
            return 0;
        } else {
            let k = JSON.parse(getls('ip'));
            if (k.ip != reqip) {
                let t = await makeip();
                let ttt = encodeURI(t);
                setCookie('ip', ttt, 1);
                setls('ip', t);
                return 0;
            } else {
                return 0;
            }
        }
    } else {
        let t = await makeip();
        let ttt = encodeURI(t);
        setCookie('ip', ttt, 1);
        setls('ip', t);
        return 0;
    }
}
async function makenav() {
    gebi('main').innerHTML = inhtml;
    const hamburger = document.querySelector('.navbar-hamburger');
    const navbarLinks = document.querySelector('.navbar-links');
    const modeToggle = document.querySelector('#mode-toggle');
    const body = document.querySelector('body');

    hamburger.addEventListener('click', () => {
        navbarLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}
async function app() {
    if (isssl == 'y') { await httpscheck() }
    presetup();
    ipdone = 1;
    ipdone = await isipok();
    if (ipdone == 0) {
        gebi('prewarn').innerHTML = '';
        if (getCookie('accdata') != undefined && getCookie('accdata') != null && getCookie('accdata') != '' && getCookie('accheader') != undefined && getCookie('accheader') != null && getCookie('accheader') != '' && getCookie('acckey') != undefined && getCookie('acckey') != null && getCookie('acckey') != '' && getCookie('accvdata') != undefined && getCookie('accvdata') != null && getCookie('accvdata') != '' && getCookie('accvheader') != undefined && getCookie('accvheader') != null && getCookie('accvheader') != '' && getCookie('accvkey') != undefined && getCookie('accvkey') != null && getCookie('accvkey')) {
            oneajax('/sys/acchandler', 't=cr');
            await makenav();
            callpage();
        } else {
            await theme();
            loadlogin();
        }
    }
}
app();
