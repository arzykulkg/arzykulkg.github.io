/* Game Zone · 26 classroom games built on each unit's data */
(function(){
const h=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const pick=(a,k)=>shuffle(a).slice(0,k);
const norm=s=>s.toLowerCase().replace(/[’']/g,"'").replace(/[^\p{L}\p{N}' -]/gu,"").replace(/\s+/g," ").trim();
let TIMERS=[];
window.stopGame=function(){TIMERS.forEach(t=>{clearInterval(t);clearTimeout(t);cancelAnimationFrame(t)});TIMERS=[];try{speechSynthesis.cancel()}catch(e){}};
const every=(ms,f)=>{const t=setInterval(f,ms);TIMERS.push(t);return t};
const later=(ms,f)=>{const t=setTimeout(f,ms);TIMERS.push(t);return t};
function say(w){try{const u=new SpeechSynthesisUtterance(w);u.lang="ky-KG";u.rate=.85;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}}
function best(k,v,lower){let b=0;try{b=+localStorage.getItem(k)||0}catch(e){}const nb=!b?v:(lower?Math.min(b,v):Math.max(b,v));try{localStorage.setItem(k,nb)}catch(e){}return nb}

/* ---------- data for a unit (ui) or the whole grade (ui<0) ---------- */
function D(n,ui){
  const units=ui<0?G[n].units:[G[n].units[ui]];
  const qs=units.flatMap(poolUnit);
  const pairs=units.flatMap(u=>u.v.m||[]);
  const pics=units.flatMap(u=>u.pic||[]);
  const sorts=units.flatMap(u=>["g","v","w"].flatMap(k=>(u[k]?u[k].ex:[]).filter(e=>e.type=="sort")));
  const orders=units.flatMap(u=>["g","v","w"].flatMap(k=>(u[k]?u[k].ex:[]).filter(e=>e.type=="order").flatMap(e=>e.qs)));
  const words=[...new Set(pics.map(p=>p[0]).concat(pairs.map(p=>p[0])).filter(w=>/^\p{L}[\p{L} -]{2,14}$/u.test(w)))];
  const all=G[n].units;
  return{qs,pairs,pics,words,
    sorts:sorts.length?sorts:all.flatMap(u=>["g","v","w"].flatMap(k=>(u[k]?u[k].ex:[]).filter(e=>e.type=="sort"))),
    orders:orders.length?orders:all.flatMap(u=>["g","v","w"].flatMap(k=>(u[k]?u[k].ex:[]).filter(e=>e.type=="order").flatMap(e=>e.qs))),
    allPics:all.flatMap(u=>u.pic||[]),allPairs:all.flatMap(u=>u.v.m||[])}}

/* ---------- shared pieces ---------- */
function head(card,parts){const hd=h("div","ghead");const out={};parts.forEach(p=>{out[p]=h("span");hd.append(out[p])});card.append(hd);return out}
function bar(card,secs){const b=h("div","timer"),f=h("i");f.style.width="100%";b.append(f);card.append(b);return s=>f.style.width=Math.max(0,s/secs*100)+"%"}
function countdown(secs,onTick,onEnd){let left=secs;onTick(left);return every(1000,()=>{left--;onTick(left);if(left<=0){stopGame();onEnd()}})}
function result(card,title,big,sub,again){stopGame();card.innerHTML="";const r=h("div","result");r.append(h("b",null,title),h("div","n",big),h("div",null,sub||""));
  const a=h("div","actions"),p=h("button","act","Кайра ойноо");p.onclick=()=>{card.innerHTML="";again()};a.append(p);r.append(a);card.append(r)}
function askQ(box,q,onAnswer,opts={}){ // renders a question with option buttons
  box.innerHTML="";const t=h("div","big",q.t);const b=h("div","gbtns");let o=shuffle(q.o);if(opts.half){const wrong=o.filter(x=>x!=q.a);o=shuffle([q.a,wrong[0]])}
  o.forEach(x=>{const btn=h("button",null,x);btn.onclick=()=>{[...b.children].forEach(c=>c.disabled=true);onAnswer(x==q.a,x,btn)};b.append(btn)});box.append(t,b);return b}
function fb(el,ok,msg){el.className="fb "+(ok?"y":"n");el.textContent=msg}
const fill=(q)=>q.t.replace("___",q.a);
function qDeck(d){let deck=shuffle(d.qs),i=0;return()=>{if(i>=deck.length){deck=shuffle(d.qs);i=0}return deck[i++]}}

/* ---------- GAMES ---------- */
const GAMES=[
/* 1 */{id:"speed",icon:"⏱",name:"Ылдам жарыш",desc:"60 секундда мүмкүн болушунча көп суроого жооп бер.",run(card,d,key,again){
  const H=head(card,["s","st","t"]),tb=bar(card,60),box=h("div"),f=h("div","fb");card.append(box,f);const next=qDeck(d);let score=0,streak=0;
  const go=()=>{const q=next();askQ(box,q,ok=>{if(ok){streak++;score+=streak>=3?2:1;fb(f,1,streak>=3?"Туура! Бонус +1":"Туура!")}else{streak=0;fb(f,0,"✗ "+fill(q))}H.s.textContent="Упай: "+score;H.st.textContent=streak>=2?"🔥 "+streak:"";go()})};
  H.s.textContent="Упай: 0";go();countdown(60,s=>{H.t.textContent=s+" s";tb(s)},()=>result(card,"Убакыт бүттү!",score,"Рекорд: "+best(key,score),again))}},
/* 2 */{id:"car",icon:"🏎️",name:"Машина жарышы",desc:"Ар бир туура жооп машинаңды алга жылдырат. Компьютерден мурун мааракага жет!",run(card,d,key,again){
  const track=h("div","track");const lanes=[["you","🏎️","Сен"],["cpu","🚙","Компьютер"]].map(([c,e,l])=>{const lane=h("div","lane");const car=h("span","car",e);car.style.left="0%";lane.append(h("span","lname",l),car,h("span","flag","🏁"));track.append(lane);return car});
  const box=h("div"),f=h("div","fb");card.append(track,box,f);const next=qDeck(d);let me=0,cpu=0,done=false;const STEPS=10;
  const move=()=>{lanes[0].style.left=(me/STEPS*88)+"%";lanes[1].style.left=(cpu/STEPS*88)+"%"};
  const end=win=>{if(done)return;done=true;later(500,()=>result(card,win?"Сен уттуң! 🏆":"Компьютер утту!",win?"1-орун":"2-орун",win?"Мыкты айдадың!":"Кийинкиде тезирээк жооп бер.",again))};
  every(4500,()=>{if(done)return;cpu++;move();if(cpu>=STEPS)end(false)});
  const go=()=>{if(done)return;const q=next();askQ(box,q,ok=>{if(ok){me++;fb(f,1,"Туура! Алга!")}else{fb(f,0,"Ой! "+fill(q))}move();if(me>=STEPS)end(true);else go()})};go()}},
/* 3 */{id:"egg",icon:"🥚",name:"Жумуртка секирүү",desc:"Жумуртканы эң жогорку тактага чейин секирт. Туура эмес жооп жумуртканы жарат!",run(card,d,key,again){
  const tower=h("div","tower");const LV=8;const plats=[];for(let i=LV;i>=0;i--){const p=h("div","plat");p.style.setProperty("--off",((i*37)%60)+"%");if(i==LV)p.append(h("span","nest","🪺"));plats.unshift(p);tower.append(p)}
  const egg=h("span","egg","🥚");const H=head(card,["lv","life"]);const box=h("div"),f=h("div","fb");card.append(tower,box,f);let lv=0,lives=3;
  const place=()=>{plats[lv].append(egg);egg.classList.remove("hop");void egg.offsetWidth;egg.classList.add("hop");H.lv.textContent="Деңгээл "+lv+" / "+LV;H.life.textContent="❤️".repeat(lives)+"🤍".repeat(3-lives)};
  const next=qDeck(d);place();
  const go=()=>{const q=next();askQ(box,q,ok=>{if(ok){lv++;fb(f,1,"Секир!")}else{lives--;if(lv>0)lv--;fb(f,0,"Жарака кетти! "+fill(q))}place();
    if(lv>=LV){egg.textContent="🐣";later(700,()=>result(card,"Жумуртка жетти! 🐣",LV+"-деңгээл","Уяда балапан чыкты!",again))}
    else if(lives<=0){egg.textContent="🍳";later(700,()=>result(card,"Жумуртка сынды!",lv+"-деңгээл","Эң жакшы деңгээл: "+best(key,lv),again))}else go()})};go()}},
/* 4 */{id:"picmatch",icon:"🖼️",name:"Сүрөт менен туташтыруу",desc:"Сүрөттү карап, туура сөздү танда.",run(card,d,key,again){
  const pics=d.pics.length>=4?d.pics:d.allPics;const deck=pick(pics,Math.min(10,pics.length));let i=0,score=0;const H=head(card,["s"]);const box=h("div"),f=h("div","fb");card.append(box,f);
  const go=()=>{if(i>=deck.length)return result(card,"Бүттү!",score+" / "+deck.length,"Рекорд: "+best(key,score),again);const [w,e]=deck[i++];
    const others=pick(pics.filter(p=>p[0]!=w),3).map(p=>p[0]);const q={t:e,o:[w].concat(others),a:w};const b=askQ(box,q,ok=>{if(ok){score++;fb(f,1,"Ооба! "+w)}else fb(f,0,"Туурасы: "+w);say(w);H.s.textContent="Упай: "+score;later(700,go)});box.firstChild.classList.add("emoji")};
  H.s.textContent="Упай: 0";go()}},
/* 5 */{id:"defmatch",icon:"🔗",name:"Маани менен туташтыруу",desc:"Сөздү, анан анын маанисин бас. Бардык жуптарды туташтыр.",run(card,d,key,again){
  const pairs=pick(d.pairs.length>=4?d.pairs:d.allPairs,6);const wrap=h("div","twocol"),L=h("div","colm"),R=h("div","colm");wrap.append(L,R);const H=head(card,["s","m"]);card.append(wrap);
  let selL=null,done=0,moves=0;const upd=()=>{H.s.textContent="Жуптар: "+done+" / "+pairs.length;H.m.textContent="Аракет: "+moves};upd();
  shuffle(pairs).forEach(p=>{const b=h("button","mbtn",p[0]);b.dataset.k=p[0];b.onclick=()=>{if(b.classList.contains("done"))return;[...L.children].forEach(x=>x.classList.remove("on"));b.classList.add("on");selL=b};L.append(b)});
  shuffle(pairs).forEach(p=>{const b=h("button","mbtn",p[1]);b.dataset.k=p[0];b.onclick=()=>{if(!selL||b.classList.contains("done"))return;moves++;
    if(selL.dataset.k==b.dataset.k){selL.className="mbtn done";b.className="mbtn done";selL=null;done++;if(done==pairs.length)later(500,()=>result(card,"Баары туташты!",moves+" аракет","Рекорд: "+best(key,moves,true)+" аракет",again))}
    else{b.classList.add("bad");later(500,()=>b.classList.remove("bad"))}upd()};R.append(b)})}},
/* 6 */{id:"memory",icon:"🃏",name:"Эс тутум: сөз жана маани",desc:"Эки картаны ачып, сөздү маанисине жупта.",run(card,d,key,again){memory(card,pick(d.pairs.length>=4?d.pairs:d.allPairs,6),key,again)}},
/* 7 */{id:"picmemory",icon:"🧩",name:"Эс тутум: сүрөттөр",desc:"Сүрөттү жана анын сөзүн тап.",run(card,d,key,again){memory(card,pick(d.pics.length>=4?d.pics:d.allPics,6),key,again,true)}},
/* 8 */{id:"tf",icon:"✅",name:"Туурабы же туура эмеспи?",desc:"Сүйлөм туурабы? Тез чечим кабыл ал!",run(card,d,key,again){
  const H=head(card,["s","t"]),tb=bar(card,45),box=h("div"),f=h("div","fb");card.append(box,f);const next=qDeck(d);let score=0;
  const go=()=>{const q=next();const right=Math.random()<.5;const w=right?q.a:shuffle(q.o.filter(x=>x!=q.a))[0]||q.a;const s=q.t.replace("___",w);const isOk=w==q.a;
    box.innerHTML="";const t=h("div","big",s);const b=h("div","gbtns"),y=h("button","yes","✓ Туура"),n=h("button","no","✗ Туура эмес");b.append(y,n);box.append(t,b);
    const ans=v=>{if(v==isOk){score++;fb(f,1,"Туура!")}else fb(f,0,isOk?"Бул туура эле.":"Туурасы: "+fill(q));H.s.textContent="Упай: "+score;go()};y.onclick=()=>ans(true);n.onclick=()=>ans(false)};
  H.s.textContent="Упай: 0";go();countdown(45,s=>{H.t.textContent=s+" s";tb(s)},()=>result(card,"Убакыт бүттү!",score,"Рекорд: "+best(key,score),again))}},
/* 9 */{id:"balloon",icon:"🎈",name:"Шарларды сакта",desc:"Сөздү тамга-тамгасы менен тап. Ар бир туура эмес тамга бир шарды жарат.",run(card,d,key,again){
  const pics=d.pics.length?d.pics:d.allPics;const cand=pics.filter(p=>/^\p{L}{3,10}$/u.test(p[0]));const [w,e]=shuffle(cand.length?cand:pics)[0];const word=w.toLowerCase();
  let lives=6;const got=new Set();const top=h("div","balloons"),hint=h("div","big emoji",e),slots=h("div","scr"),kb=h("div","kb"),f=h("div","fb");card.append(top,hint,slots,kb,f);
  const draw=()=>{top.textContent="🎈".repeat(lives)+"💥".repeat(6-lives);slots.innerHTML="";[...word].forEach(c=>slots.append(h("span",null,c==" "||got.has(c)?c:"")))};
  "абвгдеёжзийклмнңоөпрстуүфхцчшщъыьэюя".split("").forEach(c=>{const b=h("button","key",c);b.onclick=()=>{b.disabled=true;if(word.includes(c)){got.add(c);b.classList.add("ok")}else{lives--;b.classList.add("bad")}draw();
    if([...word].every(x=>x==" "||got.has(x))){say(w);later(600,()=>result(card,"Шарларды сактап калдың! 🎈",w,lives+" шар калды",again))}else if(lives<=0)later(600,()=>result(card,"Баары жарылды! 💥",w,"Сөз: "+w,again))};kb.append(b)});draw()}},
/* 10 */{id:"whack",icon:"🔨",name:"Сөздү ур",desc:"Сөздөр тешиктерден чыгат. Маанисине туура келгенин ур!",run(card,d,key,again){
  const pairs=d.pairs.length>=4?d.pairs:d.allPairs;const H=head(card,["s","t"]),tb=bar(card,45);const clue=h("div","big"),grid=h("div","holes"),f=h("div","fb");card.append(clue,grid,f);
  const holes=[...Array(6)].map(()=>{const x=h("button","hole");grid.append(x);return x});let target,score=0;
  const newT=()=>{target=shuffle(pairs)[0];clue.textContent="Тап: "+target[1]};
  const pop=()=>{holes.forEach(x=>{x.textContent="";x.className="hole"});const ws=shuffle([target[0]].concat(pick(pairs.filter(p=>p[0]!=target[0]),2).map(p=>p[0])));const hs=pick(holes,3);
    hs.forEach((x,i)=>{x.textContent=ws[i];x.className="hole up";x.onclick=()=>{if(!x.textContent)return;if(ws[i]==target[0]){score++;fb(f,1,"Так тийди! Туура!");newT()}else{fb(f,0,"Бул эмес!")}x.textContent="";x.className="hole";H.s.textContent="Упай: "+score}})};
  newT();pop();every(1700,pop);H.s.textContent="Упай: 0";countdown(45,s=>{H.t.textContent=s+" s";tb(s)},()=>result(card,"Убакыт бүттү!",score,"Рекорд: "+best(key,score),again))}},
/* 11 */{id:"falling",icon:"🌧️",name:"Түшкөн сөздөр",desc:"Боштукка туура келген сөздү жерге түшө электе карма.",run(card,d,key,again){
  const H=head(card,["s","life"]),clue=h("div","big"),sky=h("div","sky"),f=h("div","fb");card.append(clue,sky,f);const next=qDeck(d);let score=0,lives=3,q,drops=[],y=0;
  const upd=()=>{H.s.textContent="Упай: "+score;H.life.textContent="❤️".repeat(lives)};
  const spawn=()=>{q=next();clue.textContent=q.t;sky.innerHTML="";y=0;drops=shuffle(q.o).map((o,i,a)=>{const b=h("button","drop",o);b.style.left=(8+i*(84/a.length))+"%";b.onclick=()=>{if(o==q.a){score++;fb(f,1,"Кармадың!");upd();spawn()}else{b.classList.add("bad");b.disabled=true}};sky.append(b);return b})};
  every(60,()=>{y+=.45;drops.forEach(b=>b.style.top=y+"%");if(y>=86){lives--;fb(f,0,"Өткөрүп жибердиң! "+fill(q));upd();if(lives<=0)result(card,"Оюн бүттү",score,"Рекорд: "+best(key,score),again);else spawn()}});upd();spawn()}},
/* 12 */{id:"ladder",icon:"🪜",name:"Тепкичке чык",desc:"10 суроо, 10 тепкич. 50:50 жардамын бир жолу колдон. 5-тепкич коопсуз.",run(card,d,key,again){
  const lad=h("div","ladder");const steps=[];for(let i=10;i>=1;i--){const s=h("div","rung",i==5?"5 ★ коопсуз":String(i));steps.unshift(s);lad.append(s)}
  const side=h("div","ladwrap"),box=h("div"),f=h("div","fb"),ff=h("button","act alt","50:50");side.append(lad,h("div"));side.lastChild.append(box,ff,f);card.append(side);
  let lv=0,half=false,used=false;const deck=pick(d.qs,10);const mark=()=>steps.forEach((s,i)=>s.classList.toggle("on",i<lv));
  ff.onclick=()=>{if(used)return;used=true;half=true;ff.disabled=true;ask()};
  const ask=()=>{const q=deck[lv];askQ(box,q,ok=>{half=false;if(ok){lv++;mark();fb(f,1,"Бир тепкич өйдө!");if(lv>=10)later(500,()=>result(card,"Чокуга чыктың! 🏆","10 / 10","Укмуш!",again));else later(500,ask)}
    else{const safe=lv>=5?5:0;fb(f,0,fill(q));later(900,()=>result(card,"Кулап кеттиң!",safe+"-тепкич","Сен "+lv+"-тепкичке жеттиң. Рекорд: "+best(key,lv),again))}},{half})};ask()}},
/* 13 */{id:"teams",icon:"⚔️",name:"Командалар беттеши",desc:"Эки команда кезек менен ойнойт. Интерактивдүү тактага эң ылайыктуу!",run(card,d,key,again){
  let sc=[0,0],turn=0,round=0;const R=12;const H=h("div","teams");const A=h("div","team a"),B=h("div","team b");H.append(A,B);const box=h("div"),f=h("div","fb");card.append(H,box,f);const next=qDeck(d);
  const upd=()=>{A.innerHTML="";B.innerHTML="";A.append(h("b",null,"А командасы"),h("span",null,sc[0]));B.append(h("b",null,"Б командасы"),h("span",null,sc[1]));A.classList.toggle("on",turn==0);B.classList.toggle("on",turn==1)};
  const go=()=>{if(round>=R){return result(card,sc[0]==sc[1]?"Тең чыкты!":(sc[0]>sc[1]?"А командасы утту!":"Б командасы утту!"),sc[0]+" : "+sc[1],"",again)}upd();const q=next();
    askQ(box,q,ok=>{if(ok){sc[turn]++;fb(f,1,"Упай "+"АБ"[turn]+" командасына!")}else fb(f,0,fill(q));round++;turn=1-turn;upd();later(900,go)})};go()}},
/* 14 */{id:"wheel",icon:"🎡",name:"Дөңгөлөктү айлант",desc:"Дөңгөлөктү айлантып упай ал (же жоготуп ал!), анан жооп бер.",run(card,d,key,again){
  const segs=[100,200,"x2",300,"Жок",150,"Бонус",250];const cv=document.createElement("canvas");cv.width=320;cv.height=320;cv.className="wheel";const H=head(card,["s","r"]);
  const sp=h("button","act","Айлант!"),box=h("div"),f=h("div","fb");card.append(cv,sp,box,f);const ctx=cv.getContext("2d");let ang=0,score=0,round=0;const next=qDeck(d);
  const cols=["#e76f51","#f4a261","#2a9d8f","#457b9d","#8d99ae","#e9c46a","#9b5de5","#43aa8b"];
  const draw=()=>{ctx.clearRect(0,0,320,320);segs.forEach((s,i)=>{const a0=ang+i*2*Math.PI/8,a1=a0+2*Math.PI/8;ctx.beginPath();ctx.moveTo(160,160);ctx.arc(160,160,150,a0,a1);ctx.fillStyle=cols[i];ctx.fill();ctx.save();ctx.translate(160,160);ctx.rotate(a0+Math.PI/8);ctx.fillStyle="#fff";ctx.font="bold 18px sans-serif";ctx.textAlign="right";ctx.fillText(s,140,6);ctx.restore()});
    ctx.beginPath();ctx.moveTo(150,2);ctx.lineTo(170,2);ctx.lineTo(160,28);ctx.fillStyle="#222";ctx.fill()};
  const upd=()=>{H.s.textContent="Упай: "+score;H.r.textContent="Раунд "+round+" / 6"};upd();draw();
  sp.onclick=()=>{if(round>=6)return;sp.disabled=true;box.innerHTML="";let v=.35+Math.random()*.2;const t=every(30,()=>{ang+=v;v*=.97;draw();if(v<.004){clearInterval(t);
    const top=(((-Math.PI/2-ang)%(2*Math.PI))+2*Math.PI)%(2*Math.PI);const seg=segs[Math.floor(top/(2*Math.PI/8))];fb(f,1,"Түштү: "+seg);const q=next();
    askQ(box,q,ok=>{round++;if(ok){score=seg=="x2"?score*2||100:seg=="Бонус"?score+500:seg=="Жок"?score:score+seg;fb(f,1,"Туура! +"+seg)}else{if(seg=="Жок")score=0;fb(f,0,fill(q))}upd();sp.disabled=false;if(round>=6)later(800,()=>result(card,"Жыйынтык",score,"Рекорд: "+best(key,score),again))})}})}}},
/* 15 */{id:"odd",icon:"🔍",name:"Ашыкчасын тап",desc:"Үч сөз бир топко кирет. Ашыкчасын тап!",run(card,d,key,again){
  const H=head(card,["s"]);const box=h("div"),f=h("div","fb");card.append(box,f);let i=0,score=0;const R=8;
  const go=()=>{if(i>=R)return result(card,"Бүттү!",score+" / "+R,"Рекорд: "+best(key,score),again);i++;const s=shuffle(d.sorts)[0];const cats=s.cats.map((c,ci)=>Object.keys(s.items).filter(w=>s.items[w]==ci)).filter(a=>a.length);
    const big=shuffle(cats.filter(a=>a.length>=3))[0]||cats[0];const other=shuffle(cats.filter(a=>a!==big))[0]||[];const odd=shuffle(other)[0];const three=pick(big,3);
    if(!odd){return go()}const q={t:"Кайсынысы ашыкча?",o:three.concat(odd),a:odd};askQ(box,q,ok=>{if(ok){score++;fb(f,1,"Ооба! "+odd+" — башкача.")}else fb(f,0,"Ашыкчасы: "+odd);H.s.textContent="Упай: "+score;later(900,go)})};
  H.s.textContent="Упай: 0";go()}},
/* 16 */{id:"swipe",icon:"↔️",name:"Топко жөнөт",desc:"Ар бир сөздү туура тарапка тез жөнөт.",run(card,d,key,again){
  const s=shuffle(d.sorts.filter(x=>x.cats.length==2))[0]||d.sorts[0];const H=head(card,["s","t"]),tb=bar(card,40);const word=h("div","big"),b=h("div","gbtns"),f=h("div","fb");card.append(word,b,f);
  let score=0,deck=shuffle(Object.keys(s.items)),i=0;const btns=s.cats.map((c,ci)=>{const x=h("button",null,(ci==0?"⬅ ":"")+c+(ci==s.cats.length-1?" ➡":""));x.onclick=()=>ans(ci);b.append(x);return x});
  const show=()=>{if(i>=deck.length){deck=shuffle(deck);i=0}word.textContent=deck[i]};const ans=ci=>{const w=deck[i];if(s.items[w]==ci){score++;fb(f,1,"Туура!")}else fb(f,0,w+" → "+s.cats[s.items[w]]);i++;H.s.textContent="Упай: "+score;show()};
  show();H.s.textContent="Упай: 0";countdown(40,x=>{H.t.textContent=x+" s";tb(x)},()=>result(card,"Убакыт бүттү!",score,"Рекорд: "+best(key,score),again))}},
/* 17 */{id:"bee",icon:"🐝",name:"Туура жаз",desc:"Угуп же сүрөттү карап, сөздү туура жаз.",run(card,d,key,again){
  const pics=(d.pics.length?d.pics:d.allPics).filter(p=>/^[\p{L} -]{3,14}$/u.test(p[0]));const deck=pick(pics,8);let i=0,score=0;const H=head(card,["s"]);
  const pic=h("div","big emoji"),hear=h("button","act alt","🔊 Сөздү угуу"),inp=h("input"),row=h("div","actions"),ok=h("button","act","Текшерүү"),f=h("div","fb");inp.type="text";inp.id="bee";inp.autocomplete="off";inp.spellcheck=false;inp.placeholder="Сөздү жазгыла…";
  row.append(ok,hear);card.append(pic,inp,row,f);const show=()=>{if(i>=deck.length)return result(card,"Бүттү!",score+" / "+deck.length,"Рекорд: "+best(key,score),again);pic.textContent=deck[i][1];inp.value="";inp.focus();say(deck[i][0])};
  const check=()=>{const w=deck[i][0];if(norm(inp.value)==norm(w)){score++;fb(f,1,"Туурасы: "+w)}else fb(f,0,"Туура жазылышы: "+w);i++;H.s.textContent="Упай: "+score+" / "+deck.length;show()};
  ok.onclick=check;inp.onkeydown=e=>{if(e.key=="Enter")check()};hear.onclick=()=>say(deck[i]&&deck[i][0]);H.s.textContent="Упай: 0";show()}},
/* 18 */{id:"builder",icon:"🧱",name:"Сүйлөм курама жарышы",desc:"Убакыт бүтө электе сүйлөмдөрдү туура тартипте түз.",run(card,d,key,again){
  const deck=shuffle(d.orders);let i=0,score=0;const H=head(card,["s","t"]),tb=bar(card,90);const line=h("div","oline"),bank=h("div","obank"),f=h("div","fb"),row=h("div","actions"),ok=h("button","act","Текшерүү"),skip=h("button","act alt","Өткөрүү");row.append(ok,skip);card.append(bank,line,row,f);
  let parts=[];const show=()=>{if(i>=deck.length){deck.push(...shuffle(deck))}parts=deck[i].split("|");line.innerHTML="";bank.innerHTML="";shuffle(parts).forEach(w=>{const c=h("span","chip",w);c.onclick=()=>{(c.parentNode===bank?line:bank).append(c)};bank.append(c)})};
  ok.onclick=()=>{const s=[...line.children].map(x=>x.textContent).join(" ");if(norm(s)==norm(parts.join(" "))){score++;fb(f,1,"Эң сонун!")}else fb(f,0,parts.join(" "));i++;H.s.textContent="Упай: "+score;show()};
  skip.onclick=()=>{fb(f,0,parts.join(" "));i++;show()};show();H.s.textContent="Упай: 0";countdown(90,x=>{H.t.textContent=x+" s";tb(x)},()=>result(card,"Убакыт бүттү!",score,"Рекорд: "+best(key,score),again))}},
/* 19 */{id:"bingo",icon:"🎯",name:"Бинго",desc:"Маанисин угуп, сөздү бас. Бир сызык толсо — БИНГО!",run(card,d,key,again){
  const pairs=pick(d.pairs.length>=9?d.pairs:d.allPairs,9);const grid=h("div","bingo"),clue=h("div","big"),f=h("div","fb");card.append(clue,grid,f);let calls=shuffle(pairs),ci=0,marked=new Set(),tries=0;
  const cells=shuffle(pairs).map(p=>{const c=h("button","bcell",p[0]);c.onclick=()=>{tries++;if(p[0]==calls[ci][0]){c.classList.add("done");marked.add(p[0]);fb(f,1,"Ооба!");if(win())return later(500,()=>result(card,"БИНГО! 🎉",tries+" басуу","",again));ci++;callNext()}else{c.classList.add("bad");later(400,()=>c.classList.remove("bad"))}};grid.append(c);return[c,p]});
  const lines=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];const win=()=>lines.some(l=>l.every(i=>marked.has(cells[i][1][0])));
  const callNext=()=>{clue.textContent="📢 "+calls[ci][1];say(calls[ci][1])};callNext()}},
/* 20 */{id:"penalty",icon:"⚽",name:"Пенальти",desc:"Беш пенальти. Гол киргизүү үчүн туура жооп бер!",run(card,d,key,again){
  const goal=h("div","goal"),ball=h("span","ball","⚽"),keeper=h("span","keeper","🧤");goal.append(keeper,ball);const H=head(card,["s"]);const box=h("div"),f=h("div","fb");card.append(goal,box,f);let shot=0,goals=0;const next=qDeck(d);
  const go=()=>{if(shot>=5)return result(card,goals>=3?"Сен уттуң! 🏆":"Бул жолу болбоду!",goals+" / 5","Рекорд: "+best(key,goals),again);ball.className="ball";keeper.className="keeper";const q=next();
    askQ(box,q,ok=>{shot++;const side=Math.random()<.5?"l":"r";ball.classList.add("shoot",side);keeper.classList.add(ok?(side=="l"?"r":"l"):side);if(ok){goals++;fb(f,1,"ГОЛ! ⚽")}else fb(f,0,"Кармап калды! "+fill(q));H.s.textContent="Голдор: "+goals+" / "+shot;later(1200,go)})};H.s.textContent="Голдор: 0 / 0";go()}},
/* 21 */{id:"basket",icon:"🏀",name:"Баскетбол",desc:"Туура жооп — топ себетке. Катары менен туура болсо 3 упай!",run(card,d,key,again){
  const court=h("div","court"),ball=h("span","bball","🏀"),hoop=h("span","hoop","🗑️");hoop.textContent="🥅";court.append(hoop,ball);const H=head(card,["s","t"]),tb=bar(card,50);const box=h("div"),f=h("div","fb");card.append(court,box,f);let pts=0,streak=0;const next=qDeck(d);
  const go=()=>{ball.className="bball";const q=next();askQ(box,q,ok=>{if(ok){streak++;const p=streak>=3?3:2;pts+=p;ball.classList.add("in");fb(f,1,"Так түштү! +"+p)}else{streak=0;ball.classList.add("miss");fb(f,0,fill(q))}H.s.textContent="Упай: "+pts;later(700,go)})};
  H.s.textContent="Упай: 0";go();countdown(50,x=>{H.t.textContent=x+" s";tb(x)},()=>result(card,"Оюн бүттү!",pts+" упай","Рекорд: "+best(key,pts),again))}},
/* 22 */{id:"rocket",icon:"🚀",name:"Ракета учуруу",desc:"Убакыт бүтө электе 10 туура жооп менен күйүүчү майды толтур.",run(card,d,key,again){
  const pad=h("div","pad"),tank=h("div","tank"),lvl=h("i"),rocket=h("span","rocket","🚀");tank.append(lvl);pad.append(tank,rocket);const H=head(card,["s","t"]),tb=bar(card,75);const box=h("div"),f=h("div","fb");card.append(pad,box,f);let fuel=0;const next=qDeck(d);let done=false;
  const go=()=>{if(done)return;const q=next();askQ(box,q,ok=>{if(ok){fuel++;fb(f,1,"Күйүүчү май +10%")}else fb(f,0,fill(q));lvl.style.height=fuel*10+"%";H.s.textContent="Май: "+fuel*10+"%";
    if(fuel>=10){done=true;stopGame();rocket.classList.add("lift");later(1600,()=>result(card,"Учуп кетти! 🚀","100%","Тапшырма аткарылды!",again))}else go()})};
  H.s.textContent="Май: 0%";go();countdown(75,x=>{H.t.textContent=x+" s";tb(x)},()=>{done=true;result(card,"Убакыт бүттү",fuel*10+"%","Рекорд: "+best(key,fuel*10)+"%",again)})}},
/* 23 */{id:"board",icon:"🎲",name:"Кубик оюну",desc:"Кубик ташта, жооп бер жана 20-уяга жет. Тайгалактан сак бол!",run(card,d,key,again){
  const N=20,ups={4:9,11:15},downs={13:6,18:10};const brd=h("div","brd");const cells=[];for(let i=1;i<=N;i++){const c=h("div","sq",String(i));if(ups[i])c.classList.add("up");if(downs[i])c.classList.add("down");cells.push(c);brd.append(c)}
  const tok=h("span","tok","🧑");const H=head(card,["s"]);const roll=h("button","act","🎲 Кубик ташта"),box=h("div"),f=h("div","fb");card.append(brd,roll,box,f);let pos=1,turns=0;const next=qDeck(d);const put=()=>{cells[pos-1].append(tok);H.s.textContent=pos+"-уя · Жүрүш: "+turns};put();
  roll.onclick=()=>{roll.disabled=true;const r=1+Math.random()*6|0;fb(f,1,"Кубик: "+r+". Жооп бер!");const q=next();askQ(box,q,ok=>{turns++;if(ok){pos=Math.min(N,pos+r);if(ups[pos]){fb(f,1,"Тепкич! Өйдө: "+ups[pos]);pos=ups[pos]}else if(downs[pos]){fb(f,0,"Тайгалак! Төмөн: "+downs[pos]);pos=downs[pos]}else fb(f,1,"Алга "+r+"!")}else fb(f,0,"Ордунда кал! "+fill(q));put();box.innerHTML="";roll.disabled=false;
    if(pos>=N)later(600,()=>result(card,"20-уяга жеттиң! 🎉",turns+" жүрүш","Рекорд: "+best(key,turns,true)+" жүрүш",again))})}}},
/* 24 */{id:"ttt",icon:"⭕",name:"Крестик-нолик",desc:"Эки команда. Уяны алуу үчүн туура жооп бер.",run(card,d,key,again){
  const g=h("div","ttt"),box=h("div"),f=h("div","fb"),who=h("div","big");card.append(who,g,box,f);let turn=0,cells=Array(9).fill(""),busy=false;const sym=["❌","⭕"];const next=qDeck(d);
  const lines=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];const upd=()=>who.textContent=sym[turn]+" командасы: уяны танда";upd();
  const bs=cells.map((_,i)=>{const b=h("button","tcell");b.onclick=()=>{if(busy||cells[i])return;busy=true;const q=next();askQ(box,q,ok=>{if(ok){cells[i]=sym[turn];b.textContent=sym[turn];fb(f,1,"Уя сеники!")}else fb(f,0,fill(q));
    const w=lines.find(l=>l.every(k=>cells[k]&&cells[k]==cells[l[0]]));later(700,()=>{busy=false;box.innerHTML="";if(w)return result(card,cells[w[0]]+" командасы утту!","🏆","",again);if(cells.every(Boolean))return result(card,"Тең чыкты!","🤝","",again);turn=1-turn;upd()})})};g.append(b);return b})}},
/* 25 */{id:"missing",icon:"🔡",name:"Жетишпеген тамгалар",desc:"Айрым тамгалар жок. Сөздү толук жаз.",run(card,d,key,again){
  const words=d.words.length>=5?d.words:[...new Set(d.allPics.map(p=>p[0]))];const deck=pick(words.filter(w=>w.length>=4),8);let i=0,score=0;const H=head(card,["s"]);
  const scr=h("div","scr"),inp=h("input"),ok=h("button","act","Текшерүү"),f=h("div","fb");inp.type="text";inp.id="miss";inp.autocomplete="off";inp.spellcheck=false;card.append(scr,inp,ok,f);
  const show=()=>{if(i>=deck.length)return result(card,"Бүттү!",score+" / "+deck.length,"Рекорд: "+best(key,score),again);const w=deck[i];scr.innerHTML="";[...w].forEach((c,k)=>scr.append(h("span",null,c==" "?" ":(k%2==1||Math.random()<.3?"_":c))));inp.value="";inp.focus()};
  const check=()=>{const w=deck[i];if(norm(inp.value)==norm(w)){score++;fb(f,1,"Туурасы: "+w)}else fb(f,0,"Туурасы: "+w);i++;H.s.textContent="Упай: "+score+" / "+deck.length;show()};ok.onclick=check;inp.onkeydown=e=>{if(e.key=="Enter")check()};H.s.textContent="Упай: 0";show()}},
/* 26 */{id:"flash",icon:"🗂️",name:"Карточкалар",desc:"Ойноордон мурун сөздөрдү үйрөнүү үчүн карточкаларды оодар.",run(card,d,key,again){
  const items=shuffle((d.pics||[]).map(p=>[p[1]+"  "+p[0],(d.pairs.find(x=>x[0]==p[0])||[,"(сүрөт)"])[1]]).concat(d.pairs.map(p=>[p[0],p[1]])));let i=0,front=true;
  const fc=h("button","flash"),nav=h("div","actions"),pv=h("button","act alt","‹ Мурунку"),nx=h("button","act","Кийинки ›"),sp=h("button","act alt","🔊"),cnt=h("div","hint");nav.append(pv,sp,nx);card.append(fc,nav,cnt);
  const show=()=>{const it=items[i];fc.textContent=front?it[0]:it[1];fc.classList.toggle("back",!front);cnt.textContent=(i+1)+" / "+items.length+" · картаны бассаң, оодарылат"};
  fc.onclick=()=>{front=!front;show()};nx.onclick=()=>{i=(i+1)%items.length;front=true;show()};pv.onclick=()=>{i=(i-1+items.length)%items.length;front=true;show()};sp.onclick=()=>say(items[i][0].replace(/^\S+\s+/,""));show()}}
];

function memory(card,pairs,key,again,pic){
  let cards=[];pairs.forEach((p,pi)=>{cards.push({v:p[0],p:pi});cards.push({v:p[1],p:pi,pic})});cards=shuffle(cards);let open=[],found=0,moves=0,lock=false;
  const H=head(card,["m","f"]);const grid=h("div","mgrid");card.append(grid);const upd=()=>{H.m.textContent="Жүрүш: "+moves;H.f.textContent="Жуптар: "+found+" / "+pairs.length};upd();
  cards.forEach(c=>{const b=h("button","mc"+(c.pic?" pic":""),c.v);b.setAttribute("aria-label","Жабык карта");c.el=b;
    b.onclick=()=>{if(lock||b.classList.contains("up")||b.classList.contains("done"))return;b.classList.add("up");b.setAttribute("aria-label",c.v);open.push(c);
      if(open.length==2){moves++;const[a,d]=open;if(a.p==d.p){a.el.classList.replace("up","done");d.el.classList.replace("up","done");open=[];found++;if(found==pairs.length)later(600,()=>result(card,"Бардык жуптар табылды!",moves+" жүрүш","Рекорд: "+best(key,moves,true)+" жүрүш",again))}
        else{lock=true;later(900,()=>{[a,d].forEach(x=>{x.el.classList.remove("up");x.el.setAttribute("aria-label","Жабык карта")});open=[];lock=false})}upd()}};grid.append(b)})}

/* ---------- menus ---------- */
window.gamesMenu=function(n){
  crumb.textContent=n+"-класс · Оюндар";app.innerHTML="";app.append(h("h2",null,"Оюндар · "+GAMES.length+" оюн"),h("p","lead","Оюнду, анан теманы (же бардык темаларды) тандагыла. Көпчүлүк оюндар интерактивдүү тактада бүт класс менен ойноого ылайык."));
  const g=h("div","gzone");GAMES.forEach(gm=>{const b=h("button","gz");b.append(h("span","gi",gm.icon),h("b",null,gm.name),h("span",null,gm.desc));b.onclick=()=>go(()=>pickUnit(n,gm));g.append(b)});app.append(g)};
function pickUnit(n,gm){
  crumb.textContent=n+"-класс · "+gm.name;app.innerHTML="";app.append(h("h2",null,gm.icon+" "+gm.name),h("p","lead",gm.desc+" Теманы тандагыла."));
  const u=h("div","units");const add=(label,sub,ui)=>{const r=h("div","unit"),box=h("div","unum",ui<0?"★":ui+1),info=h("div"),b=h("button","exb","Ойноо");box.style.setProperty("--c",GC[n]);b.style.setProperty("--c","var(--gram)");
    b.onclick=()=>go(()=>play(n,ui,gm));info.append(h("h3",null,label),h("p",null,sub),b);r.append(box,info);u.append(r)};
  add("Бардык темалар аралаш","Бүт жылдын суроолору",-1);G[n].units.forEach((un,ui)=>add(un.name,un.g.t.split(" · ")[0],ui));app.append(u)}
function play(n,ui,gm){
  const un=ui<0?null:G[n].units[ui];crumb.textContent=n+"-класс · "+gm.name+(un?" · "+un.n+"-тема":" · Бардык темалар");app.innerHTML="";
  app.append(h("h2",null,gm.icon+" "+gm.name));const card=h("div","card game");app.append(card);const d=D(n,ui);const key="ky78-"+gm.id+"-"+n+"-"+ui;
  const again=()=>{stopGame();card.innerHTML="";gm.run(card,d,key,again)};gm.run(card,d,key,again)}
window.GAMES_COUNT=GAMES.length;
})();
