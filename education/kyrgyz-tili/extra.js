/* Кошумча мүмкүнчүлүктөр: жаңы тапшырма түрлөрү, бирден жооп, медалдар, командалык мелдеш, чоң тест, сөздүк, мугалимдин куралдары */
(function(){
const LS={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
let XT=[];const _stop=window.stopGame;window.stopGame=function(){XT.forEach(t=>{clearInterval(t);clearTimeout(t)});XT=[];if(_stop)_stop()};
const every=(ms,f)=>{const t=setInterval(f,ms);XT.push(t);return t},later=(ms,f)=>{const t=setTimeout(f,ms);XT.push(t);return t};

/* ---------- speech ---------- */
function speak(w){try{const s=speechSynthesis,vs=s.getVoices(),u=new SpeechSynthesisUtterance(w);
  const v=vs.find(v=>/^ky/i.test(v.lang))||vs.find(v=>/^kk/i.test(v.lang))||vs.find(v=>/^ru/i.test(v.lang));
  if(v){u.voice=v;u.lang=v.lang}else u.lang="ky-KG";u.rate=.8;s.cancel();s.speak(u)}catch(e){}}
window.speakKy=speak;
const hasSpeech=()=>{try{return "speechSynthesis" in window}catch(e){return false}};

/* ---------- attach new exercises ---------- */
[7,8].forEach(n=>G[n].units.forEach((u,ui)=>{const add=(window.X&&X[n]&&X[n][ui])||[];if(!u.w)u.w={t:"Кошумча көнүгүүлөр",ex:[]};
  u.w.ex.push(...add);
  if(!add.some(e=>e.type=="listen")&&u.v&&u.v.m&&u.v.m.length>=3){const ws=u.v.m.map(p=>p[0]);
    u.w.ex.push({tp:"Сөздөрдү угуу",type:"listen",instr:"🔊 баскычын басып, угулган сөздү тандагыла.",qs:ws.map(w=>"["+[w+"*"].concat(shuffle(ws.filter(x=>x!=w)).slice(0,2)).join("|")+"]")})}}));

/* ---------- new exercise types ---------- */
const ROLE={э:["ээ","r-e"],б:["баяндооч","r-b"],а:["аныктооч","r-a"],т:["толуктооч","r-t"],ы:["бышыктооч","r-y"]};
const firstBad=(rows,ok)=>rows.find(r=>!ok(r));
Object.assign(BUILD,{
 parse(ex,body){const roles=ex.roles||["э","б"],seq=[""].concat(roles),list=h("div","qlist"),rows=[];
  const lg=h("div","plegend");roles.forEach(r=>{const s=h("span","pw "+ROLE[r][1],ROLE[r][0]);lg.append(s)});body.append(lg);
  const setR=(w,r)=>{w.dataset.v=r;w.className="pw"+(r?" "+ROLE[r][1]:"");w.title=r?ROLE[r][0]:""};
  ex.qs.forEach(q=>{const row=h("div","q"),t=h("div","t ptxt"),toks=[];
    q.split(" ").forEach(tok=>{const m=tok.match(/^(.*?)(?:\/([эбаты]))?([.,!?:;]*)$/);const word=m[1],role=m[2]||"",pn=m[3];
      if(!/\p{L}/u.test(word)){t.append(word+pn," ");return}
      const w=h("span","pw",word);w.dataset.a=role;w.dataset.v="";w.tabIndex=0;w.setAttribute("role","button");
      w.onclick=()=>{setR(w,seq[(seq.indexOf(w.dataset.v)+1)%seq.length]);t.classList.remove("ok","bad")};
      w.onkeydown=e=>{if(e.key=="Enter"||e.key==" "){e.preventDefault();w.onclick()}};
      toks.push(w);t.append(w,pn," ")});
    rows.push({t,toks});row.append(t);list.append(row)});
  body.append(list);const ok=r=>r.toks.every(w=>w.dataset.v==w.dataset.a);
  const solve=r=>{r.toks.forEach(w=>setR(w,w.dataset.a));mark(r.t,true)};
  return{check(){let c=0;rows.forEach(r=>c+=mark(r.t,ok(r)));return[c,rows.length]},show(){rows.forEach(solve)},step(){const r=firstBad(rows,ok);if(r)solve(r)}}},
 fix(ex,body){const list=h("div","qlist"),rows=[];
  ex.qs.forEach(q=>{const row=h("div","q"),t=h("div","t ftxt"),r={t,ws:[],err:null};
    (q.match(/\{[^}]*\}\S*|\S+/g)||[]).forEach(tok=>{let word=tok,rest="",right=null;const m=tok.match(/^\{([^>]*)>([^}]*)\}(.*)$/);if(m){word=m[1];right=m[2];rest=m[3]}
      const w=h("span","fw",word);w.tabIndex=0;w.setAttribute("role","button");if(right!=null){w.dataset.r=right;r.err=w}
      w.onclick=()=>{const on=!w.classList.contains("pick");r.ws.forEach(x=>x.classList.remove("pick"));if(on)w.classList.add("pick");t.classList.remove("ok","bad")};
      w.onkeydown=e=>{if(e.key=="Enter"||e.key==" "){e.preventDefault();w.onclick()}};
      r.ws.push(w);t.append(w,rest," ")});
    const fx=h("div","fixnote");fx.hidden=true;r.fx=fx;t.append(fx);rows.push(r);row.append(t);list.append(row)});
  body.append(list);const ok=r=>r.err&&r.err.classList.contains("pick")&&r.ws.filter(x=>x.classList.contains("pick")).length==1;
  const reveal=r=>{r.fx.textContent="✔ Туурасы: "+r.err.dataset.r;r.fx.hidden=false};
  const solve=r=>{r.ws.forEach(x=>x.classList.remove("pick"));r.err.classList.add("pick");reveal(r);mark(r.t,true)};
  return{check(){let c=0;rows.forEach(r=>{const g=ok(r);c+=mark(r.t,g);if(g)reveal(r);else r.fx.hidden=true});return[c,rows.length]},show(){rows.forEach(solve)},step(){const r=firstBad(rows,r=>ok(r)&&!r.fx.hidden);if(r)solve(r)}}},
 punct(ex,body){const marks=[""].concat(ex.marks||[",","—",".","!","?"]),list=h("div","qlist"),rows=[];
  ex.qs.forEach(q=>{const row=h("div","q"),t=h("div","t ptxt"),words=[],ans=[];
    (q.match(/\[[^\]]+\]|[^\s\[]+/g)||[]).forEach(tok=>{if(tok[0]=="["){ans[ans.length-1]=tok.slice(1,-1)}else{words.push(tok);ans.push("")}});
    const slots=[];words.forEach((w,i)=>{t.append(h("span","pword",w));const s=h("button","pm","");s.dataset.a=ans[i];s.dataset.v="";s.setAttribute("aria-label","тыныш белгиси");
      s.onclick=()=>{const k=(marks.indexOf(s.dataset.v)+1)%marks.length;s.dataset.v=marks[k];s.textContent=marks[k];s.classList.toggle("on",!!marks[k]);t.classList.remove("ok","bad")};slots.push(s);t.append(s)});
    rows.push({t,slots});row.append(t);list.append(row)});
  body.append(list);const ok=r=>r.slots.every(s=>s.dataset.v==s.dataset.a);
  const solve=r=>{r.slots.forEach(s=>{s.dataset.v=s.dataset.a;s.textContent=s.dataset.a;s.classList.toggle("on",!!s.dataset.a)});mark(r.t,true)};
  return{check(){let c=0;rows.forEach(r=>c+=mark(r.t,ok(r)));return[c,rows.length]},show(){rows.forEach(solve)},step(){const r=firstBad(rows,ok);if(r)solve(r)}}},
 listen(ex,body){const api=BUILD.choose({qs:ex.qs,nomist:true},body);
  body.querySelectorAll(".qlist > .q").forEach((row,i)=>{const a=parseBr(ex.qs[i]).a,b=h("button","say","🔊");b.setAttribute("aria-label","Угуу");b.onclick=()=>speak(a);row.querySelector(".t").prepend(b)});
  if(!hasSpeech())body.prepend(h("p","hint","Бул браузерде үн чыгаруу мүмкүн эмес. Мугалим сөздү үнүн чыгарып окуп берсин."));
  else body.append(h("p","hint","Эгер үн чыкпаса же туура эмес окулса, компьютерде кыргыз же орус үнү орнотулбаган болушу мүмкүн. Анда мугалим сөздү өзү окуп берсин."));
  return api},
 write(ex,body){const key="kgw-"+ex.task.slice(0,40);body.append(h("p","wtask",ex.task));
  const pl=h("div","wplan"),boxes=[];pl.append(h("b",null,"План жана өзүн-өзү текшерүү:"));
  ex.plan.forEach(p=>{const l=h("label"),c=h("input");c.type="checkbox";boxes.push(c);l.append(c," "+p);pl.append(l)});
  const ta=h("textarea","wta");ta.rows=9;ta.placeholder="Текстиңерди ушул жерге жазгыла…";ta.value=LS.get(key,"");
  const cnt=h("div","wcnt"),upd=()=>{const n=(ta.value.match(/\p{L}+/gu)||[]).length;cnt.textContent="Сөз саны: "+n+" (кеминде "+(ex.min||50)+")";return n};
  ta.oninput=()=>{LS.set(key,ta.value);upd();ta.classList.remove("ok","bad")};upd();
  const md=h("div","wmodel");md.hidden=true;md.append(h("b",null,"Үлгү текст:"),h("p",null,ex.model));
  const bar=h("div","wbar"),bm=h("button","seg","Үлгүнү көрүү"),bp=h("button","seg","Басып чыгаруу"),bx=h("button","seg","Тазалоо");
  bm.onclick=()=>{md.hidden=!md.hidden;bm.textContent=md.hidden?"Үлгүнү көрүү":"Үлгүнү жашыруу"};
  bp.onclick=()=>{document.body.classList.add("printw");const pr=h("div","printbox");pr.append(h("h3",null,ex.tp||"Жазуу иши"),h("p",null,ex.task),h("pre",null,ta.value||"\n\n\n\n\n\n\n\n"));document.body.append(pr);window.print();later(500,()=>{pr.remove();document.body.classList.remove("printw")})};
  bx.onclick=()=>{ta.value="";LS.set(key,"");upd()};
  bar.append(bm,bp,bx);body.append(pl,ta,cnt,bar,md);
  return{check(){const n=upd();const c=boxes.filter(b=>b.checked).length+(n>=(ex.min||50)?1:0);mark(ta,n>=(ex.min||50));return[c,boxes.length+1]},
   show(){boxes.forEach(b=>b.checked=true);if(!ta.value.trim())ta.value=ex.model;md.hidden=false;upd();mark(ta,true)},
   step(){const b=boxes.find(b=>!b.checked);if(b)b.checked=true;else{md.hidden=false}}}}
});

/* ---------- one answer at a time (teacher) ---------- */
window.stepOne=function(body,ex){
  if(cur&&cur.step){cur.step();return}
  const t=ex.type;
  if(t=="gap"){const bank=body.querySelector(".bank"),slots=[...body.querySelectorAll(".slot")];
    const s=slots.find(s=>{const c=s.querySelector(".chip");return!c||c.dataset.v!=s.dataset.a});if(!s)return;
    const old=s.querySelector(".chip");if(old)bank.append(old);
    const ch=[...body.querySelectorAll(".chip")].find(x=>{const p=x.closest(".slot");return x.dataset.v==s.dataset.a&&!(p&&p.dataset.a==x.dataset.v)});
    if(ch)s.append(ch);mark(s,true);clearSel();return}
  if(t=="sort"){const bank=body.querySelector(".bank"),slots=[...body.querySelectorAll(".slot")];
    for(const w of Object.keys(ex.items)){const cat=ex.items[w],ch=[...body.querySelectorAll(".chip")].find(x=>x.dataset.v==w),ps=ch.closest(".slot");
      if(ps&&ps.dataset.cat==cat)continue;
      let tg=slots.find(s=>s.dataset.cat==cat&&!s.querySelector(".chip"));
      if(!tg){tg=slots.find(s=>s.dataset.cat==cat&&ex.items[s.querySelector(".chip").dataset.v]!=cat);bank.append(tg.querySelector(".chip"))}
      tg.append(ch);mark(tg,true);clearSel();return}return}
  const rows=[...body.querySelectorAll(".qlist > .q")];const j=rows.findIndex(r=>!r.dataset.rev);if(j<0)return;const row=rows[j];row.dataset.rev=1;
  if(t=="choose"||t=="listen"){const a=parseBr(ex.qs[j]).a,b=[...row.querySelectorAll(".opt")].find(b=>b.textContent==a);if(b){b.click();mark(b,true)}}
  else if(t=="drop"){const s=row.querySelector("select");s.value=parseBr(ex.qs[j]).a;mark(s,true)}
  else if(t=="match"){const s=row.querySelector("select");s.value=ex.pairs[j][1];mark(s,true)}
  else if(t=="rewrite"){const i=row.querySelector("input");i.value=ex.qs[j][1][0];mark(i,true)}
  else if(t=="order"){const q=ex.qs[j],parts=q.includes("|")?q.split("|"):q.split(" "),line=row.querySelector(".oline"),all=[...row.querySelectorAll(".chip")];
    parts.forEach(w=>{const i=all.findIndex(x=>x.textContent==w);if(i>-1)line.append(all.splice(i,1)[0])});mark(line,true)}};

/* ---------- stars & medals ---------- */
const stars=()=>LS.get("kg-stars",{});
window.isDone=k=>!!stars()[k];
function toast(msg){document.querySelectorAll(".toast").forEach(t=>t.remove());const t=h("div","toast",msg);document.body.append(t);setTimeout(()=>t.remove(),2600)}
window.onScore=function(c,t){if(!window.CURKEY||!t)return;const k=window.CURKEY,s=stars();
  const pass=k.startsWith("t-")?c>=Math.ceil(t*.8):c==t;if(pass&&!s[k]){s[k]=1;LS.set("kg-stars",s);toast(k.startsWith("t-")?"🏅 Тест тапшырылды! Медалга бир кадам жакындадыңар.":"⭐ Жылдыз алдыңар!")}
  else if(pass)toast("👏 Баракелде!")};
function unitKeys(n,ui){const u=G[n].units[ui],ks=[];["g","v","w"].forEach(k=>u[k]&&u[k].ex.forEach((e,i)=>ks.push([n,k,ui,i].join("-"))));return ks}
function medalsView(n){
  crumb.textContent=n+"-класс · Медалдар";app.innerHTML="";const s=stars();
  app.append(h("h2",null,"Менин жылдыздарым жана медалдарым"),h("p","lead","Көнүгүүнү толук туура аткарсаңар — ⭐ жылдыз. Теманын тестинен 80% жана андан көп алсаңар — 🏅. Теманын бардык көнүгүүлөрү жана тести бүтсө — 🥇 алтын медаль. Жыйынтыктар ушул компьютерде гана сакталат."));
  let tot=0,got=0;const u=h("div","medals");
  G[n].units.forEach((un,ui)=>{const ks=unitKeys(n,ui),d=ks.filter(k=>s[k]).length,tp=!!s["t-"+n+"-"+ui];tot+=ks.length+1;got+=d+(tp?1:0);
    const frac=(d+(tp?1:0))/(ks.length+1),medal=frac>=1?"🥇":frac>=.66?"🥈":frac>=.33?"🥉":"⚪";
    const c=h("div","mcard"),bar=h("div","mbar"),f=h("i");f.style.width=Math.round(frac*100)+"%";bar.append(f);
    c.append(h("div","mmed",medal),h("b",null,un.n+". "+un.name),h("span",null,"⭐ "+d+" / "+ks.length+(tp?"  ·  🏅 тест":"")),bar);u.append(c)});
  const all=h("div","mtotal");all.append(h("b",null,"Жалпы: "+got+" / "+tot),h("span",null,got==tot?" 🏆 Сиз — чыныгы чебер!":""));
  const rs=h("button","act alt","Жылдыздарды өчүрүү");rs.onclick=()=>{if(rs.dataset.c){const s2=stars();Object.keys(s2).forEach(k=>{if(k.startsWith(n+"-")||k.startsWith("t-"+n+"-"))delete s2[k]});LS.set("kg-stars",s2);replace(()=>medalsView(n))}else{rs.dataset.c=1;rs.textContent="Ырастоо үчүн дагы бир жолу басыңыз"}};
  app.append(all,u,h("p"),rs)}

/* ---------- team contest ---------- */
const TCOL=["#d9682f","#2b7fa8","#2f8f6b","#9b3f8f"];
function teamSetup(n){
  crumb.textContent=n+"-класс · Командалык мелдеш";app.innerHTML="";
  app.append(h("h2",null,"🏆 Командалык мелдеш"),h("p","lead","Класс 2–4 командага бөлүнөт. Суроолор командаларга кезек менен берилет. Туура жооп — 1 упай."));
  const card=h("div","card setup");let nt=2;
  const nb=h("div","segs");[2,3,4].forEach(k=>{const b=h("button","seg"+(k==nt?" on":""),k+" команда");b.onclick=()=>{nt=k;nb.querySelectorAll(".seg").forEach(x=>x.classList.toggle("on",x==b));drawNames()};nb.append(b)});
  const names=h("div","tnames");const saved=LS.get("kg-teams",["Шумкарлар","Барстар","Тулпарлар","Бүркүттөр"]);
  const drawNames=()=>{names.innerHTML="";for(let i=0;i<nt;i++){const l=h("label","tname"),inp=h("input");inp.type="text";inp.value=saved[i]||((i+1)+"-команда");inp.style.borderColor=TCOL[i];inp.oninput=()=>{saved[i]=inp.value;LS.set("kg-teams",saved)};l.append(h("i",null,""),inp);l.firstChild.style.background=TCOL[i];names.append(l)}};drawNames();
  const us=h("select");us.append(new Option("Бардык темалар аралаш","-1"));G[n].units.forEach((u,i)=>us.append(new Option(u.n+". "+u.name,i)));
  const qn=h("select");[3,5,8,10].forEach(k=>qn.append(new Option("Ар бир командага "+k+" суроо",k)));qn.value=5;
  const go1=h("button","act","Мелдешти баштоо ▸");
  go1.onclick=()=>{const tm=[...names.querySelectorAll("input")].map((x,i)=>({name:x.value.trim()||((i+1)+"-команда"),c:TCOL[i],s:0}));go(()=>teamPlay(n,+us.value,+qn.value,tm))};
  card.append(h("b",null,"Командалардын саны"),nb,h("b",null,"Командалардын аттары"),names,h("b",null,"Тема"),us,h("b",null,"Суроолордун саны"),qn,h("div","wbar",""),go1);app.append(card)}
function teamPlay(n,ui,per,teams){
  crumb.textContent=n+"-класс · Командалык мелдеш";app.innerHTML="";
  const units=ui<0?G[n].units:[G[n].units[ui]];let pool=[];units.forEach(u=>pool.push(...poolUnit(u)));pool=shuffle(pool);
  const total=per*teams.length;while(pool.length<total)pool=pool.concat(shuffle(pool));
  let k=0;const board=h("div","tboard"),card=h("div","card tq");app.append(board,card);
  const drawBoard=()=>{board.innerHTML="";teams.forEach((t,i)=>{const d=h("div","team"+(i==k%teams.length&&k<total?" now":""));d.style.setProperty("--c",t.c);d.append(h("span",null,t.name),h("b",null,t.s));board.append(d)})};
  const next=()=>{drawBoard();card.innerHTML="";if(k>=total){final();return}
    const t=teams[k%teams.length],q=pool[k];
    const hd=h("div","tqh");hd.append(h("span","tturn",t.name+" жооп берет"),h("span",null,"Суроо "+(k+1)+" / "+total));hd.firstChild.style.background=t.c;
    const qt=h("div","tqt",q.t.replace("___"," ______ ")),ops=h("div","tops"),fbk=h("div","fb");
    shuffle(q.o).forEach(o=>{const b=h("button","topt",o);b.onclick=()=>{if(ops.dataset.done)return;ops.dataset.done=1;
      const good=o==q.a;b.classList.add(good?"ok":"bad");if(good){t.s++;fbk.className="fb y";fbk.textContent="Туура! +1 упай"}else{fbk.className="fb n";fbk.textContent="Туура жооп: "+q.a;[...ops.children].find(x=>x.textContent==q.a).classList.add("ok")}
      drawBoard();const nx=h("button","act","Кийинки ▸");nx.onclick=()=>{k++;next()};card.append(nx);nx.focus()};ops.append(b)});
    const skip=h("button","act alt","Өткөрүп жиберүү");skip.onclick=()=>{k++;next()};
    card.append(hd,qt,ops,fbk);card.append(skip)};
  const final=()=>{const srt=[...teams].sort((a,b)=>b.s-a.s),top=srt[0].s,win=srt.filter(t=>t.s==top);
    const r=h("div","result");r.append(h("div","n","🏆"),h("b",null,win.length>1?"Тең чыгышты: "+win.map(t=>t.name).join(", "):"Жеңүүчү: "+win[0].name),h("div",null,"Упай: "+top));
    const ol=h("ol","tfinal");srt.forEach(t=>{const li=h("li",null,t.name+" — "+t.s+" упай");li.style.color=t.c;ol.append(li)});
    const ag=h("button","act","Кайра ойноо");ag.onclick=()=>replace(()=>teamPlay(n,ui,per,teams.map(t=>({...t,s:0}))));
    card.append(r,ol,ag)};
  next()}

/* ---------- big test with name and grade ---------- */
const QUART={7:[["I чейрек",[0,1]],["II чейрек",[2,3]],["III чейрек",[4,5]],["IV чейрек",[6,7]]]};
function bigSetup(n){
  crumb.textContent=n+"-класс · Чоң тест";app.innerHTML="";
  app.append(h("h2",null,"📝 Чейрек / жылдык тест"),h("p","lead","Окуучу атын жазып, темаларды тандап, тестти иштейт. Аягында упай, пайыз жана баа (2–5) чыгат. Жыйынтыкты басып чыгарууга же PDF кылып сактоого болот."));
  const card=h("div","card setup"),nm=h("input");nm.type="text";nm.placeholder="Окуучунун аты-жөнү";nm.value=LS.get("kg-lastname","");
  const ul=h("div","uchk"),cbs=[];G[n].units.forEach((u,i)=>{const l=h("label"),c=h("input");c.type="checkbox";c.checked=true;cbs.push(c);l.append(c," "+u.n+". "+u.name);ul.append(l)});
  const qk=h("div","segs");const all=h("button","seg","Бардыгы");all.onclick=()=>cbs.forEach(c=>c.checked=true);qk.append(all);
  (QUART[n]||[]).forEach(([lab,ix])=>{const b=h("button","seg",lab);b.onclick=()=>cbs.forEach((c,i)=>c.checked=ix.includes(i));qk.append(b)});
  const qn=h("select");[10,15,20,25,30].forEach(k=>qn.append(new Option(k+" суроо",k)));qn.value=20;
  const st=h("button","act","Тестти баштоо ▸"),msg=h("p","hint","");
  st.onclick=()=>{const ix=cbs.map((c,i)=>c.checked?i:-1).filter(i=>i>=0);if(!ix.length){msg.textContent="Жок дегенде бир теманы тандагыла.";return}LS.set("kg-lastname",nm.value.trim());go(()=>bigRun(n,ix,+qn.value,nm.value.trim()))};
  const hist=h("button","act alt","Мурунку жыйынтыктар");hist.onclick=()=>go(()=>resultsView(n));
  card.append(h("b",null,"Окуучунун аты-жөнү"),nm,h("b",null,"Темалар"),qk,ul,h("b",null,"Суроолордун саны"),qn,msg,h("div","wbar",""),st,hist);app.append(card)}
const gradeOf=p=>p>=85?5:p>=70?4:p>=50?3:2;
function bigRun(n,ix,cnt,name){
  crumb.textContent=n+"-класс · Чоң тест";app.innerHTML="";window.CURKEY=null;
  let pool=[];ix.forEach(i=>pool.push(...poolUnit(G[n].units[i])));const seen=new Set();pool=shuffle(pool).filter(q=>!seen.has(q.t)&&seen.add(q.t)).slice(0,cnt);
  const qs=pool.map(q=>q.t.replace("___","["+q.o.map(o=>o==q.a?o+"*":o).join("|")+"]"));
  app.append(h("h2",null,"Тест"+(name?" · "+name:"")));
  const card=h("div","card");card.append(h("p","instr","Туура жоопту тандагыла. Бардык суроолорго жооп бергенден кийин «Аяктоо» баскычын баскыла."));const body=h("div");card.append(body);
  const api=BUILD.choose({qs},body);const fin=h("button","act","Аяктоо жана баалоо ✓");
  fin.onclick=()=>{const[c,t]=api.check();const p=Math.round(c/t*100),g=gradeOf(p),topics=ix.map(i=>G[n].units[i].name);
    const rec={name:name||"—",n,date:new Date().toLocaleString("ru-RU"),c,t,p,g,topics};const hs=LS.get("kg-results",[]);hs.unshift(rec);LS.set("kg-results",hs.slice(0,200));
    go(()=>cert(rec))};
  card.append(h("div","actions",""),fin);app.append(card)}
function cert(r){
  crumb.textContent=r.n+"-класс · Тесттин жыйынтыгы";app.innerHTML="";
  const c=h("div","cert"),gc={5:"var(--ok)",4:"var(--wb)",3:"var(--gram)",2:"var(--bad)"}[r.g];
  c.append(h("div","cttl","Кыргыз тили · "+r.n+"-класс · Тесттин жыйынтыгы"),h("div","cname",r.name),
    h("div","cgrade",String(r.g)),h("div","cline","Туура жооптор: "+r.c+" / "+r.t+"  ·  "+r.p+"%"),
    h("div","cline small","Темалар: "+r.topics.join(", ")),h("div","cline small","Күнү: "+r.date));
  c.querySelector(".cgrade").style.background=gc;
  const bar=h("div","wbar noprint"),pr=h("button","act","Басып чыгаруу / PDF"),ag=h("button","act alt","Жаңы тест");pr.onclick=()=>window.print();ag.onclick=()=>{stack.pop();stack.pop();const f=stack.pop();f?go(f):home()};
  bar.append(pr,ag);app.append(c,bar,h("p","hint noprint","Кеңеш: «Басып чыгаруу» терезесинде «PDF катары сактоо» тандасаңар, жыйынтык файл болуп сакталат жана мугалимге жөнөтсө болот."))}
function resultsView(n){
  crumb.textContent=n+"-класс · Жыйынтыктар";app.innerHTML="";const hs=LS.get("kg-results",[]).filter(r=>r.n==n);
  app.append(h("h2",null,"Мурунку жыйынтыктар"),h("p","lead","Ушул компьютерде иштелген тесттердин тизмеси."));
  if(!hs.length){app.append(h("p",null,"Азырынча жыйынтык жок."));return}
  const tb=h("table","rtab"),hd=h("tr");["Аты-жөнү","Күнү","Упай","%","Баа"].forEach(x=>hd.append(h("th",null,x)));tb.append(hd);
  hs.forEach(r=>{const tr=h("tr");[r.name,r.date,r.c+"/"+r.t,r.p,r.g].forEach(x=>tr.append(h("td",null,String(x))));tb.append(tr)});
  const pr=h("button","act","Басып чыгаруу"),cl=h("button","act alt","Тизмени тазалоо");pr.onclick=()=>window.print();
  cl.onclick=()=>{if(cl.dataset.c){LS.set("kg-results",LS.get("kg-results",[]).filter(r=>r.n!=n));replace(()=>resultsView(n))}else{cl.dataset.c=1;cl.textContent="Ырастоо үчүн дагы бир жолу басыңыз"}};
  const bar=h("div","wbar noprint");bar.append(pr,cl);app.append(tb,bar)}

/* ---------- dictionary ---------- */
function dictView(n){
  crumb.textContent=n+"-класс · Сөздүк";app.innerHTML="";
  app.append(h("h2",null,"📖 Сөздүк"),h("p","lead","Ар бир теманын сөздөрү жана алардын мааниси. Издөө талаасына сөз жазгыла. 🔊 — угуу."));
  const q=h("input");q.type="text";q.placeholder="Сөз издөө…";q.className="dsearch";const us=h("select");us.append(new Option("Бардык темалар","-1"));G[n].units.forEach((u,i)=>us.append(new Option(u.n+". "+u.name,i)));
  const top=h("div","dtop");top.append(q,us);const box=h("div","dict");app.append(top,box);
  const entries=[];G[n].units.forEach((u,ui)=>{const pics=Object.fromEntries(u.pic||[]);const seen=new Set();
    (u.v&&u.v.m||[]).forEach(([w,d])=>{seen.add(w);entries.push({w,d,e:pics[w]||"",ui})});(u.pic||[]).forEach(([w,e])=>{if(!seen.has(w))entries.push({w,d:"",e,ui})})});
  const draw=()=>{box.innerHTML="";const s=q.value.trim().toLowerCase(),uf=+us.value;let shown=0;
    G[n].units.forEach((u,ui)=>{if(uf>=0&&uf!=ui)return;const es=entries.filter(x=>x.ui==ui&&(!s||x.w.toLowerCase().includes(s)||x.d.toLowerCase().includes(s)));if(!es.length)return;
      box.append(h("h3","dh",u.n+". "+u.name));const g=h("div","dgrid");
      es.forEach(x=>{const c=h("div","dcard");if(x.e)c.append(h("span","de",x.e));const tx=h("div");tx.append(h("b",null,x.w),h("span",null,x.d||""));const b=h("button","say","🔊");b.setAttribute("aria-label","Угуу: "+x.w);b.onclick=()=>speak(x.w);c.append(tx,b);g.append(c);shown++});box.append(g)});
    if(!shown)box.append(h("p",null,"Эч нерсе табылган жок."))};
  q.oninput=draw;us.onchange=draw;draw()}

/* ---------- teacher tools ---------- */
function toolsMenu(n){
  crumb.textContent=n+"-класс · Мугалимдин куралдары";app.innerHTML="";app.append(h("h2",null,"🧰 Мугалимдин куралдары"));
  const r=h("div","res");[["⏱ Таймер","Көнүгүүгө убакыт берүү, чоң сандар менен","var(--wb)",()=>timerView()],
    ["🎲 Ким жооп берет?","Класстын тизмесинен кокус окуучу тандоо","var(--gram)",()=>pickerView()],
    ["🌟 Күндүн сөзү","Сабактын башында бир жаңы сөз жана анын мааниси","var(--voc)",()=>wordDay(n)]].forEach(([t,d,c,fn])=>{const b=h("button","rb");b.style.setProperty("--c",c);b.append(h("b",null,t),h("span",null,d));b.onclick=()=>go(fn);r.append(b)});
  app.append(r)}
function beep(){try{const A=new (window.AudioContext||window.webkitAudioContext)();[0,.35,.7].forEach(t=>{const o=A.createOscillator(),g=A.createGain();o.frequency.value=880;o.connect(g);g.connect(A.destination);g.gain.setValueAtTime(.25,A.currentTime+t);g.gain.exponentialRampToValueAtTime(.001,A.currentTime+t+.3);o.start(A.currentTime+t);o.stop(A.currentTime+t+.3)})}catch(e){}}
function timerView(){
  crumb.textContent="Таймер";app.innerHTML="";app.append(h("h2",null,"⏱ Таймер"));
  let total=180,left=180,tid=null;const card=h("div","card tmr"),disp=h("div","tdisp"),pre=h("div","segs");
  const fmt=s=>String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");
  const draw=()=>{disp.textContent=fmt(left);disp.classList.toggle("end",left==0);disp.classList.toggle("warn",left>0&&left<=10)};
  const set=s=>{stop();total=left=s;draw()};
  const stop=()=>{if(tid){clearInterval(tid);tid=null}bs.textContent="▶ Баштоо"};
  [1,2,3,5,10,15].forEach(m=>{const b=h("button","seg",m+" мүн");b.onclick=()=>set(m*60);pre.append(b)});
  const cu=h("input");cu.type="number";cu.min=1;cu.max=90;cu.placeholder="мүн";cu.className="tcustom";cu.onchange=()=>{const v=+cu.value;if(v>0)set(Math.round(v*60))};pre.append(cu);
  const bar=h("div","wbar"),bs=h("button","act","▶ Баштоо"),br=h("button","act alt","↺ Кайра");
  bs.onclick=()=>{if(tid){stop();return}if(left==0)left=total;bs.textContent="⏸ Тыным";tid=every(1000,()=>{left--;draw();if(left<=0){left=0;stop();draw();beep()}})};
  br.onclick=()=>set(total);bar.append(bs,br);card.append(pre,disp,bar);app.append(card);draw()}
function pickerView(){
  crumb.textContent="Ким жооп берет?";app.innerHTML="";app.append(h("h2",null,"🎲 Ким жооп берет?"),h("p","lead","Окуучулардын аттарын ар бирин жаңы саптан жазгыла. Тизме ушул компьютерде сакталып калат."));
  const card=h("div","card pick"),ta=h("textarea","wta");ta.rows=7;ta.placeholder="Айбек\nАйгерим\nНурсултан\n…";ta.value=LS.get("kg-names","");
  const disp=h("div","pdisp","?"),nr=h("label"),cb=h("input");cb.type="checkbox";cb.checked=true;nr.append(cb," Кайталанбасын (тандалгандар кайра чыкпайт)");
  let used=new Set();const done=h("div","pused");
  const names=()=>ta.value.split(/\n|,/).map(s=>s.trim()).filter(Boolean);ta.oninput=()=>{LS.set("kg-names",ta.value);used=new Set();done.textContent=""};
  const bp=h("button","act","🎲 Тандоо"),bz=h("button","act alt","Баштан");
  bp.onclick=()=>{let ns=names();if(!ns.length){disp.textContent="Тизмени толтургула";return}let free=cb.checked?ns.filter(x=>!used.has(x)):ns;if(!free.length){used=new Set();free=ns}
    bp.disabled=true;let k=0;const fin=free[Math.random()*free.length|0];const t=every(70,()=>{disp.textContent=ns[Math.random()*ns.length|0];if(++k>22){clearInterval(t);disp.textContent=fin;disp.classList.remove("pop");void disp.offsetWidth;disp.classList.add("pop");used.add(fin);done.textContent="Тандалгандар: "+[...used].join(", ");bp.disabled=false}})};
  bz.onclick=()=>{used=new Set();done.textContent="";disp.textContent="?"};
  const bar=h("div","wbar");bar.append(bp,bz);card.append(disp,bar,done,h("b",null,"Класстын тизмеси"),ta,nr);app.append(card)}
function wordDay(n){
  crumb.textContent=n+"-класс · Күндүн сөзү";app.innerHTML="";
  const all=[];G[n].units.forEach(u=>{const pics=Object.fromEntries(u.pic||[]);(u.v&&u.v.m||[]).forEach(([w,d])=>all.push({w,d,e:pics[w]||"",u:u.name}))});
  let i=Math.floor(Date.now()/864e5)%all.length;
  app.append(h("h2",null,"🌟 Күндүн сөзү"));const card=h("div","card wday");app.append(card);
  const draw=()=>{const x=all[i];card.innerHTML="";const md=h("div","wdmean",x.d);md.hidden=true;
    const sb=h("button","act alt","Маанисин көрсөтүү"),nx=h("button","act alt","Башка сөз ↻"),sp=h("button","act alt","🔊 Угуу");
    sb.onclick=()=>{md.hidden=!md.hidden;sb.textContent=md.hidden?"Маанисин көрсөтүү":"Маанисин жашыруу"};nx.onclick=()=>{i=(i+1+Math.random()*(all.length-1)|0)%all.length;draw()};sp.onclick=()=>speak(x.w);
    const bar=h("div","wbar");bar.append(sb,sp,nx);
    card.append(h("div","wdtopic","Тема: "+x.u),x.e?h("div","wdemoji",x.e):"",h("div","wdword",x.w),md,bar,h("p","hint","Суроо: Бул сөздү катыштырып сүйлөм түзгүлө. Ага маанилеш же карама-каршы сөздү тапкыла."))};
  draw()}

Object.assign(window,{teamSetup,bigSetup,dictView,toolsMenu,medalsView,timerView,pickerView,wordDay,resultsView});
})();
