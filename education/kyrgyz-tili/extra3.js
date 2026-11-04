/* Текст детективи, окуяны өзүң танда, кроссворд, сөз издөө, диктант, иш барактары, тест түзүүчү, үй тапшырма коду, профилдер, деңгээлге жараша сунуш, жаңы башкы бет */
(function(){
const LS={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const ALPH="абвгдежзийклмнңоөпрстуүфхчшыэюя";
const say=w=>window.speakKy&&speakKy(w);
const KL={g:"Г",v:"С",w:"К"},LK={"Г":"g","С":"v","К":"w","G":"g","V":"v","K":"w"};

/* ---------- attach detective + word formation to units ---------- */
[7,8].forEach(n=>G[n].units.forEach((u,ui)=>{if(!u.w)u.w={t:"Кошумча көнүгүүлөр",ex:[]};
  const wf=window.WF&&WF[n]&&WF[n][ui];if(wf)u.w.ex.push({tp:"Сөз жасоо: уңгу + мүчө",type:"choose",instr:"Уңгуга туура мүчөнү тандап, жаңы сөз жасагыла. Жаңы сөздүн мааниси берилген.",qs:wf});
  const d=window.DET&&DET[n]&&DET[n][ui];if(d)u.w.ex.push({tp:"Текст детективи: «"+d.title+"»",type:"detective",instr:"Текстти окугула. Негизги ойду тапкыла, ырастоолорго «туура / туура эмес» деп жооп бергиле жана ар биринин далилин тексттен басып белгилегиле.",d})}));

BUILD.detective=function(ex,body){const d=ex.d,wrap=h("div","detwrap"),tx=h("div","dtext"),qs=h("div","dqs"),sents=[];let active=null;
  tx.append(h("h4",null,d.title));d.s.forEach((s,i)=>{const sp=h("span","ds",s+" ");sp.dataset.i=i;sp.onclick=()=>{if(!active)return;active.ev=i;active.evl.textContent="📍 Далил: "+(i+1)+"-сүйлөм";sents.forEach(x=>x.classList.remove("evon"));sp.classList.add("evon");active.row.classList.remove("ok","bad");active.btn.classList.remove("on");active=null;tx.classList.remove("picking")};sents.push(sp);tx.append(sp)});
  const mq=h("div","dq"),mo=h("div","mcq");mq.append(h("b",null,"1. Тексттин негизги ою кайсы?"),mo);const main={pick:null,btns:[]};
  shuffle(d.main).forEach(o=>{const b=h("button","opt",o);b.onclick=()=>{main.pick=o;main.btns.forEach(x=>x.classList.remove("on","ok","bad"));b.classList.add("on")};main.btns.push(b);mo.append(b)});qs.append(mq);
  const rows=d.tf.map(([st,val,ev],k)=>{const row=h("div","dq"),r={row,ans:null,ev:null,val:!!val,evA:ev};row.append(h("b",null,(k+2)+". "+st));
    const bs=h("div","mcq");[["Туура",true],["Туура эмес",false]].forEach(([l,v])=>{const b=h("button","opt",l);b.onclick=()=>{r.ans=v;bs.querySelectorAll(".opt").forEach(x=>x.classList.remove("on","ok","bad"));b.classList.add("on");row.classList.remove("ok","bad")};bs.append(b)});
    const eb=h("button","evbtn","📍 Далилди белгилөө"),el=h("span","evl","");r.btn=eb;r.evl=el;
    eb.onclick=()=>{if(active&&active!==r)active.btn.classList.remove("on");active=active===r?null:r;eb.classList.toggle("on",!!active);tx.classList.toggle("picking",!!active);if(active&&r.ev!=null){sents.forEach(x=>x.classList.toggle("evon",x.dataset.i==r.ev))}};
    row.append(bs,eb,el);qs.append(row);return r});
  wrap.append(tx,qs);body.append(wrap);
  const solveMain=()=>{main.pick=d.main[0];main.btns.forEach(b=>{b.classList.remove("on","ok","bad");if(b.textContent==d.main[0]){b.classList.add("on");mark(b,true)}})};
  const solveRow=r=>{r.ans=r.val;r.ev=r.evA;r.row.querySelectorAll(".opt").forEach(b=>{b.classList.remove("on","ok","bad");if((b.textContent=="Туура")==r.val)b.classList.add("on")});r.evl.textContent="📍 Далил: "+(r.evA+1)+"-сүйлөм";mark(r.row,true)};
  return{check(){let c=0;main.btns.forEach(b=>b.classList.remove("ok","bad"));if(main.pick){const b=main.btns.find(x=>x.textContent==main.pick);c+=mark(b,main.pick==d.main[0])}else mark(mo,false);
     rows.forEach(r=>{const a=r.ans===r.val,e=r.ev===r.evA;c+=(a?1:0)+(e?1:0);mark(r.row,a&&e)});return[c,1+rows.length*2]},
   show(){solveMain();rows.forEach(solveRow);sents.forEach(x=>x.classList.remove("evon"))},
   step(){if(main.pick!=d.main[0]){solveMain();return}const r=rows.find(r=>r.ans!==r.val||r.ev!==r.evA);if(r){solveRow(r);sents.forEach(x=>x.classList.toggle("evon",x.dataset.i==r.evA))}}}};

/* ---------- adaptive advice after unit tests ---------- */
const _on=window.onScore;
window.onScore=function(c,t){if(_on)_on(c,t);const k=window.CURKEY||"";app.querySelectorAll(".advice").forEach(x=>x.remove());if(!k.startsWith("t-")||!t)return;
  const [,n,ui]=k.split("-").map(Number),p=c/t,u=G[n].units[ui],box=h("div","advice");
  const btn=(l,f)=>{const b=h("button","rulebtn",l);b.onclick=f;return b};
  const det=u.w.ex.findIndex(e=>e.type=="detective");
  if(p>=.9){box.append(h("b",null,"🚀 Мыкты жыйынтык! Кыйыныраак тапшырмаларды аткарып көргүлө:"));const r=h("div","wbar");
    if(det>=0)r.append(btn("🔎 Текст детективи",()=>go(()=>exercise(n,"w",ui,det))));r.append(btn("📝 Чоң тест",()=>go(()=>bigSetup(n))),btn("🧩 Кроссворд",()=>go(()=>xword(n,ui))));box.append(r)}
  else if(p<.7){box.append(h("b",null,"📘 Бул теманы дагы бир кайталайлы:"));const rb=RL&&RL[n]&&RL[n][ui];if(rb){const ul=h("ul");rb[2].forEach(x=>ul.append(h("li",null,x)));box.append(h("p",null,rb[0]+". "+rb[1]),ul)}
    const r=h("div","wbar");r.append(btn("✏️ Грамматика 1-көнүгүү",()=>go(()=>exercise(n,"g",ui,0,true))),btn("📕 Каталар дептери",()=>go(()=>notebook(n))),btn("🃏 Сөз карточкалары",()=>go(()=>cards(n))));box.append(r)}
  else{box.append(h("b",null,"👍 Жакшы! Ката кеткен суроолор «Каталар дептерине» түштү — аларды кайра иштеп, 90%дан ашыргыла."));const r=h("div","wbar");r.append(btn("📕 Каталар дептери",()=>go(()=>notebook(n))));box.append(r)}
  const card=app.querySelector(".card");if(card)card.after(box)};

/* ---------- unit picker helper ---------- */
function unitSelect(n,all){const s=h("select");if(all)s.append(new Option("Бардык темалар","-1"));G[n].units.forEach((u,i)=>s.append(new Option(u.n+". "+u.name,i)));return s}
const cleanW=w=>w.toLowerCase();
const okWord=w=>/^[\p{L}]+$/u.test(w)&&w.length>=3;

/* ---------- adventure ---------- */
function advMenu(n){crumb.textContent=n+"-класс · Окуяны өзүң танда";app.innerHTML="";
  app.append(h("h2",null,"🧭 Окуяны өзүң танда"),h("p","lead","Турмуштук кырдаал. Ар бир кадамда кандай айтарыңды же кыларыңды танда. Туура тандоо — упай жана түшүндүрмө."));
  const r=h("div","res");ADV.forEach((a,i)=>{const b=h("button","rb");b.style.setProperty("--c","var(--g7)");b.append(h("b",null,a.icon+" "+a.title),h("span",null,Object.keys(a.n).length+" кадам"));b.onclick=()=>go(()=>advPlay(n,i));r.append(b)});app.append(r)}
function advPlay(n,i){const a=ADV[i];crumb.textContent=n+"-класс · "+a.title;app.innerHTML="";app.append(h("h2",null,a.icon+" "+a.title));
  const card=h("div","card adv");app.append(card);let node=a.start,sc=0,steps=0;
  const draw=()=>{card.innerHTML="";if(node=="end"){const r=h("div","result");r.append(h("div","n",sc==steps?"🏆":"⭐"),h("b",null,"Окуя бүттү!"),h("div",null,"Туура тандоолор: "+sc+" / "+steps));const ag=h("button","act","Кайра ойноо");ag.onclick=()=>replace(()=>advPlay(n,i));card.append(r,ag);return}
    const nd=a.n[node];card.append(h("div","advstep","Кадам "+(steps+1)+" / "+Object.keys(a.n).length),h("p","advt",nd.t));const ops=h("div","advops"),fb=h("div","fb");
    shuffle(nd.o).forEach(([l,nx,ok,msg])=>{const b=h("button","topt",l);b.onclick=()=>{if(ops.dataset.d)return;ops.dataset.d=1;steps++;if(ok)sc++;b.classList.add(ok?"ok":"bad");fb.className="fb "+(ok?"y":"n");fb.textContent=(ok?"✔ ":"✘ ")+msg;
      const go2=h("button","act","Улантуу ▸");go2.onclick=()=>{node=nx;draw()};card.append(go2);go2.focus()};ops.append(b)});card.append(ops,fb)};draw()}

/* ---------- crossword ---------- */
function genCross(list){const words=shuffle(list).sort((a,b)=>b.w.length-a.w.length).slice(0,10);const grid={},pl=[];const K=(r,c)=>r+","+c;
  const fits=(w,r,c,dr,dc)=>{if(grid[K(r-dr,c-dc)]||grid[K(r+dr*w.length,c+dc*w.length)])return false;let cross=0;
    for(let k=0;k<w.length;k++){const rr=r+dr*k,cc=c+dc*k,g=grid[K(rr,cc)];if(g){if(g!=w[k])return false;cross++}else{if(grid[K(rr+dc,cc+dr)]||grid[K(rr-dc,cc-dr)])return false}}return cross>0};
  const put=(o,r,c,dr,dc)=>{for(let k=0;k<o.w.length;k++)grid[K(r+dr*k,c+dc*k)]=o.w[k];pl.push({...o,r,c,dr,dc})};
  if(!words.length)return null;put(words[0],0,0,0,1);
  words.slice(1).forEach(o=>{const w=o.w;let done=false;for(const p of shuffle(pl)){if(done)break;for(let j=0;j<p.w.length&&!done;j++)for(let i=0;i<w.length&&!done;i++){if(w[i]!=p.w[j])continue;
      const dr=p.dc,dc=p.dr,r=p.r+p.dr*j-dr*i,c=p.c+p.dc*j-dc*i;if(fits(w,r,c,dr,dc)){put(o,r,c,dr,dc);done=true}}}});
  const ks=Object.keys(grid).map(k=>k.split(",").map(Number)),r0=Math.min(...ks.map(x=>x[0])),c0=Math.min(...ks.map(x=>x[1]));
  pl.forEach(p=>{p.r-=r0;p.c-=c0});const R=Math.max(...ks.map(x=>x[0]))-r0+1,C=Math.max(...ks.map(x=>x[1]))-c0+1;
  const starts=[...new Set(pl.map(p=>p.r*100+p.c))].sort((a,b)=>a-b);pl.forEach(p=>p.num=starts.indexOf(p.r*100+p.c)+1);return{pl,R,C}}
function xword(n,ui0){crumb.textContent=n+"-класс · Кроссворд";app.innerHTML="";
  app.append(h("h2",null,"🧩 Кроссворд"),h("p","lead","Сөздүн маанисин окуп, кроссвордду толтургула. Ар бир ачылганда жаңы кроссворд түзүлөт."));
  const us=unitSelect(n,true);us.value=ui0==null?"-1":ui0;const nw=h("button","act alt","Жаңы кроссворд ↻");const top=h("div","dtop");top.append(us,nw);const card=h("div","card");app.append(top,card);
  const build=()=>{const ui=+us.value,list=[];G[n].units.forEach((u,i)=>{if(ui>=0&&i!=ui)return;(u.v&&u.v.m||[]).forEach(([w,d])=>{const x=cleanW(w);if(okWord(x)&&x.length<=12)list.push({w:x,d})})});
    card.innerHTML="";const X=genCross(ui<0?shuffle(list).slice(0,14):list);if(!X||X.pl.length<2){card.append(h("p",null,"Бул темада кроссворд үчүн сөз аз. Башка теманы тандагыла."));return}
    const wrap=h("div","xwrap"),g=h("div","xgrid");g.style.gridTemplateColumns="repeat("+X.C+",var(--xs))";const cells={};
    for(let r=0;r<X.R;r++)for(let c=0;c<X.C;c++){const d=h("div","xc");g.append(d);cells[r+","+c]=d}
    X.pl.forEach(p=>{for(let k=0;k<p.w.length;k++){const key=(p.r+p.dr*k)+","+(p.c+p.dc*k),d=cells[key];if(!d.querySelector("input")){d.classList.add("on");const i=h("input");i.maxLength=1;i.dataset.a=p.w[k];i.setAttribute("aria-label","тамга");
        i.oninput=()=>{i.value=i.value.slice(-1).toLowerCase();i.classList.remove("ok","bad");if(i.value){const nx=cells[(p.r+p.dr*(k+1))+","+(p.c+p.dc*(k+1))];const ni=nx&&nx.querySelector("input");if(ni)ni.focus()}};d.append(i)}
      if(k==0&&!d.querySelector("sup"))d.prepend(h("sup",null,p.num))}});
    const cl=h("div","xclues");[["→ Туурасынан",0],["↓ Тигинен",1]].forEach(([t,dir])=>{const box=h("div");box.append(h("b",null,t));const ol=h("ul");X.pl.filter(p=>(p.dr==1)==!!dir).sort((a,b)=>a.num-b.num).forEach(p=>ol.append(h("li",null,p.num+". "+p.d+" ("+p.w.length+" тамга)")));box.append(ol);cl.append(box)});
    wrap.append(g,cl);const bar=h("div","actions"),out=h("output"),sc=h("div","score");sc.append("Упай: ",out);
    const bc=h("button","act","Текшерүү"),bs=h("button","act see","Жоопторду көрүү"),bp=h("button","act alt","Басып чыгаруу");
    const ins=()=>[...g.querySelectorAll("input")];
    bc.onclick=()=>{let ok=0;X.pl.forEach(p=>{let good=true;for(let k=0;k<p.w.length;k++){const i=cells[(p.r+p.dr*k)+","+(p.c+p.dc*k)].querySelector("input");if(i.value!=i.dataset.a)good=false}if(good)ok++});ins().forEach(i=>{if(i.value)mark(i,i.value==i.dataset.a)});out.textContent=ok+"/"+X.pl.length};
    bs.onclick=()=>{ins().forEach(i=>{i.value=i.dataset.a;i.classList.add("ok")});out.textContent=X.pl.length+"/"+X.pl.length};bp.onclick=()=>window.print();
    bar.append(sc,bc,bp,bs);card.append(wrap,bar)};
  us.onchange=build;nw.onclick=build;build()}

/* ---------- word search ---------- */
function wsearch(n,ui0){crumb.textContent=n+"-класс · Сөз издөө";app.innerHTML="";
  app.append(h("h2",null,"🔤 Сөз издөө"),h("p","lead","Таблицадан жашырылган сөздөрдү тапкыла: сөздүн биринчи тамгасын, анан акыркы тамгасын баскыла. Сөздөр солдон оңго, жогортон ылдый же кыйгач жазылган."));
  const us=unitSelect(n,true);us.value=ui0==null?"0":ui0;const nw=h("button","act alt","Жаңы таблица ↻");const top=h("div","dtop");top.append(us,nw);const card=h("div","card");app.append(top,card);
  const build=()=>{const ui=+us.value;let ws=[];G[n].units.forEach((u,i)=>{if(ui>=0&&i!=ui)return;(u.v&&u.v.m||[]).forEach(([w])=>ws.push(cleanW(w)));(u.pic||[]).forEach(([w])=>ws.push(cleanW(w)))});
    ws=shuffle([...new Set(ws.filter(okWord))]).filter(w=>w.length<=11).slice(0,8);const N=Math.max(10,...ws.map(w=>w.length));const G2=Array.from({length:N},()=>Array(N).fill(""));const placed=[];
    const D=[[0,1],[1,0],[1,1]];
    ws.forEach(w=>{for(let t=0;t<300;t++){const[dr,dc]=D[Math.random()*3|0],r=Math.random()*(N-(dr?w.length:0)+1)|0,c=Math.random()*(N-(dc?w.length:0)+1)|0;
      if(r+dr*(w.length-1)>=N||c+dc*(w.length-1)>=N)continue;let ok=true;for(let k=0;k<w.length;k++){const x=G2[r+dr*k][c+dc*k];if(x&&x!=w[k]){ok=false;break}}
      if(ok){for(let k=0;k<w.length;k++)G2[r+dr*k][c+dc*k]=w[k];placed.push({w,r,c,dr,dc});break}}});
    for(let r=0;r<N;r++)for(let c=0;c<N;c++)if(!G2[r][c])G2[r][c]=ALPH[Math.random()*ALPH.length|0];
    card.innerHTML="";const g=h("div","wsgrid");g.style.gridTemplateColumns="repeat("+N+",var(--ws))";const cells=[];let first=null,found=0;
    const list=h("div","wslist");placed.forEach(p=>{p.el=h("span",null,p.w);list.append(p.el)});
    const msg=h("div","fb");
    for(let r=0;r<N;r++){cells[r]=[];for(let c=0;c<N;c++){const b=h("button","wsc",G2[r][c].toUpperCase());b.onclick=()=>{
      if(!first){first=[r,c];b.classList.add("sel");return}const[r1,c1]=first;cells[r1][c1].classList.remove("sel");first=null;
      const dr=Math.sign(r-r1),dc=Math.sign(c-c1),len=Math.max(Math.abs(r-r1),Math.abs(c-c1))+1;if(!(r==r1||c==c1||Math.abs(r-r1)==Math.abs(c-c1)))return;
      let s="",path=[];for(let k=0;k<len;k++){s+=G2[r1+dr*k][c1+dc*k];path.push(cells[r1+dr*k][c1+dc*k])}
      const p=placed.find(p=>!p.done&&(p.w==s||p.w==[...s].reverse().join("")));if(p){p.done=1;found++;path.forEach(x=>x.classList.add("found"));p.el.classList.add("got");msg.className="fb y";msg.textContent="Табылды: "+p.w+"  ("+found+" / "+placed.length+")";if(found==placed.length){msg.textContent="🎉 Бардык сөздөр табылды!"}}
      else{msg.className="fb n";msg.textContent="Мындай сөз жок. Кайра аракет кылгыла."}};cells[r][c]=b;g.append(b)}}
    const bs=h("button","act see","Жоопторду көрүү"),bp=h("button","act alt","Басып чыгаруу");bs.onclick=()=>placed.forEach(p=>{for(let k=0;k<p.w.length;k++)cells[p.r+p.dr*k][p.c+p.dc*k].classList.add("found");p.el.classList.add("got")});bp.onclick=()=>window.print();
    const bar=h("div","wbar");bar.append(bp,bs);const wr=h("div","wswrap");wr.append(g,list);card.append(wr,msg,bar)};
  us.onchange=build;nw.onclick=build;build()}

/* ---------- dictation ---------- */
function dictSents(u){const out=[];["g","v","w"].forEach(k=>u[k]&&u[k].ex.forEach(e=>{
  if(e.type=="gap")e.qs.forEach(q=>out.push(q.replace(/\{(.+?)\}/,"$1")));
  if(e.type=="fix")e.qs.forEach(q=>out.push(q.replace(/\{[^>]*>([^}]*)\}/,"$1")));
  if(e.type=="punct")e.qs.forEach(q=>out.push(q.replace(/\s*\[([^\]]+)\]/g,(m,x)=>x=="—"?" —":x)))}));return[...new Set(out)].filter(s=>s.split(" ").length>=3)}
function dictation(n){crumb.textContent=n+"-класс · Диктант";app.innerHTML="";
  app.append(h("h2",null,"✍️ Диктант"),h("p","lead","🔊 баскычын басып, сүйлөмдү угуп, жазгыла. Анан «Текшерүү» баскычын баскыла: туура сөздөр жашыл, каталар кызыл болуп, туурасы көрсөтүлөт. Үн чыкпаса, мугалим окуп берет — анда «Сүйлөмдү көрсөтүү» мугалим үчүн."));
  const us=unitSelect(n,false),nw=h("button","act alt","Жаңы сүйлөмдөр ↻"),top=h("div","dtop");top.append(us,nw);const card=h("div","card");app.append(top,card);
  const build=()=>{card.innerHTML="";const ss=shuffle(dictSents(G[n].units[+us.value])).slice(0,5),rows=[];const list=h("div","qlist");
    ss.forEach(s=>{const row=h("div","q"),t=h("div","t"),b=h("button","say","🔊"),inp=h("input"),res=h("div","dres"),tg=h("button","seg","Сүйлөмдү көрсөтүү");inp.type="text";inp.className="dinp";inp.autocomplete="off";inp.spellcheck=false;
      b.onclick=()=>say(s);const tt=h("div","dteach",s);tt.hidden=true;tg.onclick=()=>tt.hidden=!tt.hidden;const l1=h("div","drow");l1.append(b,inp);t.append(l1,res,tg,tt);row.append(t);list.append(row);rows.push({s,inp,res})});
    const tok=x=>x.toLowerCase().replace(/[«»".,!?:;]/g," ").replace(/\s+—\s+/g," ").split(/\s+/).filter(Boolean);
    const out=h("output"),sc=h("div","score");sc.append("Упай: ",out);const bc=h("button","act","Текшерүү"),bs=h("button","act see","Жоопторду көрүү");
    bc.onclick=()=>{let c=0;rows.forEach(r=>{const a=tok(r.s),b=tok(r.inp.value);r.res.innerHTML="";let all=a.length==b.length;
      a.forEach((w,i)=>{const ok=b[i]==w;if(!ok)all=false;const sp=h("span",ok?"dok":"dbad",ok?w:(b[i]||"…")+" → "+w);r.res.append(sp," ")});if(all)c++;mark(r.inp,all)});out.textContent=c+"/"+rows.length};
    bs.onclick=()=>{rows.forEach(r=>{r.inp.value=r.s;mark(r.inp,true);r.res.innerHTML=""});out.textContent=rows.length+"/"+rows.length};
    const bar=h("div","actions");bar.append(sc,bc,bs);card.append(list,bar)};
  us.onchange=build;nw.onclick=build;build()}

/* ---------- printable worksheets ---------- */
const BL="________";
function wsRender(ex,num){const box=h("div","wsx"),key=[];box.append(h("h4",null,num+". "+(ex.tp?ex.tp+" — ":"")+ex.instr));const ol=h("ol");
  const P=s=>parseBr(s);
  switch(ex.type){
   case"choose":case"drop":ex.qs.forEach(q=>{const p=P(q);const li=h("li",null,p.pre+BL+p.post+"   ("+shuffle(p.opts).join(" / ")+")");ol.append(li);key.push(p.a)});break;
   case"listen":ex.qs.forEach(q=>{const p=P(q);ol.append(h("li",null,"🔊 "+BL+"   ("+shuffle(p.opts).join(" / ")+")"));key.push(p.a)});box.append(h("p","wsn","Мугалим сөздү окуйт."));break;
   case"gap":{const ws=ex.qs.map(q=>q.match(/\{(.+?)\}/)[1]).concat(ex.extra||[]);box.append(h("p","wsbank","Сөздөр: "+shuffle(ws).join(" · ")));ex.qs.forEach(q=>{const m=q.match(/^(.*)\{(.+)\}(.*)$/);ol.append(h("li",null,m[1]+BL+m[3]));key.push(m[2])});break}
   case"sort":{const ws=Object.keys(ex.items);box.append(h("p","wsbank","Сөздөр: "+shuffle(ws).join(" · ")));const tb=h("table","wstab"),tr=h("tr");ex.cats.forEach(c=>tr.append(h("th",null,c)));tb.append(tr);
     const rows=Math.max(...ex.cats.map((_,i)=>ws.filter(w=>ex.items[w]==i).length));for(let r=0;r<rows;r++){const t=h("tr");ex.cats.forEach(()=>t.append(h("td",null," ")));tb.append(t)}box.append(tb);
     ex.cats.forEach((c,i)=>key.push(c+": "+ws.filter(w=>ex.items[w]==i).join(", ")));return[box,key]}
   case"order":ex.qs.forEach(q=>{const parts=q.includes("|")?q.split("|"):q.split(" ");const li=h("li");li.append(h("div",null,shuffle(parts).join("  /  ")),h("div","wsline",""));ol.append(li);key.push(parts.join(" "))});break;
   case"rewrite":ex.qs.forEach(([q,a])=>{const li=h("li");li.append(h("div",null,q),h("div","wsline",""));ol.append(li);key.push(a[0])});break;
   case"match":{const ds=shuffle(ex.pairs.map(p=>p[1])),L="абвгдежзийкл";const tb=h("table","wstab");ex.pairs.forEach((p,i)=>{const t=h("tr");t.append(h("td",null,(i+1)+". "+p[0]+"  ___"),h("td",null,L[i]+") "+(ds[i]||"")));tb.append(t)});box.append(tb);ex.pairs.forEach((p,i)=>key.push((i+1)+"–"+L[ds.indexOf(p[1])]));return[box,key]}
   case"parse":{const R={э:"ээ",б:"баяндооч",а:"аныктооч",т:"толуктооч",ы:"бышыктооч"};box.append(h("p","wsn","Белгилегиле: "+(ex.roles||["э","б"]).map(r=>R[r]).join(", ")));
     ex.qs.forEach(q=>{ol.append(h("li",null,q.replace(/\/[эбаты]/g,"")));key.push(q.split(" ").filter(t=>/\/[эбаты]/.test(t)).map(t=>t.replace(/[.,!?]/g,"").replace(/\/(.)/,(m,r)=>" ("+R[r]+")")).join(", "))});break}
   case"fix":ex.qs.forEach(q=>{ol.append(h("li",null,q.replace(/\{([^>]*)>[^}]*\}/,"$1")));const m=q.match(/\{([^>]*)>([^}]*)\}/);key.push(m[1]+" → "+m[2])});break;
   case"punct":ex.qs.forEach(q=>{ol.append(h("li",null,q.replace(/\s*\[[^\]]+\]/g,"")));key.push(q.replace(/\s*\[([^\]]+)\]/g,(m,x)=>x=="—"?" —":x))});break;
   case"write":{box.append(h("p",null,ex.task));const ul=h("ul");ex.plan.forEach(p=>ul.append(h("li",null,p)));box.append(ul);for(let i=0;i<10;i++)box.append(h("div","wsline",""));key.push("Үлгү: "+ex.model);return[box,key]}
   case"detective":{const d=ex.d;box.append(h("p","wstext",d.s.map((s,i)=>"("+(i+1)+") "+s).join(" ")));ol.append(h("li",null,"Негизги ой: "+shuffle(d.main).join(" / ")));key.push(d.main[0]);
     d.tf.forEach(([s,v,e])=>{ol.append(h("li",null,s+"   Туура / Туура эмес · Далил: ___-сүйлөм"));key.push((v?"Туура":"Туура эмес")+", "+(e+1)+"-сүйлөм")});break}
   default:return[null,[]]}
  box.append(ol);return[box,key]}
function worksheet(n,ui){const u=G[n].units[ui];crumb.textContent=n+"-класс · Иш барагы";app.innerHTML="";
  const all=[];["g","v","w"].forEach(k=>u[k]&&u[k].ex.forEach((e,i)=>all.push({k,i,e})));
  const ctl=h("div","card noprint wsctl");ctl.append(h("b",null,"Иш барагына кирчү көнүгүүлөр:"));const cbs=[];const grid=h("div","uchk");
  all.forEach(x=>{const l=h("label"),c=h("input");c.type="checkbox";c.checked=x.e.type!="listen";cbs.push(c);l.append(c," "+KL[x.k]+(x.i+1)+": "+(x.e.tp||u[x.k].t).slice(0,48));grid.append(l)});
  const kk=h("label"),kc=h("input");kc.type="checkbox";kc.checked=true;kk.append(kc," Жооптору өзүнчө баракта");
  const bar=h("div","wbar"),pr=h("button","act","🖨 Басып чыгаруу / PDF"),up=h("button","act alt","Жаңылоо");bar.append(pr,up);ctl.append(grid,kk,bar);
  const sheet=h("div","sheet");app.append(ctl,sheet);
  const draw=()=>{sheet.innerHTML="";const hd=h("div","wshead");hd.append(h("b",null,"Кыргыз тили · "+n+"-класс · "+u.n+"-тема: "+u.name),h("span",null,"Аты-жөнү: ____________________   Класс: ______   Күнү: ________"));sheet.append(hd);
    const keys=[];let num=0;all.forEach((x,j)=>{if(!cbs[j].checked)return;const[b,k]=wsRender(x.e,++num);if(b){sheet.append(b);keys.push([num,k])}});
    if(kc.checked){const ak=h("div","anskey");ak.append(h("h3",null,"Жооптор · "+u.n+"-тема"));keys.forEach(([nn,k])=>{ak.append(h("p",null,nn+". "+k.map((x,i)=>(i+1)+") "+x).join("; ")))});sheet.append(ak)}};
  pr.onclick=()=>window.print();up.onclick=draw;cbs.forEach(c=>c.onchange=draw);kc.onchange=draw;draw()}
function wsMenu(n){crumb.textContent=n+"-класс · Иш барактары";app.innerHTML="";
  app.append(h("h2",null,"🖨 Басып чыгарылуучу иш барактары"),h("p","lead","Теманы тандагыла. Иш барагында окуучунун аты үчүн орун, бардык көнүгүүлөр жана өзүнчө баракта жооптор болот. «PDF катары сактоо» менен файл кылып алса да болот."));
  const u=h("div","units");G[n].units.forEach((un,ui)=>{const r=h("div","unit"),box=h("div","unum",un.n),info=h("div"),b=h("button","exb","Иш барагын ачуу");box.style.setProperty("--c",GC[n]);b.style.setProperty("--c","var(--wb)");b.onclick=()=>go(()=>worksheet(n,ui));info.append(h("h3",null,un.name),h("p",null,un.g.t),b);r.append(box,info);u.append(r)});app.append(u)}

/* ---------- test builder ---------- */
const TK="kg-tests";
function tbMenu(n){crumb.textContent=n+"-класс · Тест түзүүчү";app.innerHTML="";
  app.append(h("h2",null,"🛠 Тест түзүүчү"),h("p","lead","Суроолорду өзүңүз тандап же өзүңүз жазып, жеке тест түзүңүз. Тесттер ушул компьютерде сакталат. Аларды класс менен иштеп же басып чыгарса болот."));
  const nb=h("button","act","+ Жаңы тест түзүү");nb.onclick=()=>go(()=>tbEdit(n,null));app.append(nb);
  const ts=LS.get(TK,[]).filter(t=>t.n==n);if(!ts.length){app.append(h("p",null,"Азырынча сакталган тест жок."));return}
  const u=h("div","units");ts.forEach(t=>{const r=h("div","unit"),box=h("div","unum","📝"),info=h("div"),bs=h("div","exbtns");box.style.setProperty("--c",GC[n]);
    const run=h("button","exb","Иштөө"),pr=h("button","exb","Басып чыгаруу"),ed=h("button","exb","Өзгөртүү"),del=h("button","exb","Өчүрүү");[run,pr,ed,del].forEach((b,i)=>b.style.setProperty("--c",["var(--unit)","var(--wb)","var(--g7)","var(--bad)"][i]));
    run.onclick=()=>go(()=>tbRun(t));pr.onclick=()=>go(()=>tbPrint(t));ed.onclick=()=>go(()=>tbEdit(n,t));
    del.onclick=()=>{if(del.dataset.c){LS.set(TK,LS.get(TK,[]).filter(x=>x.id!=t.id));replace(()=>tbMenu(n))}else{del.dataset.c=1;del.textContent="Ырастоо?"}};
    bs.append(run,pr,ed,del);info.append(h("h3",null,t.name),h("p",null,t.qs.length+" суроо"),bs);r.append(box,info);u.append(r)});app.append(u)}
const toBr=q=>q.t.replace("___","["+q.o.map(o=>o==q.a?o+"*":o).join("|")+"]");
function tbEdit(n,t){crumb.textContent=n+"-класс · Тест түзүү";app.innerHTML="";const chosen=new Set(t?t.qs:[]);
  app.append(h("h2",null,t?"Тестти өзгөртүү":"Жаңы тест"));const card=h("div","card setup");const nm=h("input");nm.type="text";nm.placeholder="Тесттин аты (мис.: 2-чейрек, 8-А)";nm.value=t?t.name:"";
  const cnt=h("b",null,"");const upd=()=>cnt.textContent="Тандалды: "+chosen.size+" суроо";upd();
  card.append(h("b",null,"Тесттин аты"),nm,cnt);
  const own=h("details","own");own.append(h("summary",null,"✏️ Өз сурооңузду кошуу"));const oq=h("input");oq.type="text";oq.placeholder="Суроо. Жооп турчу жерге ___ коюңуз: Мен эртең мектепке ___.";
  const oo=[0,1,2].map(i=>{const x=h("input");x.type="text";x.placeholder=i==0?"Туура жооп":"Туура эмес вариант "+i;return x});const ob=h("button","act alt","Кошуу"),om=h("p","hint","");
  ob.onclick=()=>{const q=oq.value.trim(),os=oo.map(x=>x.value.trim()).filter(Boolean);if(!q.includes("___")||os.length<2||!oo[0].value.trim()){om.textContent="Суроодо ___ болушу жана кеминде эки вариант (биринчиси туура) жазылышы керек.";return}
    const br=q.replace("___","["+[os[0]+"*"].concat(os.slice(1)).join("|")+"]");chosen.add(br);ownList.append(h("li",null,q.replace("___","["+os[0]+"]")));oq.value="";oo.forEach(x=>x.value="");om.textContent="Кошулду ✓";upd()};
  const ownList=h("ul");[...chosen].filter(q=>!G[n].units.some(u=>poolUnit(u).some(p=>toBr(p)==q))).forEach(q=>ownList.append(h("li",null,q)));
  own.append(oq,...oo,ob,om,ownList);card.append(own);
  G[n].units.forEach((u,ui)=>{const d=h("details","tbu"),sm=h("summary",null,u.n+". "+u.name);d.append(sm);const all=h("button","seg","Баарын тандоо");const items=[];
    const seen=new Set();poolUnit(u).forEach(p=>{const br=toBr(p);if(seen.has(p.t))return;seen.add(p.t);const l=h("label","tbq"),c=h("input");c.type="checkbox";c.checked=chosen.has(br);c.onchange=()=>{c.checked?chosen.add(br):chosen.delete(br);upd()};items.push([c,br]);l.append(c," "+p.t.replace("___","["+p.a+"]"));d.append(l)});
    all.onclick=()=>{items.forEach(([c,br])=>{c.checked=true;chosen.add(br)});upd()};sm.after(all);card.append(d)});
  const sv=h("button","act","💾 Сактоо"),msg=h("p","hint","");
  sv.onclick=()=>{if(!nm.value.trim()){msg.textContent="Тесттин атын жазыңыз.";return}if(!chosen.size){msg.textContent="Кеминде бир суроо тандаңыз.";return}
    const ts=LS.get(TK,[]),rec={id:t?t.id:"t"+Date.now().toString(36),n,name:nm.value.trim(),qs:[...chosen]};const i=ts.findIndex(x=>x.id==rec.id);if(i>=0)ts[i]=rec;else ts.push(rec);LS.set(TK,ts);stack.pop();replace(()=>tbMenu(n))};
  card.append(msg,sv);app.append(card)}
function tbRun(t){crumb.textContent=t.n+"-класс · "+t.name;app.innerHTML="";app.append(h("h2",null,"📝 "+t.name));window.CURKEY=null;const card=h("div","card");app.append(card);exerciseInto(card,{type:"choose",instr:"Туура жоопту тандагыла.",qs:shuffle(t.qs)})}
function tbPrint(t){crumb.textContent=t.n+"-класс · "+t.name;app.innerHTML="";const sheet=h("div","sheet"),hd=h("div","wshead");hd.append(h("b",null,"Кыргыз тили · "+t.n+"-класс · "+t.name),h("span",null,"Аты-жөнү: ____________________   Класс: ______   Күнү: ________"));sheet.append(hd);
  const[b,k]=wsRender({type:"choose",instr:"Туура жоопту тандап, бош орунга жазгыла.",qs:t.qs},1);sheet.append(b);const ak=h("div","anskey");ak.append(h("h3",null,"Жооптор"),h("p",null,k.map((x,i)=>(i+1)+") "+x).join("; ")));sheet.append(ak);
  const bar=h("div","wbar noprint"),pr=h("button","act","🖨 Басып чыгаруу / PDF");pr.onclick=()=>window.print();bar.append(pr);app.append(bar,sheet)}

/* ---------- homework codes ---------- */
function hwMake(n){crumb.textContent=n+"-класс · Үй тапшырма";app.innerHTML="";
  app.append(h("h2",null,"🏠 Үй тапшырма түзүү"),h("p","lead","Көнүгүүлөрдү белгилеңиз — кыска код түзүлөт. Кодду доскага жазыңыз же окуучуларга жөнөтүңүз. Окуучу башкы беттеги «Үй тапшырма коду» талаасына кодду жазып, тапшырмаларды ачат."));
  const sel=[];const card=h("div","card setup"),code=h("div","hwcode","—");
  const mk=()=>{const c=sel.filter(x=>x.c.checked).map(x=>x.u+KL[x.k]+(x.i+1));code.textContent=c.length?n+"-"+c.join("-"):"—"};
  G[n].units.forEach((u,ui)=>{const d=h("details","tbu");d.append(h("summary",null,u.n+". "+u.name));["g","v","w"].forEach(k=>u[k]&&u[k].ex.forEach((e,i)=>{const l=h("label","tbq"),c=h("input");c.type="checkbox";c.onchange=mk;sel.push({c,u:u.n,k,i});l.append(c," "+KL[k]+(i+1)+": "+(e.tp||u[k].t));d.append(l)}));card.append(d)});
  const cp=h("button","act","📋 Кодду көчүрүү"),op=h("button","act alt","Текшерип ачуу");cp.onclick=()=>{try{navigator.clipboard.writeText(code.textContent);cp.textContent="Көчүрүлдү ✓"}catch(e){}};op.onclick=()=>{if(code.textContent!="—")go(()=>hwOpen(code.textContent))};
  const bar=h("div","wbar");bar.append(cp,op);app.append(h("b",null,"Код:"),code,bar,card)}
function hwParse(s){s=s.trim().toUpperCase().replace(/\s+/g,"");const m=s.match(/^([78])-(.+)$/);if(!m)return null;const n=+m[1],out=[];
  for(const t of m[2].split("-")){const x=t.match(/^(\d{1,2})([ГСКGVK])(\d{1,2})$/);if(!x)return null;const ui=+x[1]-1,k=LK[x[2]],i=+x[3]-1;const u=G[n].units[ui];if(!u||!u[k]||!u[k].ex[i])return null;out.push({n,ui,k,i})}return out.length?out:null}
function hwOpen(code){const L=hwParse(code);crumb.textContent="Үй тапшырма";app.innerHTML="";
  if(!L){app.append(h("h2",null,"Код туура эмес"),h("p",null,"Кодду текшерип, кайра жазгыла. Мисал: 7-3Г1-3К4"));return}
  app.append(h("h2",null,"🏠 Үй тапшырма · "+code.toUpperCase()),h("p","lead","Ар бир көнүгүүнү толук туура аткарсаңар ✓ белгиси коюлат."));const ls=h("div","units");let done=0;
  L.forEach(x=>{const u=G[x.n].units[x.ui],e=u[x.k].ex[x.i],ok=window.isDone&&isDone([x.n,x.k,x.ui,x.i].join("-"));if(ok)done++;const r=h("div","unit"),box=h("div","unum",ok?"✓":KL[x.k]+(x.i+1)),info=h("div"),b=h("button","exb",ok?"Кайра аткаруу":"Аткаруу");
    box.style.setProperty("--c",ok?"var(--ok)":GC[x.n]);b.style.setProperty("--c",KC[x.k]);b.onclick=()=>go(()=>exercise(x.n,x.k,x.ui,x.i));info.append(h("h3",null,u.n+"-тема · "+u.name),h("p",null,e.tp||u[x.k].t),b);r.append(box,info);ls.append(r)});
  app.append(h("div","mtotal","Аткарылды: "+done+" / "+L.length+(done==L.length?" 🎉":"")),ls)}

/* ---------- profiles ---------- */
function profStats(id){const r=k=>window.PROF?PROF.read(id,k):null;const st=r("kg-stars")||{},lt=r("kg-lt")||{},mi=r("kg-mist")||[];
  const s7=r("kg-streak-7")||{},s8=r("kg-streak-8")||{};return{stars:Object.keys(st).filter(k=>!k.startsWith("t-")).length,tests:Object.keys(st).filter(k=>k.startsWith("t-")).length,words:Object.values(lt).filter(v=>v>=5).length,mist:mi.length,streak:Math.max(s7.best||0,s8.best||0)}}
function profView(){crumb.textContent="Профилдер";app.innerHTML="";if(!window.PROF){app.append(h("p",null,"Бул браузерде профилдер иштебейт."));return}
  app.append(h("h2",null,"👤 Окуучулардын профилдери"),h("p","lead","Бир компьютерде бир нече окуучу иштесе, ар бири өз профилин тандайт. Жылдыздар, медалдар, серия, каталар дептери жана карточкалар ар кимде өзүнчө сакталат. Маалымат ушул компьютерде гана болот."));
  const cur=PROF.cur(),list=h("div","medals");
  const card=(id,name)=>{const s=profStats(id),c=h("div","mcard"+((cur?cur.id:"")==id?" pcur":""));c.append(h("div","mmed",id?"👤":"👥"),h("b",null,name+((cur?cur.id:"")==id?" (азыр)":"")),h("span",null,"⭐ "+s.stars+" · 🏅 "+s.tests+" тест · 🃏 "+s.words+" сөз"),h("span",null,"🔥 эң узун серия: "+s.streak+" · 📕 ката: "+s.mist));
    const bar=h("div","wbar"),u=h("button","seg","Колдонуу");u.onclick=()=>{PROF.use(id);home()};bar.append(u);
    if(id){const d=h("button","seg","Өчүрүү");d.onclick=()=>{if(d.dataset.c){PROF.remove(id);replace(profView)}else{d.dataset.c=1;d.textContent="Ырастоо?"}};bar.append(d)}c.append(bar);return c};
  list.append(card("","Жалпы (профилсиз)"));PROF.list().forEach(p=>list.append(card(p.id,p.name)));
  const add=h("div","card setup"),inp=h("input"),b=h("button","act","+ Профиль кошуу");inp.type="text";inp.placeholder="Окуучунун аты";b.onclick=()=>{const v=inp.value.trim();if(!v)return;const id=PROF.add(v);PROF.use(id);replace(profView)};
  add.append(h("b",null,"Жаңы окуучу"),inp,b);app.append(list,h("p"),add)}

/* ---------- menus: grade menu groups + home cover ---------- */
const _gm=gradeMenu;
gradeMenu=function(n){_gm(n);const r=app.querySelector(".res");if(!r)return;
  [["🔎 Текст детективи","Текстти окуп, негизги ойду жана далилди табуу","var(--unit)",()=>detMenu(n)],
   ["🧭 Окуяны өзүң танда","Дүкөндө, дарыгерде, саякатта, театрда","var(--g7)",()=>advMenu(n)],
   ["✍️ Диктант","Сүйлөмдү угуп жазуу, каталарды көрүү","var(--voc)",()=>dictation(n)],
   ["🧩 Кроссворд","Ар бир темадан жаңы кроссворд","var(--g8)",()=>xword(n)],
   ["🔤 Сөз издөө","Таблицадан жашырылган сөздөрдү табуу","var(--gram)",()=>wsearch(n)],
   ["🖨 Иш барактары","Басып чыгаруу үчүн тапшырмалар жана жооптор","var(--wb)",()=>wsMenu(n)],
   ["🛠 Тест түзүүчү","Суроолорду тандап же өзүңүз жазып тест түзүү","var(--bad)",()=>tbMenu(n)],
   ["🏠 Үй тапшырма коду","Көнүгүүлөрдү тандап, окуучуларга код берүү","var(--g7)",()=>hwMake(n)]].forEach(([t,d,c,fn])=>{const b=h("button","rb");b.style.setProperty("--c",c);b.append(h("b",null,t),h("span",null,d));b.onclick=()=>go(fn);r.append(b)});
  const GR=[["📚 Көнүгүүлөр",["Тема боюнча","Грамматикалык","Сөз байлыгы","Кошумча","Текст детективи","Окуяны","Диктант"]],
   ["🔁 Кайталоо жана текшерүү",["Тесттер","Чейрек","Күндүн чакырыгы","карточкалары","Каталар","Сөздүк","Медалдар"]],
   ["🎮 Оюндар",["Оюндар","Командалык","Кроссворд","Сөз издөө"]],
   ["🧑‍🏫 Мугалим үчүн",["Иш барактары","Тест түзүүчү","Үй тапшырма","куралдары"]]];
  const bs=[...r.querySelectorAll(".rb")],used=new Set(),host=h("div");
  GR.forEach(([title,keys])=>{const g=h("div","res");keys.forEach(kw=>{const b=bs.find(b=>!used.has(b)&&b.querySelector("b").textContent.includes(kw));if(b){used.add(b);g.append(b)}});if(g.children.length)host.append(h("h3","mgroup",title),g)});
  const rest=bs.filter(b=>!used.has(b));if(rest.length){const g=h("div","res");rest.forEach(b=>g.append(b));host.append(g)}
  r.replaceWith(host)};
window.gradeMenu=gradeMenu;
function detMenu(n){crumb.textContent=n+"-класс · Текст детективи";app.innerHTML="";app.append(h("h2",null,"🔎 Текст детективи"),h("p","lead","Ар бир темага бир кыска текст. Негизги ойду тапкыла, ырастоолорду текшергиле жана далилди тексттен көрсөткүлө."));
  const u=h("div","units");G[n].units.forEach((un,ui)=>{const i=un.w.ex.findIndex(e=>e.type=="detective");if(i<0)return;const r=h("div","unit"),box=h("div","unum",un.n),info=h("div"),b=h("button","exb","Окуу");box.style.setProperty("--c",GC[n]);b.style.setProperty("--c","var(--unit)");
    if(window.isDone&&isDone([n,"w",ui,i].join("-")))b.classList.add("done");b.onclick=()=>go(()=>exercise(n,"w",ui,i));info.append(h("h3",null,un.name),h("p",null,"«"+un.w.ex[i].d.title+"»"),b);r.append(box,info);u.append(r)});app.append(u)}
const _home=home;
home=function(){_home();const P=window.PROF&&PROF.cur(),st=LS.get("kg-stars",{}),lt=LS.get("kg-lt",{}),sk=Math.max((LS.get("kg-streak-7",{}).cur)||0,(LS.get("kg-streak-8",{}).cur)||0);
  const h2=app.querySelector("h2"),lead=app.querySelector(".lead");if(h2)h2.remove();
  const cv=h("div","cover"),tl=h("div","ctitle");tl.append(h("div","clogo","Кыргыз тили"),h("div","csub","7–8-класс · интерактивдүү практикум"));
  const pb=h("button","pchip","👤 "+(P?P.name:"Профиль тандоо"));pb.onclick=()=>go(profView);
  const stats=h("div","cstats");[["⭐",Object.keys(st).filter(k=>!k.startsWith("t-")).length,"жылдыз"],["🏅",Object.keys(st).filter(k=>k.startsWith("t-")).length,"тест"],["🔥",sk,"күн серия"],["🃏",Object.values(lt).filter(v=>v>=5).length,"сөз үйрөнүлдү"]].forEach(([i,v,l])=>{const s=h("div","cst");s.append(h("b",null,i+" "+v),h("span",null,l));stats.append(s)});
  cv.append(tl,pb,stats);app.prepend(cv);if(lead){lead.classList.add("clead");cv.after(lead)}
  const hw=h("div","card hwin"),inp=h("input"),b=h("button","act","Ачуу");inp.type="text";inp.placeholder="Мис.: 7-3Г1-3К4";const m=h("span","hint","");
  b.onclick=()=>{if(hwParse(inp.value))go(()=>hwOpen(inp.value.trim()));else m.textContent="Код туура эмес."};inp.onkeydown=e=>{if(e.key=="Enter")b.click()};
  hw.append(h("b",null,"🏠 Үй тапшырма коду"),inp,b,m);app.append(hw)};
window.home=home;
Object.assign(window,{advMenu,advPlay,tbEdit,xword,wsearch,dictation,wsMenu,worksheet,tbMenu,hwMake,hwOpen,profView,detMenu});
})();
