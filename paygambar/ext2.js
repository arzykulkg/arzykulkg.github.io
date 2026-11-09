// Жаңы көрүнүштөр: Тегерек (спираль) жана Китеп
(function(){
var VIEWS=VX.VIEWS,INIT=VX.INIT,showView=VX.showView,E=VX.E,$=VX.$;
var KEYS=['g15','g14','g13','g12','g11','g10','g9'];for(var i=13;i>=0;i--)KEYS.push('t'+i);
var st=document.createElement('style');st.textContent='@media(min-width:760px){body.wide .w{max-width:1000px}body.wide .bpg{max-width:820px;min-height:560px;padding:44px 56px}body.wide .bpg h2{font-size:46px}body.wide .bpg p{font-size:19px;line-height:1.8}body.wide .bpg .g{font-size:14px}body.wide .rdw svg{min-width:0;width:100%!important;max-width:900px}body.wide .rdz{display:none}body.wide .rdn text{font-size:13.5px}}'+
'.rdw{overflow:auto;border-radius:18px;background:radial-gradient(circle at 50% 50%,#fff8e6,#efe2bd);border:1px solid #d9c58a;touch-action:pan-x pan-y}body.dk .rdw{background:radial-gradient(circle at 50% 50%,#2c2a45,#161428);border-color:#3b3566}'+
'.rdw svg{display:block;margin:0 auto;width:100%;min-width:340px}.rdn{cursor:pointer}.rdn rect{stroke-width:1.5}.rdn text{font:600 14px system-ui;text-anchor:middle;dominant-baseline:central;pointer-events:none}'+
'.rdz{display:flex;gap:8px;justify-content:flex-end;margin:0 0 8px}.rdz button{border:1px solid #c9a24a;background:#fff;color:#2b2740;border-radius:999px;width:38px;height:34px;font:700 17px system-ui;cursor:pointer}'+
'.bkw{display:flex;flex-direction:column;align-items:center;perspective:1200px;margin:6px 0 20px}'+
'.bpg{width:100%;max-width:440px;min-height:430px;background:linear-gradient(135deg,#f7ecd0,#ecdba8);color:#3a2e14;border-radius:6px 18px 18px 6px;border-left:10px solid #6b8f6b;box-shadow:inset 8px 0 14px -8px rgba(0,0,0,.35),0 12px 28px rgba(0,0,0,.22);padding:26px 24px;display:flex;flex-direction:column;transform-origin:left center;transition:transform .28s ease,opacity .28s}'+
'body.dk .bpg{background:linear-gradient(135deg,#3a3220,#2b2516);color:#f0e2bd}.bpg.out{transform:rotateY(-80deg);opacity:0}.bpg.in{transform:rotateY(80deg);opacity:0}'+
'.bpg .g{font:700 12px system-ui;color:#8a6a1c;letter-spacing:.08em;text-transform:uppercase}.bpg h2{font:800 30px/1.1 Georgia,serif;margin:8px 0 4px}.bpg .num{font:800 70px/1 Georgia,serif;color:#b99035;opacity:.55;position:absolute;right:22px;top:18px}'+
'.bpg p{font-size:15px;line-height:1.65;margin:10px 0}.bpg .orn{text-align:center;color:#b99035;letter-spacing:.5em;margin:6px 0}.bpg .sw{margin-top:auto;font-size:12.5px;opacity:.7;text-align:center}'+
'.bnv{display:flex;align-items:center;gap:14px;margin-top:12px;font:700 13px system-ui}.bnv button{width:42px;height:42px;border-radius:50%;border:1px solid #c9a24a;background:#fff;color:#2b2740;font-size:18px;cursor:pointer}';
st.textContent+="";document.head.appendChild(st);
function sec(id){var s=E('section','view');s.id='v-'+id;var last=document.getElementById('v-tl')||document.querySelector('.view:last-of-type');last.parentNode.insertBefore(s,last.nextSibling);return s}
function g(k){return LG[k]}
function nm(k){return (g(k)&&g(k).n)||k}

INIT.rad=function(){
 var h=$('v-rad');
 h.appendChild(E('h2','sec','Ата-бабалар спиралы'));
 h.appendChild(E('p','sub2','Ортодо Пайгамбарыбыз, андан сыртка карай Абдуллахтан Аднанга чейин 21 ата-баба. Ар бирин басыңыз.'));
 var z=E('div','rdz','<button id="rz0">−</button><button id="rz1">+</button>');h.appendChild(z);
 var W=640,cx=W/2,cy=W/2,ns='http://www.w3.org/2000/svg',w=E('div','rdw');
 var svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 '+W+' '+W);
 var pts=KEYS.map(function(k,j){var rg=Math.floor(j/7),a=(-90+(j%7)*360/7+rg*26)*Math.PI/180,r=115+rg*85;return [cx+r*Math.cos(a),cy+r*Math.sin(a)]});
 var d='M'+cx+' '+cy;pts.forEach(function(p,j){d+=(j?' L':' L')+p[0].toFixed(1)+' '+p[1].toFixed(1)});
 var sp='<path d="'+d+'" fill="none" stroke="#b99035" stroke-width="2" stroke-dasharray="3 6" opacity=".7"/>';
 [115,200,285].forEach(function(r){sp+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="#b99035" stroke-opacity=".14"/>'});
 var cols=['#cfe3cf','#f3e4b0','#f0cfc0'],ink='#2b2740';
 var nodes='<g class="rdn" data-k="m2"><circle cx="'+cx+'" cy="'+cy+'" r="54" fill="#3f7a56" stroke="#e3c070" stroke-width="3"/><text x="'+cx+'" y="'+(cy-6)+'" style="font:800 17px Georgia,serif;fill:#fff">Мухаммед</text><text x="'+cx+'" y="'+(cy+12)+'" style="font:500 10px system-ui;fill:#e9f2ea">алейхиссалам</text></g>';
 pts.forEach(function(p,j){var t=nm(KEYS[j]).replace(/ <small>.*$/,'');var wd=Math.max(60,t.length*9+20);
  nodes+='<g class="rdn" data-k="'+KEYS[j]+'"><rect x="'+(p[0]-wd/2).toFixed(1)+'" y="'+(p[1]-14).toFixed(1)+'" width="'+wd+'" height="28" rx="14" fill="'+cols[Math.floor(j/7)]+'" stroke="#b99035"/><text x="'+p[0].toFixed(1)+'" y="'+p[1].toFixed(1)+'" style="fill:'+ink+'">'+t+'</text><text x="'+(p[0]+wd/2-4).toFixed(1)+'" y="'+(p[1]-15).toFixed(1)+'" style="font:700 9px system-ui;fill:#8a6a1c;text-anchor:end">'+(j+1)+'</text></g>'});
 svg.innerHTML=sp+nodes;w.appendChild(svg);h.appendChild(w);
 svg.addEventListener('click',function(e){var n=e.target.closest('.rdn');if(n)showKey(n.dataset.k)});
 var wide=1.35;svg.style.width='135%';svg.style.minWidth='460px';setTimeout(function(){w.scrollLeft=(w.scrollWidth-w.clientWidth)/2},50);function zoom(f){wide=Math.max(.9,Math.min(2.2,wide*f));svg.style.width=(wide*100)+'%';svg.style.minWidth=(340*wide)+'px'}
 $('rz1').onclick=function(){zoom(1.3)};$('rz0').onclick=function(){zoom(1/1.3)};
 h.appendChild(E('div','note','Сан — Пайгамбарыбыздан канчанчы ата-баба экенин көрсөтөт (1 — атасы Абдуллах).'))};

INIT.bk2=function(){
 var h=$('v-bk2');
 h.appendChild(E('h2','sec','Санжыра китеби'));
 h.appendChild(E('p','sub2','Аднандан Пайгамбарыбызга чейин барактап окуңуз (солго-оңго сүрүңүз).'));
 var seq=KEYS.slice().reverse();seq.push('m2');
 var N=seq.length+1,pi=0,w=E('div','bkw'),pg=E('div','bpg');w.appendChild(pg);
 var nv=E('div','bnv','<button id="b2p">‹</button><span id="b2c"></span><button id="b2n">›</button>');w.appendChild(nv);h.appendChild(w);
 function body(i){
  if(i===0)return '<div style="text-align:center;margin-top:34px"><div class="g">Санжыра китеби</div><h2 style="font-size:34px;margin-top:20px">Пайгамбарыбыз Мухаммед</h2><div class="orn">✦ ✦ ✦</div><p style="text-align:center">алейхиссалам<br>Аднандан тартып ата-бабалары</p></div><div class="sw">Барак ачуу үчүн › басыңыз</div>';
  var k=seq[i-1],n=g(k)||{n:k,r:'',t:''},isMe=k==='m2';
  var gen=isMe?'':(' ' );var idx=KEYS.indexOf(k);
  var lab=isMe?'Пайгамбарыбыз':((idx+1)+'-ата-баба');
  return '<div class="g">'+lab+'</div><h2>'+nm(k).replace(/ <small>.*$/,'')+'</h2><div class="orn">✦</div><p>'+(n.t||'').replace(/\n/g,'<br>')+'</p>'}
 function go(n){if(n<0||n>=N)return;pg.classList.add('out');setTimeout(function(){pi=n;pg.innerHTML=body(pi);$('b2c').textContent=(pi+1)+' / '+N;pg.classList.remove('out');pg.classList.add('in');void pg.offsetWidth;pg.classList.remove('in')},250)}
 pg.innerHTML=body(0);$('b2c').textContent='1 / '+N;
 $('b2p').onclick=function(){go(pi-1)};$('b2n').onclick=function(){go(pi+1)};
 var sx=null;pg.addEventListener('pointerdown',function(e){sx=e.clientX});pg.addEventListener('pointerup',function(e){if(sx===null)return;var dx=e.clientX-sx;sx=null;if(Math.abs(dx)>50)go(pi+(dx<0?1:-1));else go(pi+1)})};

sec('rad');sec('bk2');
function wideChk(){document.body.classList.toggle('wide',$('v-rad').classList.contains('on')||$('v-bk2').classList.contains('on'))}
['v-rad','v-bk2'].forEach(function(id){new MutationObserver(wideChk).observe($(id),{attributes:true,attributeFilter:['class']})});
var add=[['rad','Спираль'],['bk2','Китеп']];
var nav=$('nav'),anchor=[].filter.call(nav.children,function(b){return b.dataset.v==='wives'})[0];
add.forEach(function(v){VIEWS.push(v);var b=E('button','vt',v[1]);b.dataset.v=v[0];b.onclick=function(){showView(v[0])};nav.insertBefore(b,anchor)});
})();
