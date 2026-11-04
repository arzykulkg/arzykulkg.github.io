/* Эрежелер, акылдуу түшүндүрмө, каталар дептери, күндүн чакырыгы, сөз карточкалары, «улантуу» */
(function(){
const LS={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};

/* ---------- short rules (оригиналдуу кыскача түшүндүрмөлөр) ---------- */
const RL={7:[
 ["Кызматчы сөздөр","Өз алдынча суроого жооп бербейт. Сөздөрдү, сүйлөмдөрдү байланыштырат же мааниге кошумча өң берет.",
  ["Байламта — сөздөрдү, сүйлөмдөрдү байланыштырат: жана, менен, бирок, анткени, же, ошондуктан. Мисал: Ал эрте турду, бирок кечикти.",
   "Бөлүкчө — сөзгө кошумча маани берет: гана, эле, да, бекен, эч. Мисал: Бул ишти Айгерим гана аткарды.",
   "Жандооч — зат атооч менен келип, мамилени билдирет: менен, үчүн, жөнүндө, чейин, кийин, сыяктуу. Мисал: Сабактан кийин үйгө келдим.",
   "Модалдык сөз — сүйлөөчүнүн мамилесин билдирет: албетте, балким, менимче, кыскасы. Андан кийин үтүр коюлат: Албетте, жардам берем."]],
 ["Ээ жана баяндооч","Сүйлөмдүн баш мүчөлөрү — ээ жана баяндооч.",
  ["Ээ — ким? эмне? суроосуна жооп берет, сүйлөм ал жөнүндө айтылат. Мисал: Биз Ысык-Көлгө бардык.",
   "Баяндооч — эмне кылды? эмне кылат? кандай? ким? суроосуна жооп берип, ээ жөнүндө кабар берет. Көбүнчө сүйлөмдүн аягында турат.",
   "Жөнөкөй ээ/баяндооч бир сөздөн турат (барды, кооз). Татаал ээ/баяндооч эки же андан көп сөздөн турат (Чыңгыз Айтматов, окуй баштады)."]],
 ["Атоочтук баяндооч. Ээ менен баяндоочтун ээрчишүүсү","Баяндооч этиш менен гана эмес, атоочтор менен да берилет.",
  ["Атоочтук баяндооч: зат атооч (Атам — врач), сын атооч (Мугалимибиз адилеттүү), сан атооч (Инилерим экөө), ат атооч (Бул китеп — меники).",
   "Ээ менен баяндооч жак жана сан боюнча ээрчишет: Мен барам — Биз барабыз — Сен барасың — Силер барасыңар.",
   "Орун тартиби: ээ сүйлөмдүн башында, баяндооч аягында турат.",
   "Ээ менен баяндооч экөө тең атооч болуп, баяндоочто жак мүчөсү жок болсо, ортосуна сызыкча (—) коюлат: Апам — мугалим. Жак мүчөсү болсо, сызыкча коюлбайт: Мен окуучумун."]],
 ["Тууранды сөздөр","Табияттагы үндү же кыймыл-абалды туурап айтылган сөздөр.",
  ["Үн тууранды сөздөр: шар-шар, шылдыр, дүңгүр, күр-шар.",
   "Кыймыл-абал, көрүнүш тууранды сөздөр: жарк-журк, мөлт-мөлт, жалт, тып.",
   "Тууранды сөздөн этиш жасалат: шылдыр → шылдырайт, ызы → ызылдайт, жымың → жымыңдайт, шар → шарылдайт.",
   "Кош жана кайталанган тууранды сөздөр сызыкча менен жазылат: дыбыр-дыбыр, жарк-журк. «Этти», «деди» менен бөлөк жазылат: жарк этти."]],
 ["Сырдык сөздөр. Себепти билдирүү","Сырдык сөздөр адамдын сезимин, ички абалын билдирет.",
  ["Кубаныч, макtoo: пай-пай, бали, баракелде, ура. Таң калуу, коркуу, өкүнүү: ой, кокуй, апей.",
   "Айбанаттарга карата айтылуучулар: кучу-кучу (ит), пыш-пыш (мышык), тү-тү (тоок), чү (ат).",
   "Сырдык сөздөн кийин үтүр, сүйлөмдүн аягында көбүнчө илеп белгиси коюлат: Пай-пай, кандай кооз!",
   "Себеп «Эмне үчүн? Эмне себептен?» суроосуна жооп берет: …үчүн, …-гандыктан, …себептен. Мисал: Жем жок болгондуктан куштар учуп кетти."].map(s=>s.replace("макtoo","мактоо"))],
 ["Маек, диалог, монолог. Тексттин түзүлүшү","Оозеки жана жазуу кебинин түрлөрү.",
  ["Диалог — эки же андан көп адамдын сүйлөшүүсү. Ар бир реплика жаңы саптан сызыкча менен башталат.",
   "Монолог — бир адамдын өз оюн ырааттуу айтуусу (баяндама, доклад).",
   "Суроого толук жооп: суроодогу сөздөрдү колдонуп, толук сүйлөм менен жооп бергиле. Эмне үчүн мөмө пайдалуу? — Мөмөдө витамин көп болгондуктан пайдалуу.",
   "Тексттин түзүлүшү: башталышы (тема киргизилет) → негизги бөлүгү (биринчиден, экинчиден…) → жыйынтыгы (демек, ошентип…)."]],
 ["Сүйлөмдүн түрлөрү. Сөз тартиби. Жалаң жана жайылма сүйлөм","Сүйлөмдөр айтылыш максатына жана түзүлүшүнө карай бөлүнөт.",
  ["Айтылыш максатына карай: жай сүйлөм (.), суроолуу сүйлөм (?), илептүү сүйлөм (!).",
   "Жалаң сүйлөм — ээ менен баяндоочтон гана турат: Мода өзгөрөт.",
   "Жайылма сүйлөм — айкындооч мүчөлөрү бар: Мода жыл сайын тез өзгөрөт.",
   "Сөз тартиби: ээ — башында, баяндооч — аягында, аныктооч аныкталуучусунун алдында турат: Апам базардан жаңы көйнөк алды."]],
 ["Кемтик сүйлөм. Рецензия","Кемтик сүйлөмдө бир же бир нече мүчө айтылбайт, бирок мааниси түшүнүктүү.",
  ["Кемтик сүйлөм көбүнчө диалогдо колдонулат: — Качан барасың? — Эртең. (Мен эртең барам.)",
   "Толук сүйлөмдө бардык керектүү мүчөлөр бар: Мен эртең театрга барам.",
   "Рецензиянын түзүлүшү: 1) жалпы маалымат (аталышы, автору, режиссёру); 2) мазмуну; 3) актёрлордун оюнуна баа; 4) музыка, декорация; 5) жыйынтык жана сунуш."]]
],8:[
 ["Жандооч сөздөр","Жандоочтор зат атооч же ат атооч менен келип, мейкиндик, мезгил, себеп, максат мамилесин билдирет.",
  ["Мейкиндик: аркылуу, боюнча, жакын, тарапка. Мисал: Боом капчыгайы аркылуу өттүк.",
   "Мезгил: чейин, кийин, бери. Мисал: Кечке чейин тоодо болдук.",
   "Себеп-максат: үчүн, жөнүндө, тууралуу. Мисал: Таш-Рабат жөнүндө окудук.",
   "Жандооч өзүнөн мурунку сөздөн бөлөк жазылат: досум менен, сабактан кийин."]],
 ["Ээ, баяндооч жана айкындооч мүчөлөр","Баш мүчөлөр (ээ, баяндооч) жана айкындооч мүчөлөр (аныктооч, толуктооч, бышыктооч).",
  ["Аныктооч — кандай? кайсы? канча? кимдин? Мисал: мээримдүү апам, эки китеп.",
   "Толуктооч — кимди? эмнени? кимге? эмнеге? ким менен? Мисал: апама белек алдым.",
   "Бышыктооч — качан? кайда? кантип? эмне үчүн? Мисал: кечинде, үйдө, тез.",
   "Белгилөө: ээ — бир сызык, баяндооч — эки сызык, аныктооч — толкун сызык, толуктооч — үзүк сызык, бышыктооч — чекит-сызык."]],
 ["Аныктооч","Аныктооч заттын белгисин билдирет жана аныкталуучусунун алдында турат.",
  ["Суроолору: кандай? кайсы? канча? кимдин? эмненин?",
   "Сын атооч: кызыктуу кесип. Сан атооч: үч дарыгер, биринчи күн. Ат атооч: менин кыялым, бул жумуш. Атоочтук: иштеген адам.",
   "Сан атоочтон кийинки зат атооч көптүк мүчөсүз колдонулат: эки курулушчу (эки курулушчулар эмес)."]],
 ["Атоочтук. Мезгил жана орун бышыктооч","Атоочтук — этиштин сын атоочко окшош формасы.",
  ["Атоочтук -ган/-ген/-кан/-кен мүчөсү менен жасалат жана аныктооч болот: сайраган чымчык, тоодо жашаган илбирс.",
   "Мезгил бышыктооч — качан? кайсы мезгилде? Мисал: кышында, эртең менен, былтыр.",
   "Орун бышыктооч — кайда? кайдан? Мисал: тоодо, токойдо, көлдүн жээгинде."]],
 ["Ден соолук: дарыгерде жана дарыканада","Дарыгер менен сүйлөшүүдө так жана сылык сүйлөө керек.",
  ["Арыз айтуу: Менин башым ооруйт. Температурам көтөрүлдү.",
   "Сылык суроо-өтүнүч: «-ыңыз/-иңиз» формасы: Бул дарыны күнүнө үч жолу ичиңиз.",
   "Кайрылуу сөздөн кийин үтүр коюлат: Дарыгер, башым ооруп жатат."]],
 ["Иш кагазы: буйрутма","Буйрутма — товарга же кызматка расмий заказ берүүчү иш кагазы.",
  ["Түзүлүшү: кимге → кимден → аталышы «Буйрутма» → мазмуну (эмне, канча, качанга чейин) → дата жана кол тамга.",
   "Расмий стиль колдонулат: «…суранабыз», «…жеткириңиздер», «Урматтоо менен».",
   "Сан атоочтон кийин зат атооч жекелик санда: беш кап, эки пакет."]],
 ["Салыштыруу. Бышыктооч","Нерселерди салыштырууда сын атоочтун даражалары жана -дай/-дей мүчөсү колдонулат.",
  ["Салыштырма даража: -ыраак/-ирээк/-ураак/-үрөөк: кызыктуураак, жакшыраак. «караганда» менен: китеп тасмага караганда кызыктуу.",
   "Күчөтмө даража: эң, абдан: эң жакшы китеп.",
   "Окшоштуруу: -дай/-дей/-тай/-тей: булбулдай сайрайт.",
   "Бышыктооч түрлөрү: мезгил (кечинде), орун (театрда), кыймыл-сын (тез, кызыгуу менен)."]]
]};
window.RL=RL;
function ruleBox(n,ui){const r=RL[n]&&RL[n][ui];if(!r)return null;const box=h("div","rulebox");box.hidden=true;
  box.append(h("b",null,"📘 Эреже: "+r[0]),h("p",null,r[1]));const ul=h("ul");r[2].forEach(x=>ul.append(h("li",null,x)));box.append(ul);return box}

/* ---------- wrap exercise: rule button + last position ---------- */
const _ex=exercise;
exercise=function(n,k,ui,i,byUnit){_ex(n,k,ui,i,byUnit);LS.set("kg-last",{n,k,ui,i,byUnit:!!byUnit});
  const box=ruleBox(n,ui);if(!box)return;const bt=h("button","rulebtn","📘 Эрежени көрүү");
  bt.onclick=()=>{box.hidden=!box.hidden;bt.textContent=box.hidden?"📘 Эрежени көрүү":"📘 Эрежени жашыруу"};
  const card=app.querySelector(".card");card.before(bt,box)};
window.exercise=exercise;

/* smart feedback: when there are mistakes, point to the rule */
const _on=window.onScore;
window.onScore=function(c,t){if(_on)_on(c,t);let fb=app.querySelector(".smartfb");if(fb)fb.remove();if(c>=t)return;
  fb=h("div","smartfb");fb.append(h("span",null,"Ката бар — "+(t-c)+" жооп туура эмес. Кызыл белгиленгендерди дагы бир карап чыккыла. "));
  const box=app.querySelector(".rulebox");if(box){const b=h("button","rulebtn","📘 Эрежени окуу");b.onclick=()=>{box.hidden=false;const bt=app.querySelector(".rulebtn");if(bt)bt.textContent="📘 Эрежени жашыруу";box.scrollIntoView({behavior:"smooth",block:"center"})};fb.append(b)}
  const card=app.querySelector(".card");if(card)card.append(fb)};

/* ---------- mistake notebook (choose questions) ---------- */
let CURN=7;const _gm=gradeMenu;
gradeMenu=function(n){CURN=n;_gm(n);extendMenu(n)};window.gradeMenu=gradeMenu;
const MK="kg-mist";
function unitOfKey(){const k=window.CURKEY||"";const m=k.match(/(\d)-[gvw]-(\d+)|t-(\d)-(\d+)/);if(!m)return -1;return +(m[2]||m[4])}
const _ch=BUILD.choose;
BUILD.choose=function(ex,body){const api=_ch(ex,body);if(ex.nomist)return api;const chk=api.check;
  api.check=function(){const r=chk();const rows=[...body.querySelectorAll(".qlist > .q")],nb=LS.get(MK,[]);let changed=false;
    rows.forEach((row,j)=>{const q=ex.qs[j];if(!q)return;const wrong=row.querySelector(".opt.bad,.mcq.bad"),right=row.querySelector(".opt.ok");const ix=nb.findIndex(x=>x.q==q&&x.n==CURN);
      if(wrong&&ix<0){nb.push({q,n:CURN,u:unitOfKey()});changed=true}else if(right&&!wrong&&ix>=0){nb.splice(ix,1);changed=true}});
    if(changed)LS.set(MK,nb.slice(-300));return r};return api};
function notebook(n){
  crumb.textContent=n+"-класс · Каталар дептери";app.innerHTML="";const nb=LS.get(MK,[]).filter(x=>x.n==n);
  app.append(h("h2",null,"📕 Каталар дептери"),h("p","lead","Тесттерде жана тандоо көнүгүүлөрүндө ката кеткен суроолор ушул жерге автоматтык түрдө чогулат. Кайра туура жооп берсеңер, суроо дептерден өчөт."));
  if(!nb.length){app.append(h("p","bigok","🎉 Азырынча ката жок! Тесттерди иштеп көргүлө."));return}
  const cnt={};nb.forEach(x=>{const nm=x.u>=0&&G[n].units[x.u]?G[n].units[x.u].name:"Аралаш";cnt[nm]=(cnt[nm]||0)+1});
  const ul=h("div","mstat");Object.entries(cnt).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>{const s=h("div","mrow");s.append(h("span",null,k),h("b",null,v+" ката"));ul.append(s)});
  const bar=h("div","wbar"),go1=h("button","act","Каталарды кайра иштөө ▸ ("+Math.min(nb.length,15)+" суроо)"),cl=h("button","act alt","Дептерди тазалоо");
  go1.onclick=()=>go(()=>{crumb.textContent=n+"-класс · Каталар менен иштөө";app.innerHTML="";app.append(h("h2",null,"📕 Каталар менен иштөө"));
    window.CURKEY=null;const card=h("div","card");app.append(card);exerciseInto(card,{type:"choose",instr:"Мурун ката кеткен суроолор. Туура жоопту тандагыла.",qs:shuffle(nb.map(x=>x.q)).slice(0,15)});
    const nav=h("div","nav"),bk=h("button",null,"‹ Дептерге кайтуу");bk.onclick=()=>{stack.pop();replace(()=>notebook(n))};nav.append(bk);app.append(nav)});
  cl.onclick=()=>{if(cl.dataset.c){LS.set(MK,LS.get(MK,[]).filter(x=>x.n!=n));replace(()=>notebook(n))}else{cl.dataset.c=1;cl.textContent="Ырастоо үчүн дагы бир жолу басыңыз"}};
  bar.append(go1,cl);app.append(h("h3","dh","Кайсы темада көп ката?"),ul,bar)}

/* ---------- daily challenge + streak ---------- */
const dayNo=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*6e4)/864e5);
function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function streakInfo(n){const s=LS.get("kg-streak-"+n,{last:-9,cur:0,best:0});if(s.last<dayNo()-1)s.cur=0;return s}
function daily(n){
  crumb.textContent=n+"-класс · Күндүн чакырыгы";app.innerHTML="";const d=dayNo(),r=rng(d*10+n);
  let pool=[];G[n].units.forEach(u=>pool.push(...poolUnit(u)));pool=pool.map(q=>[r(),q]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]).slice(0,10);
  const st=streakInfo(n),done=st.last==d;
  app.append(h("h2",null,"🔥 Күндүн чакырыгы"),h("p","lead","Ар күнү бардык темалардан жаңы 10 суроо. Күн сайын аткарсаңар, «от» сериясы өсөт. "+(done?"Бүгүнкү чакырык аткарылды ✓":"")));
  const sk=h("div","streak");sk.append(h("span",null,"🔥 Серия: "+st.cur+" күн"),h("span",null,"🏆 Эң узун: "+st.best+" күн"));app.append(sk);
  const qs=pool.map(q=>q.t.replace("___","["+q.o.map(o=>o==q.a?o+"*":o).join("|")+"]"));
  const card=h("div","card");card.append(h("p","instr","Туура жоопту тандагыла, анан «Аяктоо» баскычын баскыла."));const body=h("div");card.append(body);
  window.CURKEY=null;const api=BUILD.choose({qs},body),fin=h("button","act","Аяктоо ✓"),res=h("div","fb");
  fin.onclick=()=>{const[c,t]=api.check();const s=streakInfo(n);if(s.last!=d){s.cur=(s.last==d-1?s.cur:0)+1;s.last=d;s.best=Math.max(s.best,s.cur);LS.set("kg-streak-"+n,s)}
    res.className="fb "+(c>=8?"y":"n");res.textContent="Жыйынтык: "+c+" / "+t+(c==t?" — 💎 Мыкты!":c>=8?" — Абдан жакшы!":" — Каталар дептерге кошулду, кайра иштеп көргүлө.")+"  🔥 Серия: "+s.cur+" күн";
    sk.firstChild.textContent="🔥 Серия: "+s.cur+" күн";sk.lastChild.textContent="🏆 Эң узун: "+s.best+" күн"};
  card.append(fin,res);app.append(card)}

/* ---------- flashcards with spaced repetition (Leitner 1–5) ---------- */
function cards(n){
  crumb.textContent=n+"-класс · Сөз карточкалары";app.innerHTML="";
  app.append(h("h2",null,"🃏 Сөз карточкалары"),h("p","lead","Картаны басып, маанисин көргүлө. «Билем» — сөз кийинки кутуга өтөт жана сейрек кайталанат. «Кайталайм» — сөз 1-кутуга кайтып, көп кайталанат. 5-кутуга жеткен сөз — үйрөнүлдү."));
  const us=h("select");us.append(new Option("Бардык темалар","-1"));G[n].units.forEach((u,i)=>us.append(new Option(u.n+". "+u.name,i)));
  const top=h("div","dtop");top.append(us);const card=h("div","card fcard");app.append(top,card);
  const LT=LS.get("kg-lt",{}),key=w=>n+"|"+w;
  const run=()=>{const ui=+us.value,all=[];G[n].units.forEach((u,i)=>{if(ui>=0&&ui!=i)return;const pics=Object.fromEntries(u.pic||[]);(u.v&&u.v.m||[]).forEach(([w,d])=>all.push({w,d,e:pics[w]||""}))});
    let q=shuffle(all).sort((a,b)=>(LT[key(a.w)]||1)-(LT[key(b.w)]||1)).slice(0,15),seen=0;
    const stat=()=>{const l=all.filter(x=>(LT[key(x.w)]||1)>=5).length;return"Үйрөнүлдү: "+l+" / "+all.length+"  ·  Бул сессияда: "+seen};
    const show=()=>{card.innerHTML="";if(!q.length){card.append(h("div","result",""));card.firstChild.append(h("div","n","🎉"),h("b",null,"Сессия бүттү!"),h("div",null,stat()));const ag=h("button","act","Дагы бир сессия");ag.onclick=run;card.append(ag);return}
      const x=q[0],bx=LT[key(x.w)]||1;const f=h("button","flash");f.append(x.e?h("span","fe",x.e+" "):"",x.w);let back=false;
      f.onclick=()=>{back=!back;f.classList.toggle("back",back);f.innerHTML="";if(back)f.append(x.d);else{if(x.e)f.append(h("span","fe",x.e+" "));f.append(x.w)}};
      const boxes=h("div","lboxes");for(let k=1;k<=5;k++){const s=h("span","lb"+(k==bx?" on":""),k);boxes.append(s)}
      const bar=h("div","wbar"),yes=h("button","act","✓ Билем"),no=h("button","act alt","↻ Кайталайм"),sp=h("button","act alt","🔊");
      yes.onclick=()=>{LT[key(x.w)]=Math.min(5,bx+1);LS.set("kg-lt",LT);q.shift();seen++;show()};
      no.onclick=()=>{LT[key(x.w)]=1;LS.set("kg-lt",LT);q.shift();q.splice(Math.min(3,q.length),0,x);seen++;show()};
      sp.onclick=()=>window.speakKy&&speakKy(x.w);
      bar.append(yes,no,sp);card.append(h("div","fstat",stat()),boxes,f,bar)};show()};
  us.onchange=run;run()}

/* ---------- menu & home additions ---------- */
function extendMenu(n){const r=app.querySelector(".res");if(!r)return;const st=streakInfo(n);
  [["🔥 Күндүн чакырыгы","Ар күнү 10 жаңы суроо · серия: "+st.cur+" күн","var(--bad)",()=>daily(n)],
   ["🃏 Сөз карточкалары","Билем / кайталайм — сөздөрдү аралыктуу кайталоо","var(--voc)",()=>cards(n)],
   ["📕 Каталар дептери","Ката кеткен суроолорду кайра иштөө ("+LS.get(MK,[]).filter(x=>x.n==n).length+")","var(--gram)",()=>notebook(n)]].forEach(([t,d,c,fn])=>{
    const b=h("button","rb");b.style.setProperty("--c",c);b.append(h("b",null,t),h("span",null,d));b.onclick=()=>go(fn);r.append(b)})}
const _home=home;
home=function(){_home();const L=LS.get("kg-last",null);if(!L||!G[L.n]||!G[L.n].units[L.ui]||!G[L.n].units[L.ui][L.k]||!G[L.n].units[L.ui][L.k].ex[L.i])return;
  const u=G[L.n].units[L.ui],b=h("button","contbtn");b.append(h("b",null,"▶ Калган жерден улантуу"),h("span",null,L.n+"-класс · "+u.n+"-тема · "+u.name+" · "+KN[L.k]+" "+(L.i+1)));
  b.onclick=()=>{CURN=L.n;go(()=>gradeMenu(L.n));go(()=>exercise(L.n,L.k,L.ui,L.i,L.byUnit))};app.append(b)};window.home=home;
Object.assign(window,{daily,cards,notebook});
})();
