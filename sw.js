var C="tukum-v34";
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(["./","index.html","map.html","manifest.webmanifest","icon-192.png","icon-512.png"])}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
  if(e.request.method!=="GET")return;if(new URL(e.request.url).pathname.indexOf("/education/")===0)return;
  e.respondWith(caches.open(C).then(function(c){return c.match(e.request,{ignoreSearch:true}).then(function(hit){
    var net=fetch(e.request).then(function(r){if(r&&(r.ok||r.type==="opaque"))c.put(e.request,r.clone());return r}).catch(function(){return hit});
    return hit||net})}))});
