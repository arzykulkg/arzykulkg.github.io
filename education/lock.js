/* Exam lock: when /education/exam.json says {"locked":true}, every education page shows a closed screen.
   Fails open (page works) if exam.json cannot be read. Teacher password is checked as a SHA-256 hash. */
(function(){
var H="27fd26e82d91dddfcac1ef33643387b7f3e3672489f243e6f6cd82bb7a9386f2",KEY="exam-ok";
function ok(){try{return localStorage.getItem(KEY)===H}catch(e){return false}}
if(ok())return;
var de=document.documentElement;de.style.visibility="hidden";
var done=false;function show(){if(done)return;done=true;de.style.visibility=""}
setTimeout(show,3000);
fetch("/education/exam.json?t="+Date.now(),{cache:"no-store"}).then(function(r){return r.ok?r.json():{}}).then(function(j){
 if(!j||!j.locked){show();return}
 function build(){
  var b=document.body;if(!b){return setTimeout(build,20)}
  b.innerHTML="";b.style.cssText="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#fff;font-family:system-ui,sans-serif;text-align:center";
  var m=(j.message||"");
  b.innerHTML='<div style="max-width:520px;padding:28px"><div style="font-size:64px">🔒</div><h1 style="margin:10px 0 6px;font-size:28px">Exam in progress</h1><p style="margin:0 0 4px;font-size:18px">Сынак жүрүп жатат · Идёт экзамен</p><p style="opacity:.75;margin:14px 0">This page is closed until the teacher opens it.</p>'+(m?'<p style="background:#1e293b;padding:10px 14px;border-radius:10px">'+m.replace(/</g,"&lt;")+'</p>':'')+'<p style="margin-top:26px"><a href="#" id="tl" style="color:#64748b;font-size:13px">Teacher</a></p></div>';
  document.getElementById("tl").onclick=function(e){e.preventDefault();var p=prompt("Teacher password");if(!p)return;
   crypto.subtle.digest("SHA-256",new TextEncoder().encode(p)).then(function(d){var h=Array.prototype.map.call(new Uint8Array(d),function(x){return("0"+x.toString(16)).slice(-2)}).join("");
    if(h===H){try{localStorage.setItem(KEY,H)}catch(_){}location.reload()}else alert("Wrong password")})};
  show()}
 build();
}).catch(show);
})();
