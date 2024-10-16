    let Visitor_ID = getCookie('Visitor_ID');
console.log("I'm from git " + Visitor_ID)
 if (Visitor_ID === null || localStorage.getItem("Visitor_ID") == null) {
    if (Visitor_ID != null) localStorage.setItem("Visitor_ID",Visitor_ID)
    else{
    setCookie("Visitor_ID", crypto.randomUUID(), .5)
    Visitor_ID = getCookie('Visitor_ID');
    }
}
const disVisID = document.createElement("h1");
const node = document.createTextNode("This is your FingerprintJs VisitorID: " + Visitor_ID);
disVisID.appendChild(node);
document.body.appendChild(disVisID);
// document.getElementById('visitor_id').innerHTML = "This is your FingerprintJs VisitorID: " + Visitor_ID;
function setCookie(name, value, daysToLive) {
    let cookie = name + "=" + encodeURIComponent(value);
    localStorage.setItem(name,value)
    if(typeof daysToLive === "number") {
        cookie += "; max-age=" + (daysToLive*24*60*60) + ";SameSite=None;secure";
        document.cookie = cookie;
    }
}

function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for(let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if(name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}


window.addEventListener('message', function (event) {
    const allowedOrigins = ['https://muddy-hypnotic-lute.glitch.me'];

    // Only allow messages from allowed origins
    if (!allowedOrigins.includes(event.origin)) return;

    // Retrieve the stored visitor ID (if any)
    let visitorId = localStorage.getItem('Visitor_ID');

    // If no visitor ID exists, generate a new one
    if (!visitorId && event.data === 'request-visitor-id') {
        setCookie("Visitor_ID", crypto.randomUUID(), .5);
        visitorId = localStorage.getItem('Visitor_ID')
    }
    event.source.postMessage({ visitorId: visitorId }, event.origin);
}, false);
