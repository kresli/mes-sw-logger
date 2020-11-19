const broadcast = new BroadcastChannel('mes-logger-channel');
const dbReq = indexedDB.open("MES_LOGGER_STORE",1);
let db;

dbReq.onerror = function(event) {
    console.log("error: ", event);
};

dbReq.onsuccess = ((event) => {
    db = dbReq.result
});

dbReq.onupgradeneeded = function(event) {
    db = event.target.result;
    db.createObjectStore("logs", {keyPath: "id"});
}

function readAll() {
    var objectStore = db.transaction("logs").objectStore("logs");
    
    objectStore.openCursor().onsuccess = function(event) {
       var cursor = event.target.result;
       
       if (cursor) {
         //cursor continue
       } else {
          alert("No more entries!");
       }
    };
}

function getLogs() {
    return []
    // return JSON.parse(localStorage.getItem(STORAGE_KEY) || []);
}
function addLog(log) {
    // console.log("adding", log)
    db.transaction(["logs"], "readwrite")
        .objectStore("logs")
        .add(log)
}

console.log(self);
console.log(performance)

self.addEventListener('fetch', ((event)=> {
    if(!db) return;
    console.log(event.request.url)
    // const r = request.json().then()
    // console.log(JSON.parse(JSON.stringify(request)));
    addLog({id: Date.now(),  somePart: 'hello'});
    // broadcast.postMessage({payload: getLogs})
}));


// broadcast.onmessage = (event) => {
//   if (event.data && event.data.type === 'INCREASE_COUNT') {
//     broadcast.postMessage({ payload: "hi" });
//   }
// };