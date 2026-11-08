(function(){
var $=function(i){return document.getElementById(i)};
function E(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e}
// ================= Чоң граф =================
var CNT=0;function ND(n,r,t,k){return{id:++CNT,n:n,r:r||'',t:t||'',k:k||[]}}
var CACHE={},aliClone=null;
function G(key){
 if(key.charAt(0)=='m'){var fam=LG[key].fam;if(fam=='ali'){if(!aliClone){aliClone=Object.assign({},TREES.ali,{k:TREES.ali.k.slice(4),t:TREES.ali.t+' Хасан, Хусейн жана кыздары Фатима аркылуу Мухаммед санжырасында көрсөтүлгөн.'});}return aliClone}return TREES[fam]}
 if(CACHE[key])return CACHE[key];
 var o=LG[key],node=ND(NM(o.n),o.r,o.t,[]);CACHE[key]=node;node.k=o.k.map(G);return node}
var ROOT=G('t0');
function chain(p,arr){arr.forEach(function(a){var n=ND(a[0],a[1]||'',a[2]||'');p.k.push(n);p=n});return p}
function leaf(p,n,r,t){var x=ND(n,r,t);p.k.push(x);return x}
// Кусай: Хадича, Зубайр
var hu=chain(CACHE.g11,[['Абд аль-Уззо ибн Кусай','Кусайдын уулу'],['Асад','Абд аль-Уззонун уулу'],['Хувайлид','Асаддын уулу · Хадичанын атасы']]);
leaf(hu,WIVES[0].n,'Пайгамбарыбыздын 1-жубайы',WIVES[0].t);
chain(hu,[['Аль-Аввам','Хувайлиддин уулу · Хадичанын агасы'],['Зубайр ибн аль-Аввам','Он сахабанын бири',SAHABA[5].t]]);
// Килаб: Зухра бутагы
var zu=chain(CACHE.g10,[['Зухра','Килабдын уулу · Амина менен Абд аль-Рахман, Саад бутагы']]);
var zm=chain(zu,[['Абд Манаф ибн Зухра','Зухранын уулу']]);
var wh=chain(zm,[['Вахб','Абд Манафтын уулу · Аминанын атасы']]);
leaf(wh,'Амина бинт Вахб','Пайгамбарыбыздын апасы','Пайгамбарыбыздын апасы. Зухра бутагынан. Атасы Абдуллах менен апасы Аминанын санжыралары Килабда кесилишет. Пайгамбарыбыз 6 жашта кезинде Абвада көз жумган.');
chain(zm,[['Ухайб','Абд Манафтын уулу'],['Малик (Абу Ваккас)','Ухайбдин уулу'],['Саад ибн Аби Ваккас','Он сахабанын бири',SAHABA[7].t]]);
chain(zu,[['Аль-Харис ибн Зухра','Зухранын уулу'],['Абд ибн аль-Харис',''],['Абд Ауф',''],['Ауф',''],['Абд аль-Рахман ибн Ауф','Он сахабанын бири',SAHABA[6].t]]);
// Мурра: Махзум (Умму Салама, Халид)
var mg=chain(CACHE.g9,[['Яказа','Мурранын уулу'],['Махзум','Яказанын уулу'],['Умар ибн Махзум',''],['Абдуллах ибн Умар',''],['Аль-Мугира','Махзум бутагы']]);
var au=chain(mg,[['Абу Умайя (Хузайфа)','Аль-Мугирадын уулу']]);leaf(au,WIVES[5].n,'Пайгамбарыбыздын 6-жубайы',WIVES[5].t);
var wl=chain(mg,[['Аль-Валид','Аль-Мугирадын уулу']]);leaf(wl,'Халид ибн аль-Валид','Сахаба · «Сайфуллах»','Сайфуллах (Аллахтын кылычы). Мекке фатхына жакын ислам кабыл алган. Муъта жана Шам жортуулдарында аскер башчысы болгон. Хижранын 21-жылы Химста көз жумган.');
// Тайм: Талха
chain(CACHE.g23,[['Усман ибн Амр','Амрдын уулу'],['Убайдулла',''],['Талха ибн Убайдулла','Он сахабанын бири',SAHABA[4].t]]);
// Нуфайл: Саид
chain(CACHE.g6,[['Амр ибн Нуфайл','Нуфайлдин уулу'],['Зайд ибн Амр','Таухидге умтулган киши'],['Саид ибн Зайд','Он сахабанын бири',SAHABA[8].t]]);
// Луай: Сауда
var lu=chain(CACHE.t12,[['Амир ибн Луай','Луайдын уулу'],['Хисл',''],['Малик ибн Хисл',''],['Наср',''],['Абд Вудд',''],['Абд Шамс ибн Абд Вудд',''],['Кайс',''],['Зам\'а','']]);
leaf(lu,WIVES[1].n,'Пайгамбарыбыздын 2-жубайы',WIVES[1].t);
// Фихр: Абу Убайда
chain(CACHE.t10,[['Аль-Харис ибн Фихр','Фихрдин уулу'],['Дабба',''],['Ухайб',''],['Хилал',''],['Аль-Жаррах',''],['Абдуллах ибн аль-Жаррах',''],['Абу Убайда ибн аль-Жаррах','Он сахабанын бири',SAHABA[9].t]]);
// Мудар: Хилал уруусу
var ha=chain(CACHE.t3,[['Кайс Айлан','Мударын уулу',''],['Хилал (Амир) уруусу','Бир нече ата-баба аралыгы бар']]);
leaf(ha,WIVES[4].n,'Пайгамбарыбыздын 5-жубайы',WIVES[4].t);leaf(ha,WIVES[10].n,'Пайгамбарыбыздын 11-жубайы',WIVES[10].t);
// Хузайма: Зайнаб бинт Жахш
var as=chain(CACHE.t6,[['Асад ибн Хузайма','Хузайманын уулу'],['Жахш ибн Рийаб (Асад уруусу)','Бир нече ата-баба аралыгы бар']]);
leaf(as,WIVES[6].n,'Пайгамбарыбыздын 7-жубайы',WIVES[6].t);
// Умайя: Абу Суфьян
var ab=chain(CACHE.g17,[['Харб','Умайянын уулу'],['Абу Суфьян','Харбдын уулу']]);
leaf(ab,WIVES[8].n,'Пайгамбарыбыздын 9-жубайы',WIVES[8].t);
leaf(ab,'Муавия ибн Аби Суфьян','Умайяддардын 1-халифасы','Умайяддар династиясынын биринчи халифасы (661–680).');
// Хашим: Асад
var ah=chain(CACHE.g13,[['Асад ибн Хашим','Хашимдин уулу']]);leaf(ah,'Фатима бинт Асад','Алинин апасы','Али ибн Абу Талибдин апасы.');
// Абд аль-Мутталиб: агалары, эжелери
var mu=CACHE.g14;
leaf(mu,'Хамза ибн Абд аль-Мутталиб','Агасы',UNCLES[2].t);
var ba=leaf(mu,'Аль-Аббас','Агасы',UNCLES[3].t);
chain(ba,[['Абдуллах ибн Аббас','Аббастын уулу','«Хабр аль-умма», «Тарджуман аль-Куран»'],['Али ибн Абдуллах',''],['Мухаммед ибн Али','']]).k.push(
 ND('Абдуллах ас-Саффах','Аббасийлердин 1-халифасы','Аббасийлер династиясынын биринчи халифасы (750-ж.).'),
 ND('Абу Жафар аль-Мансур','Аббасийлердин 2-халифасы','Багдад шаарын негиздеген (762-ж.).'));
leaf(mu,'Абу Лахаб','Агасы',UNCLES[4].t);leaf(mu,'Аз-Зубайр ибн Абд аль-Мутталиб','Агасы',UNCLES[5].t);leaf(mu,'Аль-Харис','Агасы',UNCLES[0].t);
leaf(mu,'Сафийя бинт Абд аль-Мутталиб','Эжеси',UNCLES[6].t);leaf(mu,'Умайма бинт Абд аль-Мутталиб','Эжеси',UNCLES[7].t);leaf(mu,'Барра бинт Абд аль-Мутталиб','Эжеси',UNCLES[8].t);leaf(mu,'Умму Хаким аль-Байда','Эжеси',UNCLES[9].t);leaf(mu,'Атика жана Арва','Эжелери',UNCLES[10].t);
// Абу Талиб: балдары
var at=CACHE.g8;
leaf(at,'Талиб ибн Абу Талиб','Абу Талибдин уулу','Абу Талибдин улуу уулу.');
var aq=leaf(at,'Акыйл ибн Абу Талиб','Абу Талибдин уулу','Алинин агасы.');leaf(aq,'Муслим ибн Акыйл','Акыйлдын уулу','Хусейндин өкүлү катары Куфага барган, ошол жерде өлтүрүлгөн.');
var ja=leaf(at,'Жафар ибн Абу Талиб','Абу Талибдин уулу','«Жафар ат-Тайяр». Хабашка хижра кылган. Хижранын 8-жылы Муъта салгылашуусунда шейит болгон.');leaf(ja,'Абдуллах ибн Жафар','Жафардын уулу','Зайнаб бинт Алиге үйлөнгөн.');
// ID жана ата-эне
var ALL=[];(function st(n,p){if(!n.id)n.id=++CNT;n._bp=p;ALL.push(n);n.k.forEach(function(c){st(c,n)})})(ROOT,null);
// Хилал уруусу: эки жубайды экинчи жолу эсептебөө үчүн ID бар
function pathTo(n){var a=[];while(n){a.unshift(n);n=n._bp}return a}
function find(name){for(var i=0;i<ALL.length;i++)if(ALL[i].n===name)return ALL[i]}
window.__BIG={ROOT:ROOT,ALL:ALL,find:find};
// ================= Бөлүшүлгөн терезе =================
function showBN(n){var ch=[];
 if(n._bp){ch.push(['Ата-энеси:']);ch.push([n._bp.n,function(){showBN(n._bp)}])}
 if(n.k.length){ch.push([n.k.length>1?'Балдары:':'Баласы:']);n.k.forEach(function(c){ch.push([c.n,function(){showBN(c)}])})}
 ch.push(['Башка көрүнүштөр:']);ch.push(['Бутакта ›',function(){openBranch(n)}]);ch.push(['Чоң картада ›',function(){openMap(n)}]);
 openSh(n.n,n.r,n.t||(n.n+(n._bp?' — '+n._bp.n+' тукуму.':'.')),ch)}
// ================= Көрүнүштөр =================
var VIEWS=[['main','Схема'],['br','Бутак'],['map','Чоң карта'],['wives','Жубайлары'],['sah','Сахабалар'],['rel','Туугандар'],['spr','Таралышы'],['tl','Убакыт']];
var inited={};
var nav=$('nav');
VIEWS.forEach(function(v){var b=E('button','vt',v[1]);b.dataset.v=v[0];b.onclick=function(){showView(v[0])};nav.appendChild(b)});
function showView(v){closeSh();[].forEach.call(document.querySelectorAll('.view'),function(e){e.classList.toggle('on',e.id=='v-'+v)});
 [].forEach.call(document.querySelectorAll('.vt'),function(b){b.classList.toggle('on',b.dataset.v==v)});
 if(!inited[v]){inited[v]=1;INIT[v]&&INIT[v]()}
 if(v=='main')setTimeout(function(){window.draw&&window.draw()},30);
 if(v=='br')brRender();if(v=='map')mapFit(false);
 scrollTo(0,0)}
function cards(host,list,mkChips,note){
 list.forEach(function(it){var b=E('button','card','<b>'+it.n+'</b><span class="cr">'+(it.r||'')+'</span><span class="ct">'+(it.t||'').slice(0,110)+(it.t&&it.t.length>110?'…':'')+'</span>');
  b.onclick=function(){openSh(it.n,it.r,it.t+(it.chain?'\nАта-бабалары: '+it.chain:''),mkChips?mkChips(it):[])};host.appendChild(b)});
 if(note)host.appendChild(E('div','note',note))}
function meetChips(it){return it.m?[['Пайгамбарыбыз менен кесилиши:'],[it.m.n+' ('+it.m.N+'-ата-баба) ›',function(){showView('main');showKey(it.m.k)}]]:[['Пайгамбарыбыз менен кесилиши:'],['Аднан санжырасы менен кесилишпейт']]}
var INIT={
 wives:function(){var h=$('v-wives');h.appendChild(E('h2','sec','Пайгамбарыбыздын жубайлары'));h.appendChild(E('p','sub2','Ар бирин басыңыз, маалымат жана санжыра менен кесилиши ачылат.'));var g=E('div','cg');h.appendChild(g);cards(g,WIVES,meetChips,WNOTE)},
 sah:function(){var h=$('v-sah');h.appendChild(E('h2','sec','Он жаннатты кабарлаган сахаба'));h.appendChild(E('p','sub2','Ар бирин басканда Пайгамбарыбыз менен кесилген жери көрүнөт.'));var g=E('div','cg');h.appendChild(g);cards(g,SAHABA,meetChips)},
 rel:function(){var h=$('v-rel');h.appendChild(E('h2','sec','Агалары жана эжелери'));h.appendChild(E('p','sub2','Абд аль-Мутталибдин балдары (Пайгамбарыбыздын агалары жана эжелери).'));var g=E('div','cg');h.appendChild(g);cards(g,UNCLES,function(){return [['Аббас аркылуу Аббасийлер, Абу Талиб аркылуу Али бутагы'],['Чоң картада көрүү ›',function(){openMap(find('Абд аль-Мутталиб'))}]]})},
 spr:function(){var h=$('v-spr');h.appendChild(E('h2','sec','Хасан-Хусейн тукумдарынын таралышы'));h.appendChild(E('p','sub2','Кайсы жерлерге тараган.'));var g=E('div','cg');h.appendChild(g);cards(g,SPREAD,null,SNOTE)},
 tl:function(){var h=$('v-tl');h.appendChild(E('h2','sec','Убакыт сызыгы'));h.appendChild(E('p','sub2','Пайгамбарыбыздын өмүрүндөгү негизги окуялар. Ар бирин басыңыз.'));var w=E('div','tlw');h.appendChild(w);
  TL.forEach(function(e){var it=E('button','tli','<span class="ty">'+e.y+(e.h?'<small>х. '+e.h+'</small>':'')+'</span><span class="tc"><b>'+e.t+'</b><span class="tp">'+e.w+'</span><span class="tx">'+e.x+'</span></span>');it.onclick=function(){it.classList.toggle('o')};w.appendChild(it)});
  w.appendChild(E('div','note','Жылдар жана күндөр тууралуу тарыхый риваяттарда айырмачылыктар болушу мүмкүн. Жылдар болжолдуу, хижра жылдары ойдо көрсөтүлгөн (х.).'))},
 br:function(){brInit()},map:function(){mapInit()}};
// ================= Бутак (gen.kg стили) =================
var BR={path:[ROOT]},CW=178,PW=158,PH=42,GY=12;
function brInit(){BR.path=pathTo(TREES.muh);var h=$('v-br');h.innerHTML='<div class="brtop"><button id="brinfo" class="brb">ℹ</button><span id="brname"></span></div><div class="brq" id="brq"></div><div class="brs" id="brs"><div id="brm"><svg id="brl"></svg></div></div>';
 [['Пайгамбарыбыз','Мухаммед алейхиссалам'],['Абу Бакр','Абу Бакр ас-Сиддик'],['Умар','Умар ибн аль-Хаттаб'],['Усман','Усман ибн Аффан'],['Али','Али ибн Абу Талиб'],['Хадича',WIVES[0].n]].forEach(function(q){var b=E('button','tab',q[0]);b.onclick=function(){var n=find(q[1]);if(n){BR.path=pathTo(n);brRender(true)}};$('brq').appendChild(b)});
 $('brinfo').onclick=function(){showBN(BR.path[BR.path.length-1])}}
function brRender(scr){var h=$('v-br');if(!h.classList.contains('on')||!$('brm'))return;
 var M=$('brm'),S=$('brs'),SV=$('brl'),path=BR.path,cur=path[path.length-1];
 [].forEach.call(M.querySelectorAll('.bp,.bn'),function(e){e.remove()});
 var groups=[[path[0]]],Y={};Y[path[0].id]=0;
 for(var k=1;k<=path.length;k++)groups.push(path[k-1].k);
 var mn=1e9,mx=-1e9;
 for(k=1;k<groups.length;k++){var g=groups[k],par=path[k-1];g.forEach(function(c,j){Y[c.id]=Y[par.id]+(j-(g.length-1)/2)*(PH+GY)})}
 Object.keys(Y).forEach(function(i){mn=Math.min(mn,Y[i]);mx=Math.max(mx,Y[i])});
 var off=24-mn+PH/2,pad=12,edges=[],H=Math.max(mx-mn+PH+48,330);
 function X(c){return pad+c*CW}
 groups.forEach(function(g,k){g.forEach(function(n){var onp=path.indexOf(n)>=0,p=E('button','bp'+(n===cur?' fc':onp?' pa':''));
  p.style.cssText='left:'+X(k)+'px;top:'+(Y[n.id]+off-PH/2)+'px;width:'+PW+'px;height:'+PH+'px';
  p.innerHTML='<span class="bt">'+n.n+'</span>'+(n.k.length?'<span class="bc">'+n.k.length+'</span>':'');
  p.onclick=function(){if(n===cur){showBN(n);return}BR.path=path.slice(0,k).concat([n]);brRender(true);if(!n.k.length)showBN(n)};M.appendChild(p);
  if(k>0)edges.push([X(k-1)+PW,Y[path[k-1].id]+off,X(k),Y[n.id]+off,onp])})});
 if(!cur.k.length){var z=E('div','bn','бала жок');z.style.cssText='left:'+X(groups.length)+'px;top:'+(Y[cur.id]+off-PH/2)+'px;width:'+PW+'px;height:'+PH+'px';M.appendChild(z)}
 var W=pad*2+(groups.length+1)*CW;M.style.width=W+'px';M.style.height=H+'px';SV.setAttribute('width',W);SV.setAttribute('height',H);
 var d='';edges.forEach(function(e){var mx2=(e[0]+e[2])/2;d+='<path d="M'+e[0]+' '+e[1]+' C'+mx2+' '+e[1]+' '+mx2+' '+e[3]+' '+e[2]+' '+e[3]+'" fill="none" stroke="'+(e[4]?'#c9a24a':'#7aa7a3')+'" stroke-width="'+(e[4]?2.4:1.5)+'" opacity="'+(e[4]?1:.7)+'"/>'});SV.innerHTML=d;
 $('brname').textContent=cur.n+(cur.k.length?' · '+cur.k.length:'');
 var cx=X(path.length-1),sl=S.scrollLeft,cw=S.clientWidth,nl=sl,kr=X(path.length)+PW+10;if(kr>sl+cw)nl=kr-cw;if(cx<nl+8)nl=Math.max(0,cx-10);
 S.scrollTo({left:Math.max(0,nl),top:Math.max(0,Y[cur.id]+off-S.clientHeight/2),behavior:scr?'smooth':'auto'})}
window.openBranch=function(n){showView('br');BR.path=pathTo(n);brRender(true)};
// ================= Чоң карта =================
var MP={tx:0,ty:0,sc:1,pos:{},ready:0};
var COLW=156,BW=140,BH=22,RH=28;
function mapInit(){var h=$('v-map');h.innerHTML='<div class="mapb"><button id="mz1">+</button><button id="mz0">−</button><button id="mhome">Мухаммед</button><button id="mfit">Баары</button></div><div id="mapv"><svg id="mapsvg"><g id="mg"></g></svg></div><p class="hint" style="margin:8px 0">Бир бармак менен жылдырыңыз, эки бармак менен чоңойтуңуз. Ысымды басыңыз.</p>';
 // жайгаштыруу
 var leafi=0,hl={};var pm=pathTo(TREES.muh);pm.forEach(function(n){hl[n.id]=1});
 (function lay(n,d){n._d=d;if(!n.k.length){n._y=leafi++}else{n.k.forEach(function(c){lay(c,d+1)});n._y=(n.k[0]._y+n.k[n.k.length-1]._y)/2}})(ROOT,0);
 var maxd=0;ALL.forEach(function(n){maxd=Math.max(maxd,n._d)});
 MP.W=(maxd+1)*COLW+60;MP.H=leafi*RH+60;
 var g=$('mg'),NS='http://www.w3.org/2000/svg',s='';
 ALL.forEach(function(n){n.k.forEach(function(c){var x1=20+n._d*COLW+BW,y1=30+n._y*RH+BH/2,x2=20+c._d*COLW,y2=30+c._y*RH+BH/2,mx=(x1+x2)/2,on=hl[n.id]&&hl[c.id];s+='<path d="M'+x1+' '+y1+' C'+mx+' '+y1+' '+mx+' '+y2+' '+x2+' '+y2+'" fill="none" stroke="'+(on?'#c9a24a':'#7aa7a3')+'" stroke-width="'+(on?2.2:1.2)+'" opacity="'+(on?1:.6)+'"/>'})});
 ALL.forEach(function(n){var x=20+n._d*COLW,y=30+n._y*RH,t=n.n.length>19?n.n.slice(0,18)+'…':n.n,on=hl[n.id];
  s+='<g data-id="'+n.id+'" class="mn'+(on?' hl':'')+'"><rect x="'+x+'" y="'+y+'" width="'+BW+'" height="'+BH+'" rx="7"/><text x="'+(x+BW/2)+'" y="'+(y+15)+'" text-anchor="middle">'+t.replace(/&/g,'&amp;')+'</text></g>'});
 g.innerHTML=s;
 var byId={};ALL.forEach(function(n){byId[n.id]=n});MP.byId=byId;
 var v=$('mapv'),pts={},sd=null,moved=0,t0=0;
 function apply(){g.setAttribute('transform','translate('+MP.tx+','+MP.ty+') scale('+MP.sc+')')}MP.apply=apply;
 function zoomAt(cx,cy,f){var ns=Math.max(.12,Math.min(3,MP.sc*f));f=ns/MP.sc;MP.tx=cx-(cx-MP.tx)*f;MP.ty=cy-(cy-MP.ty)*f;MP.sc=ns;apply()}
 v.addEventListener('pointerdown',function(e){v.setPointerCapture(e.pointerId);pts[e.pointerId]={x:e.clientX,y:e.clientY};moved=0;t0=Date.now();sd=Object.keys(pts).length==2?dist():null});
 function dist(){var k=Object.keys(pts);var a=pts[k[0]],b=pts[k[1]];return{d:Math.hypot(a.x-b.x,a.y-b.y),cx:(a.x+b.x)/2,cy:(a.y+b.y)/2}}
 v.addEventListener('pointermove',function(e){if(!pts[e.pointerId])return;var p=pts[e.pointerId],dx=e.clientX-p.x,dy=e.clientY-p.y;p.x=e.clientX;p.y=e.clientY;moved+=Math.abs(dx)+Math.abs(dy);
  if(Object.keys(pts).length==2){var n=dist(),r=v.getBoundingClientRect();if(sd&&sd.d>0)zoomAt(n.cx-r.left,n.cy-r.top,n.d/sd.d);sd=n}else{MP.tx+=dx;MP.ty+=dy;apply()}});
 function up(e){var wasTap=moved<8&&Date.now()-t0<500&&Object.keys(pts).length==1;delete pts[e.pointerId];sd=null;
  if(wasTap&&e.type=='pointerup'){var el=document.elementFromPoint(e.clientX,e.clientY),gg=el&&el.closest&&el.closest('g[data-id]');if(gg&&byId[gg.dataset.id])showBN(byId[gg.dataset.id])}}
 v.addEventListener('pointerup',up);v.addEventListener('pointercancel',up);
 v.addEventListener('wheel',function(e){e.preventDefault();var r=v.getBoundingClientRect();zoomAt(e.clientX-r.left,e.clientY-r.top,e.deltaY<0?1.15:.87)},{passive:false});
 $('mz1').onclick=function(){var r=v.getBoundingClientRect();zoomAt(r.width/2,r.height/2,1.3)};
 $('mz0').onclick=function(){var r=v.getBoundingClientRect();zoomAt(r.width/2,r.height/2,.77)};
 $('mhome').onclick=function(){mapFocus(TREES.muh)};
 $('mfit').onclick=function(){mapFit(true)};
 MP.ready=1;mapFocus(TREES.muh)}
function mapFocus(n){if(!MP.ready)return;var v=$('mapv'),r=v.getBoundingClientRect();MP.sc=.9;MP.tx=r.width/2-(20+n._d*COLW+BW/2)*MP.sc;MP.ty=r.height/2-(30+n._y*RH+BH/2)*MP.sc;MP.apply()}
function mapFit(force){if(!MP.ready)return;if(!force)return;var v=$('mapv'),r=v.getBoundingClientRect();MP.sc=Math.min(r.width/MP.W,r.height/MP.H);MP.tx=10;MP.ty=10;MP.apply()}
window.openMap=function(n){showView('map');setTimeout(function(){mapFocus(n)},30)};
// ================= Издөө =================
var DB=[];ALL.forEach(function(n){DB.push({n:n.n,r:n.r,tag:'Санжыра',go:function(){showBN(n)}})});
function addDB(list,tag,tab){list.forEach(function(it){DB.push({n:it.n,r:it.r,tag:tag,go:function(){showView(tab);openSh(it.n,it.r,it.t+(it.chain?'\nАта-бабалары: '+it.chain:''),it.m!==undefined?meetChips(it):[])}})})}
addDB(WIVES,'Жубайы','wives');addDB(SAHABA,'Сахаба','sah');addDB(UNCLES,'Тууган','rel');addDB(SPREAD,'Таралышы','spr');
TL.forEach(function(e){DB.push({n:e.t,r:e.y+(e.h?' · х.'+e.h:''),tag:'Убакыт',go:function(){showView('tl')}})});
function norm(s){return s.toLowerCase().replace(/ё/g,'е').replace(/[ʼ'’`‘]/g,"'")}
var si=$('si'),sr=$('sr');
si.addEventListener('input',function(){var q=norm(si.value.trim());sr.innerHTML='';if(q.length<2){sr.classList.remove('on');return}
 var seen={},res=[];DB.forEach(function(d){var k=d.n+'|'+d.tag;if(seen[k])return;if(norm(d.n).indexOf(q)>=0||norm(d.r||'').indexOf(q)>=0){seen[k]=1;res.push(d)}});
 res.sort(function(a,b){return (norm(a.n).indexOf(q)==0?0:1)-(norm(b.n).indexOf(q)==0?0:1)});
 if(!res.length)sr.innerHTML='<div class="sn">Табылган жок</div>';
 res.slice(0,40).forEach(function(d){var b=E('button','sri','<b>'+d.n+'</b><span>'+(d.r||'')+'</span><i>'+d.tag+'</i>');b.onclick=function(){sr.classList.remove('on');si.value='';d.go()};sr.appendChild(b)});
 sr.classList.add('on')});
document.addEventListener('click',function(e){if(!e.target.closest('#srch'))sr.classList.remove('on')});
// ================= Караңгы режим =================
function setDk(on){document.body.classList.toggle('dk',on);$('dk').textContent=on?'☀':'☾';var m=document.querySelector('meta[name=theme-color]');if(m)m.content=on?'#0b1f1e':'#0f4c4a';try{localStorage.setItem('pg_dk',on?'1':'0')}catch(e){}}
var sv=null;try{sv=localStorage.getItem('pg_dk')}catch(e){}
setDk(sv=='1');$('dk').onclick=function(){setDk(!document.body.classList.contains('dk'))};
window.VX={VIEWS:VIEWS,INIT:INIT,showView:showView,E:E,$:$};
showView('main');
})();
