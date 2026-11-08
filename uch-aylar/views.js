(function(){
var U=window.UA,TOP=U.TOP,Z=U.ZONES,E=U.E,V=document.getElementById('views'),built={},cur='prezi';
var css='.ly{position:absolute;inset:0;overflow-y:auto;overflow-x:hidden;display:none;padding-top:104px;-webkit-overflow-scrolling:touch}'+
'.dark{background:radial-gradient(ellipse at 50% 0,#2a2760,#12102a 70%);color:#f3eefc}.dark .st{position:absolute;border-radius:50%;background:#fff;pointer-events:none}'+
'.mo-w{position:relative;width:min(92vw,380px);aspect-ratio:1;margin:8px auto 0}.mo-c{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:46%;text-align:center}'+
'.mo-c .big{width:100%;filter:drop-shadow(0 0 22px rgba(247,233,180,.55))}.mo-c b{display:block;margin-top:8px;font:800 14px/1.25 system-ui}.mo-c small{display:block;opacity:.7;font-size:11.5px;margin-top:3px}'+
'.mo-n{position:absolute;transform:translate(-50%,-50%);width:62px;background:none;border:0;color:#f3eefc;font:700 11px system-ui;cursor:pointer;text-align:center;padding:0}.mo-n svg{display:block;margin:0 auto 3px;width:50px;height:50px;border-radius:50%}'+
'.mo-n.on svg{box-shadow:0 0 0 3px #e3b95a,0 0 18px #e3b95a}.mo-n i{font-style:normal;display:block;opacity:.8;font-weight:600}'+
'.mo-n svg{box-shadow:0 0 0 2px var(--zc)}'+
'.mo-leg{display:flex;justify-content:center;gap:14px;margin:18px 0 90px;font:700 12px system-ui}.mo-leg span:before{content:"";display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:5px;background:var(--zc)}'+
'.sk{position:relative;margin:0 auto;max-width:520px}.sk svg.ln{position:absolute;left:0;top:0;width:100%;pointer-events:none}'+
'.lan{position:absolute;transform:translate(-50%,0);width:46%;text-align:center;background:none;border:0;color:#f3eefc;cursor:pointer;padding:0}.lan .gl{position:absolute;left:50%;top:6px;border-radius:50%;transform:translate(-50%,0);filter:blur(10px);opacity:.55}'+
'.lan svg{position:relative;display:block;margin:0 auto}.lan b{display:block;font:800 13px/1.25 system-ui;margin-top:4px}.lan small{opacity:.75;font-size:11.5px}'+
'.rd{position:relative;margin:0 auto;max-width:520px;color:var(--ink)}.rd svg.rp{position:absolute;left:0;top:0;pointer-events:none}'+
'.rs{position:absolute;width:50%;background:none;border:0;color:var(--ink);cursor:pointer;padding:0;text-align:left;font-family:inherit}.rs .c{position:absolute;top:0;width:54px;height:54px;border-radius:50%;border:4px solid var(--zc);background:var(--card);display:flex;align-items:center;justify-content:center;font:800 20px Georgia,serif;color:var(--acc);box-shadow:0 4px 12px rgba(0,0,0,.18)}'+
'.rs .x{padding-top:2px}.rs.l{text-align:right}.rs b{display:block;font:800 14px/1.25 system-ui}.rs small{color:var(--mut);font-size:12px}'+
'.gap{position:absolute;left:50%;transform:translateX(-50%);background:var(--bg);border:1px dashed var(--line);border-radius:999px;font:700 11px system-ui;color:var(--mut);padding:3px 9px;white-space:nowrap}'+
'.today{position:absolute;transform:translateX(-50%);background:#d94a4a;color:#fff;border-radius:999px;font:800 12px system-ui;padding:5px 12px;box-shadow:0 4px 12px rgba(0,0,0,.3);z-index:2}'+
'.bk{position:absolute;inset:0;padding-top:104px;display:flex;flex-direction:column;align-items:center;perspective:1200px;touch-action:pan-y}'+
'.pg{width:min(92vw,420px);height:calc(100% - 190px);min-height:380px;background:linear-gradient(135deg,#f7ecd0,#efdfb6);color:#3a2e14;border-radius:6px 18px 18px 6px;box-shadow:inset 8px 0 14px -8px rgba(0,0,0,.35),0 12px 30px rgba(0,0,0,.3);border-left:10px solid #7b4f23;padding:26px 24px;display:flex;flex-direction:column;transform-origin:left center;transition:transform .28s ease,opacity .28s;overflow:hidden;position:relative}'+
'body.dk .pg{background:linear-gradient(135deg,#3a3220,#2b2516);color:#f0e2bd}'+
'.pg.out{transform:rotateY(-80deg);opacity:0}.pg.in{transform:rotateY(80deg);opacity:0}'+
'.pg h2{font:800 26px/1.15 Georgia,serif;margin:6px 0 8px}.pg .big{font:800 78px/1 Georgia,serif;color:#9b6a1c}.pg .ar{direction:rtl;text-align:center;font:400 24px/1.9 Amiri,serif;margin:10px 0 4px}.pg p{font-size:14.5px;line-height:1.55;margin:4px 0}.pg .rf{color:#9b6a1c;font-weight:700;font-size:12px}'+
'.pg .ch{display:flex;flex-wrap:wrap;gap:6px;margin-top:auto}.pg .ch button,.pg .go{border:1px solid #9b6a1c;background:transparent;color:inherit;border-radius:999px;padding:7px 12px;font:700 13px system-ui;cursor:pointer}.pg .go{background:#9b6a1c;color:#fff}'+
'.pg ol{padding:0;margin:8px 0;list-style:none}.pg ol li{padding:9px 4px;border-bottom:1px dashed #b08a4a;font-size:14.5px;cursor:pointer;display:flex;justify-content:space-between;gap:8px}'+
'.bn{display:flex;align-items:center;gap:14px;margin:12px 0 80px;font:700 13px system-ui;color:var(--ink)}.bn button{width:42px;height:42px;border-radius:50%;border:1px solid var(--line);background:var(--card);color:var(--ink);font-size:18px;cursor:pointer}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

var MODES=[['prezi','🎬 Prezi'],['moon','🌙 Ай'],['sky','✨ Түн'],['road','🛤 Жол'],['book','📖 Китеп']];
var M=document.getElementById('modes');
M.innerHTML=MODES.map(function(m){return '<button data-m="'+m[0]+'">'+m[1]+'</button>'}).join('');
function layer(id,cls){var d=document.createElement('div');d.className='ly '+(cls||'');d.id='ly-'+id;V.appendChild(d);return d}
function stars(L,n){var h='',r=7;function R(){r=(r*9301+49297)%233280;return r/233280}for(var i=0;i<n;i++){var s=R()*2+1;h+='<i class="st" style="left:'+R()*100+'%;top:'+R()*100+'%;width:'+s+'px;height:'+s+'px;opacity:'+(.3+R()*.6)+'"></i>'}var w=document.createElement('div');w.style.cssText='position:absolute;inset:0;pointer-events:none';w.innerHTML=h;L.appendChild(w)}
function hd(t){var m=t.h.match(/(\d+)/);return m?+m[1]:1}
function mon3(t){return t.m.slice(0,3)}
function moon(age,sz){var r=50,p=age/29.53,k=Math.cos(2*Math.PI*p),rx=(Math.abs(k)*r).toFixed(2),wax=p<=.5,sw=k>0?0:1;
 var lit='M50 0A50 50 0 0 1 50 100A'+rx+' 50 0 0 '+sw+' 50 0Z';
 return '<svg viewBox="0 0 100 100" width="'+sz+'" height="'+sz+'"><circle cx="50" cy="50" r="50" fill="#2b3068"/><g'+(wax?'':' transform="translate(100 0) scale(-1 1)"')+'><path d="'+lit+'" fill="#f7e9b4"/></g></svg>'}
function zc(t){return Z[t.z].c}
function zcol(t){return ['#a98be0','#4fb59b','#e0b94a'][t.z]}
var KEY={1:1,3:1,5:1,7:1};

// MOON
function buildMoon(L){
 L.classList.add('dark');stars(L,70);
 var h='<div class="mo-w"><div class="mo-c" id="mo-c"></div>';
 TOP.forEach(function(t,i){var a=(-90+45*i)*Math.PI/180,x=50+39*Math.cos(a),y=50+39*Math.sin(a);
  h+='<button class="mo-n" data-i="'+i+'" style="left:'+x+'%;top:'+y+'%;--zc:'+zcol(t)+'">'+moon(hd(t)-1+1,50)+t.d+' '+mon3(t)+'</button>'});
 h+='</div><div class="mo-leg">'+Z.map(function(z,k){return '<span style="--zc:'+['#a98be0','#4fb59b','#e0b94a'][k]+'">'+z.n+'</span>'}).join('')+'</div>';
 L.insertAdjacentHTML('beforeend',h);moonCenter(-1);
 L.onclick=function(e){var b=e.target.closest('.mo-n');if(b)U.show(+b.dataset.i)}}
function moonCenter(i){var c=document.getElementById('mo-c');if(!c)return;
 if(i<0){c.innerHTML=moon(14,120).replace('<svg','<svg class="big"')+'<b>Үч айлар</b><small>Күндү басыңыз</small>'}
 else{var t=TOP[i];c.innerHTML=moon(hd(t)-1+1,120).replace('<svg','<svg class="big"')+'<b>'+E(t.title)+'</b><small>'+t.h+'</small>'}
 [].forEach.call(document.querySelectorAll('.mo-n'),function(b){b.classList.toggle('on',+b.dataset.i===i)})}

// SKY
function lantern(c,s){return '<svg width="'+s+'" height="'+s*1.4+'" viewBox="0 0 40 56"><line x1="20" y1="0" x2="20" y2="8" stroke="#e3b95a" stroke-width="2"/><path d="M10 12h20l3 6v22q0 6-6 6H13q-6 0-6-6V18z" fill="'+c+'" stroke="#fff5cc" stroke-width="1.5"/><ellipse cx="20" cy="30" rx="5" ry="8" fill="#fff6c8"/><path d="M12 50h16" stroke="#e3b95a" stroke-width="3" stroke-linecap="round"/></svg>'}
function buildSky(L){
 L.classList.add('dark');stars(L,110);
 var Hh=TOP.length*190+120,h='<div class="sk" style="height:'+Hh+'px"><svg class="ln" viewBox="0 0 100 '+Hh+'" preserveAspectRatio="none" height="'+Hh+'"><polyline fill="none" stroke="#e3b95a" stroke-opacity=".5" stroke-width="1.5" stroke-dasharray="4 6" vector-effect="non-scaling-stroke" points="';
 var pts=[];TOP.forEach(function(t,i){var x=i%2?72:28,y=40+i*190+50;pts.push([x,y])});
 h+=pts.map(function(p){return p[0]+','+p[1]}).join(' ')+'"/></svg>';
 TOP.forEach(function(t,i){var big=KEY[i],s=big?54:40,g=big?130:86;
  h+='<button class="lan" data-i="'+i+'" style="left:'+pts[i][0]+'%;top:'+(40+i*190)+'px"><span class="gl" style="width:'+g+'px;height:'+g+'px;background:'+t.fl+';margin-left:0;top:'+(big?-8:2)+'px"></span>'+lantern(t.fl,s)+'<b>'+E(t.title)+'</b><small>'+t.d+' '+t.m+'</small></button>'});
 h+='</div>';L.innerHTML+=h;L.insertAdjacentHTML('beforeend','<div style="height:90px"></div>');
 L.onclick=function(e){var b=e.target.closest('.lan');if(b)U.show(+b.dataset.i)}}

// ROAD
var MS=[31,28,31,30,31,30,31,31,30,31,30,31],MON={'Январь':0,'Февраль':1,'Март':2,'Декабрь':11};
function dt(t){return new Date(t.y,MON[t.m],t.d)}
function buildRoad(L){
 var W=Math.min(L.clientWidth||390,520),SP=170,Y0=60,H=Y0+TOP.length*SP+80;
 var pts=TOP.map(function(t,i){return [i%2?W*.72:W*.28,Y0+i*SP+30]});
 var d='M'+pts[0][0]+' '+(pts[0][1]-60);d+=' L'+pts[0][0]+' '+pts[0][1];
 for(var i=1;i<pts.length;i++){var a=pts[i-1],b=pts[i],my=(a[1]+b[1])/2;d+=' C'+a[0]+' '+my+' '+b[0]+' '+my+' '+b[0]+' '+b[1]}
 var h='<div class="rd" style="height:'+H+'px"><svg class="rp" width="'+W+'" height="'+H+'"><path d="'+d+'" fill="none" stroke="#c9b98f" stroke-width="30" stroke-linecap="round" opacity=".55"/><path d="'+d+'" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="10 12" opacity=".8"/></svg>';
 TOP.forEach(function(t,i){var left=i%2===0,x=pts[i][0],y=pts[i][1];
  h+='<button class="rs '+(left?'':'l')+'" data-i="'+i+'" style="--zc:'+zcol(t)+';top:'+(y-27)+'px;'+(left?'left:'+(x+36)+'px;width:'+(W-x-44)+'px':'left:'+(x-36-(x-8))+'px;width:'+(x-44)+'px')+'"><span class="c" style="'+(left?'left:-70px':'right:-70px')+'">'+t.d+'</span><div class="x"><b>'+E(t.title)+'</b><small>'+t.d+' '+t.m+' · '+t.wd+'</small></div></button>';
  if(i>0){var g=Math.round((dt(t)-dt(TOP[i-1]))/864e5);h+='<span class="gap" style="top:'+((pts[i-1][1]+y)/2-10)+'px">'+g+' күн</span>'}});
 var n=new Date(),now=new Date(n.getFullYear(),n.getMonth(),n.getDate()),ty,txt;
 if(now<dt(TOP[0])){ty=pts[0][1]-70;txt='📍 Бүгүн · '+Math.round((dt(TOP[0])-now)/864e5)+' күн калды'}
 else if(now>dt(TOP[TOP.length-1])){ty=pts[pts.length-1][1]+70;txt='📍 Бүгүн'}
 else{for(var i=1;i<TOP.length;i++){if(now<=dt(TOP[i])){var f=(now-dt(TOP[i-1]))/(dt(TOP[i])-dt(TOP[i-1]));ty=pts[i-1][1]+(pts[i][1]-pts[i-1][1])*f;txt='📍 Бүгүн';break}}}
 h+='<span class="today" style="left:'+W/2+'px;top:'+ty+'px">'+txt+'</span></div><div style="height:90px"></div>';
 L.innerHTML=h;
 L.onclick=function(e){var b=e.target.closest('.rs');if(b)U.show(+b.dataset.i)};
 var tt=L.querySelector('.today');if(tt)setTimeout(function(){L.scrollTop=Math.max(0,tt.offsetTop-220)},50)}

// BOOK
var pi=0,N=TOP.length+2;
function page(i){
 if(i===0)return '<div style="text-align:center;margin-top:30px"><div class="ar">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div><h2 style="margin-top:30px">Үч айлар</h2><p>Ражаб · Шаабан · Рамазан</p><p class="rf">1448 хижра · 2026–2027</p><div class="big" style="font-size:90px;margin-top:20px">☪</div><p style="margin-top:auto;font-size:12.5px">Барактарды солго-оңго сүрүңүз же ›</p></div>';
 if(i===N-1)return '<h2>Мазмуну</h2><ol>'+TOP.map(function(t,k){return '<li data-i="'+k+'"><span>'+E(t.title)+'</span><span class="rf">'+t.d+' '+mon3(t)+'</span></li>'}).join('')+'</ol>';
 var t=TOP[i-1],a=t.ayat[0];
 return '<div class="rf">'+Z[t.z].n+' · '+t.wd+'</div><div class="big">'+t.d+'</div><div class="rf">'+t.m+' '+t.y+' · '+t.h+'</div><h2>'+E(t.title)+'</h2>'+(a.ar?'<div class="ar" style="font-size:21px">'+E(a.ar.length>140?a.ar.slice(0,140)+'…':a.ar)+'</div>':'')+'<p class="rf" style="text-align:center">'+E(a.ref.split('.')[0])+'</p><div class="ch"><button class="go" data-i="'+(i-1)+'" data-k="0">Толук окуу</button>'+['Аят','Хадис','Фикх','Окуя','Амал'].slice(1).map(function(n,k){return '<button data-i="'+(i-1)+'" data-k="'+(k+1)+'">'+n+'</button>'}).join('')+'</div>'}
function buildBook(L){
 L.innerHTML='<div class="bk"><div class="pg" id="pg"></div><div class="bn"><button id="bp">‹</button><span id="bc"></span><button id="bx">›</button></div></div>';
 function go(n,dir){if(n<0||n>=N)return;var p=document.getElementById('pg');p.classList.add('out');setTimeout(function(){pi=n;p.innerHTML=page(pi);document.getElementById('bc').textContent=(pi+1)+' / '+N;p.classList.remove('out');p.classList.add('in');void p.offsetWidth;p.classList.remove('in')},250)}
 document.getElementById('pg').innerHTML=page(0);document.getElementById('bc').textContent='1 / '+N;
 document.getElementById('bp').onclick=function(){go(pi-1)};document.getElementById('bx').onclick=function(){go(pi+1)};
 L.addEventListener('click',function(e){var b=e.target.closest('[data-i]');if(!b)return;var i=+b.dataset.i;if(b.tagName==='LI'){go(i+1);return}U.show(i);if(b.dataset.k)setTimeout(function(){var t=document.querySelectorAll('#tabs button')[+b.dataset.k];if(t)t.click()},50)});
 var sx=null;L.addEventListener('pointerdown',function(e){sx=e.clientX});L.addEventListener('pointerup',function(e){if(sx===null)return;var dx=e.clientX-sx;sx=null;if(Math.abs(dx)>60)go(pi+(dx<0?1:-1))})}

var B={moon:buildMoon,sky:buildSky,road:buildRoad,book:buildBook};
function set(m){
 if(!MODES.some(function(x){return x[0]===m}))m='prezi';
 U.close();cur=m;U.setMode(m);
 [].forEach.call(V.children,function(c){c.style.display='none'});
 if(m!=='prezi'){var L=document.getElementById('ly-'+m);if(!L){L=layer(m);L.style.display='block';B[m](L)}L.style.display='block'}
 [].forEach.call(M.children,function(b){b.classList.toggle('on',b.dataset.m===m)});
 try{localStorage.setItem('ua-mode',m)}catch(e){}}
M.onclick=function(e){var b=e.target.closest('button');if(b)set(b.dataset.m)};
U.onShow=function(i){if(cur==='moon')moonCenter(i)};
var q=(location.search.match(/v=(\w+)/)||[])[1],m0='prezi';try{m0=q||localStorage.getItem('ua-mode')||'prezi'}catch(e){m0=q||'prezi'}
set(m0);
var hh=parseInt((location.hash||'').slice(1),10);if(!isNaN(hh)&&hh>=0&&hh<TOP.length)U.show(hh);
})();
