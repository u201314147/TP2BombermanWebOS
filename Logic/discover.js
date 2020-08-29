var listAvailableServers = [];

function entablishConnection(e) {
    $(location).attr("href", "./Game/menu.html?url=" + e)
}

function availableServersToDiv(e, name) {
    if (e && e.includes(":") && e.includes(".") && name.includes("+")) {
        var nombre = name.split('+')[1];
        listAvailableServers.push(e);
        var t = e.split(":")[1].split("."),
            n = '<button class="btn-server" type="button" id="' + (e + 2) + '" class="buttonPr" onclick="entablishConnection(\'' + e + "');\" >" + ("Sala " + nombre) + "</button><br>";
        document.getElementById("availableServers").innerHTML += n
    }
}

function onFinishSearch() {
    document.getElementById("box-loading").style.opacity = "0"
}

function enableLoading() {
    var e = document.getElementById("btn-reload");
    e.className += e.className.replace(" disabled", ""), e.disabled = !1;
    var t = document.getElementById("btn-refresh");
    t.className += " disabled", t.disabled = !0, document.getElementById("box-loading").style.opacity = "1"
}

function hideLoading() {
    document.getElementById("box-loading").style.opacity = "0"
}
var Synapse = new window.Synapse(8080);

function findServers() {


    enableLoading(); 

Synapse.findServers(15, 5000, availableServersToDiv, onFinishSearch, onFinishSearch,0,255, -1)

/*for (var i = 1; i < 255; i++) {
 
 Synapse.findServers(15, 5000, availableServersToDiv, onFinishSearch, onFinishSearch,0,15, i)
}

enableLoading(); 
*/
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
    hideLoading();
    var e = document.getElementById("btn-refresh");
    e.className += " disabled", e.disabled = !0;
    var t = document.getElementById("btn-reload");
    t.className += " disabled", t.disabled = !0, renderStars(), renderLitleStars(), setTimeout(function() {
        var e = document.getElementById("btn-refresh");
        e.disabled = !1, e.className = e.className.replace("disabled", "enabled")
    }, 2e3)
});