/* Old root service worker (family tree moved to /sanjyra/). Clears old caches and removes itself. */
self.addEventListener("install",function(){self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x.indexOf("tukum-")===0}).map(function(x){return caches.delete(x)}))}).then(function(){return self.registration.unregister()}).then(function(){return self.clients.matchAll({type:"window"})}).then(function(cs){cs.forEach(function(c){c.navigate(c.url)})}))});
self.addEventListener("fetch",function(){});
