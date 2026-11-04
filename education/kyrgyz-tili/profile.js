/* Окуучунун профили: бир компьютерде бир нече окуучу. Жеке жыйынтыктар профиль боюнча өзүнчө сакталат. */
(function(){
let S;try{S=window.localStorage;S.getItem("x")}catch(e){S=null}
if(!S)return;
const P=Storage.prototype,gi=P.getItem,si=P.setItem,ri=P.removeItem;
const SHARED=/^(kgp-|kg-names|kg-teams|kg-results|kg-tests|kg-hw|g79-board)/;
const cur=()=>gi.call(S,"kgp-cur")||"";
const map=k=>{k=String(k);const p=cur();if(!p||SHARED.test(k)||!/^(kg|ky78)/.test(k))return k;return"kgp:"+p+":"+k};
P.getItem=function(k){return this===S?gi.call(this,map(k)):gi.call(this,k)};
P.setItem=function(k,v){return this===S?si.call(this,map(k),v):si.call(this,k,v)};
P.removeItem=function(k){return this===S?ri.call(this,map(k)):ri.call(this,k)};
window.PROF={
 list(){try{return JSON.parse(gi.call(S,"kgp-list")||"[]")}catch(e){return[]}},
 save(l){si.call(S,"kgp-list",JSON.stringify(l))},
 cur(){const id=cur();return this.list().find(p=>p.id==id)||null},
 use(id){si.call(S,"kgp-cur",id||"")},
 add(name){const l=this.list(),id="p"+Date.now().toString(36);l.push({id,name});this.save(l);return id},
 remove(id){const l=this.list().filter(p=>p.id!=id);this.save(l);const pre="kgp:"+id+":";for(let i=S.length-1;i>=0;i--){const k=S.key(i);if(k&&k.startsWith(pre))ri.call(S,k)}if(cur()==id)this.use("")},
 read(id,k){const raw=gi.call(S,id?"kgp:"+id+":"+k:k);try{return raw==null?null:JSON.parse(raw)}catch(e){return null}}
};
})();
