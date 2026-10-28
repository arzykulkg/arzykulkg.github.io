/* Education access: (1) password gate for students, (2) exam lock via /education/exam.json.
   exam.json: {"locked":true|false,"message":"...","gate":true|false}. Passwords are checked as SHA-256 hashes in the browser
   (basic protection only). Students' password opens the site; the teacher password also bypasses the exam lock. */
(function(){
var HS="4bd42384c2bd93c0c653afb88f319970a5f610878b50f116fa60e46b5aec37f9",HT="27fd26e82d91dddfcac1ef33643387b7f3e3672489f243e6f6cd82bb7a9386f2",KS="edu-pass",KT="exam-ok";
function get(k){try{return localStorage.getItem(k)}catch(e){return null}}
function set(k,v){try{localStorage.setItem(k,v)}catch(e){}}
var teacher=get(KT)===HT,student=teacher||get(KS)===HS;
var de=document.documentElement;de.style.visibility="hidden";
var done=false;function show(){if(done)return;done=true;de.style.visibility=""}
setTimeout(function(){if(student)show()},3000);
function sha(p,cb){crypto.subtle.digest("SHA-256",new TextEncoder().encode(p)).then(function(d){cb(Array.prototype.map.call(new Uint8Array(d),function(x){return("0"+x.toString(16)).slice(-2)}).join(""))})}
function screen(html,after){var b=document.body;if(!b){return setTimeout(function(){screen(html,after)},20)}
 b.innerHTML=html;b.style.cssText="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#fff;font-family:system-ui,sans-serif;text-align:center";after&&after();show()}
function gate(){screen('<div style="max-width:420px;padding:28px"><div style="font-size:56px">🔑</div><h1 style="margin:10px 0 6px;font-size:26px">Indigo Prime Academy</h1><p style="margin:0 0 4px;font-size:16px">Education · Password required</p><p style="opacity:.7;margin:4px 0 16px;font-size:14px">Сыр сөз керек · Нужен пароль</p><input id="pw" type="password" autocomplete="current-password" placeholder="Password" style="width:100%;box-sizing:border-box;padding:12px 14px;border-radius:10px;border:0;font-size:16px"><button id="go" style="margin-top:12px;width:100%;padding:12px;border:0;border-radius:10px;background:#2563eb;color:#fff;font-size:16px;font-weight:700;cursor:pointer">Open</button><p id="er" style="color:#fca5a5;min-height:20px;margin:10px 0 0"></p></div>',function(){
 var pw=document.getElementById("pw");function go(){sha(pw.value,function(h){if(h===HS||h===HT){set(KS,HS);if(h===HT)set(KT,HT);location.reload()}else{document.getElementById("er").textContent="Wrong password · Туура эмес · Неверный пароль"}})}
 document.getElementById("go").onclick=go;pw.onkeydown=function(e){if(e.key==="Enter")go()};pw.focus()})}
function lockScreen(j){var m=j.message||"";
 screen('<div style="max-width:520px;padding:28px"><div style="font-size:64px">🔒</div><h1 style="margin:10px 0 6px;font-size:28px">Exam in progress</h1><p style="margin:0 0 4px;font-size:18px">Сынак жүрүп жатат · Идёт экзамен</p><p style="opacity:.75;margin:14px 0">This page is closed until the teacher opens it.</p>'+(m?'<p style="background:#1e293b;padding:10px 14px;border-radius:10px">'+m.replace(/</g,"&lt;")+'</p>':'')+'<p style="margin-top:26px"><a href="#" id="tl" style="color:#64748b;font-size:13px">Teacher</a></p></div>',function(){
 document.getElementById("tl").onclick=function(e){e.preventDefault();var p=prompt("Teacher password");if(!p)return;sha(p,function(h){if(h===HT){set(KT,HT);set(KS,HS);location.reload()}else alert("Wrong password")})}})}
fetch("/education/exam.json?t="+Date.now(),{cache:"no-store"}).then(function(r){return r.ok?r.json():{}}).catch(function(){return null}).then(function(j){
 j=j||{};
 if(j.gate!==false&&!student){gate();return}
 if(j.locked&&!teacher){lockScreen(j);return}
 show()});
})();
