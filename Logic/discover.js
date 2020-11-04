var listAvailableServers = [];

function entablishConnection(e) {
    $(location).attr("href", "./Game/menu.html?url=" + e)
}

function availableServersToDiv(e, name) {
    if (e && e.includes(":") && e.includes(".") && name.includes("+"))  {
        var nombre = name.split('+')[1];
        listAvailableServers.push(e);
        var t = e.split(":")[1].split("."),
            n = '<button class="btn-server" type="button" id="' + (e + 2) + '" class="buttonPr" onclick="entablishConnection(\'' + e + "');\" >" + ("Sala " + nombre) + "</button><br>";
        document.getElementById("availableServers").innerHTML += n
    }
}
var findIpBtimer = 0;
var findIpB = -1;
function onFinishSearch() {
    document.getElementById("box-loading").style.opacity = "0";
    findIpBtimer = findIpBtimer +1;
    if(findIpBtimer> 255)
    {
        findIpBtimer = findIpBtimer=0;
        findIpB= findIpB+1;
    
    findServers()

    }
}

var ip = "";
function obtenerIpNavegador()
{
     var RTCPeerConnection = /*window.RTCPeerConnection ||*/ window.webkitRTCPeerConnection || window.mozRTCPeerConnection;  
if (RTCPeerConnection)(function() {  
    var rtc = new RTCPeerConnection({  
        iceServers: []  
    });  
    if (1 || window.mozRTCPeerConnection) {  
        rtc.createDataChannel('', {  
            reliable: false  
        });  
    };  
    rtc.onicecandidate = function(evt) {  
        if (evt.candidate) grepSDP("a=" + evt.candidate.candidate);  
    };  
    rtc.createOffer(function(offerDesc) {  
        grepSDP(offerDesc.sdp);  
        rtc.setLocalDescription(offerDesc);  
    }, function(e) {  
        console.warn("offer failed", e);  
    });  
    var addrs = Object.create(null);  
    addrs["0.0.0.0"] = false;  
  
    function updateDisplay(newAddr) {  
        if (newAddr in addrs) return;  
        else addrs[newAddr] = true;  
        var displayAddrs = Object.keys(addrs).filter(function(k) {  
            return addrs[k];  
        });  
     ip = displayAddrs[0] || "n/a";  
     console.log(ip);
    }  
  
    function grepSDP(sdp) {  
        var hosts = [];  
        sdp.split('\r\n').forEach(function(line) {  
            if (~line.indexOf("a=candidate")) {  
                var parts = line.split(' '),  
                    addr = parts[4],  
                    type = parts[7];  
                if (type === 'host') updateDisplay(addr);  
            } else if (~line.indexOf("c=")) {  
                var parts = line.split(' '),  
                    addr = parts[2];  
                updateDisplay(addr);  
            }  
        });  
    }  
})();  
else {  
    //ip = "<code>ifconfig| grep inet | grep -v inet6 | cut -d\" \" -f2 | tail -n1</code>";  

}
}
function enableLoading() {
    var e = document.getElementById("btn-reload");
    e.className += e.className.replace("disabled", ""), e.disabled = !1;
    var t = document.getElementById("btn-refresh");
    t.className += " disabled", t.disabled = !0, document.getElementById("box-loading").style.opacity = "1"
}

function hideLoading() {
    document.getElementById("box-loading").style.opacity = "0"
}
var Synapse = new window.Synapse(8080);

var myWorker = new Worker("Logic/synapseworker.js");

myWorker.onmessage = function (oEvent) {
  console.log("Mensaje worker : " + oEvent.data);
};

myWorker.postMessage("running");

function findServers() {


if(findIpB==-1)
    enableLoading(); 

if(findIpB==-1)
Synapse.findServers(255, 5000, availableServersToDiv, onFinishSearch, onFinishSearch,0,255, -1, ip)

if(findIpB>=0)
Synapse.findServers(255, 5000, availableServersToDiv, onFinishSearch, onFinishSearch,0,255, findIpB, ip)

}

function renderLitleStars() {
    for (var e = "", t = 0; t < littleStars.length; t++) e += '<div class="litle-star" style="top: ' + littleStars[t].top + "%;left: " + littleStars[t].left + '%;"></div>';
    document.getElementById("body").innerHTML += e
}

function renderStars() {
    for (var e = "", t = 0; t < stars.length; t++) e += '<img class="star" style="top: calc(' + stars[t].top + "% - 23px); left: calc(" + stars[t].left + '% - 24px);"></img>';
    document.getElementById("body").innerHTML += e
}
$(document).ready(function() {
    obtenerIpNavegador();
    hideLoading();
    var e = document.getElementById("btn-refresh");
    e.className += " disabled", e.disabled = !0;
    var t = document.getElementById("btn-reload");
    t.className += " disabled", t.disabled = !0, renderStars(), renderLitleStars(), setTimeout(function() {
        var e = document.getElementById("btn-refresh");
        e.disabled = !1, e.className = e.className.replace("disabled", "enabled")
    }, 2e3)
});