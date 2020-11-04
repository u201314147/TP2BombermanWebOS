postMessage("Testing Web Workers(\'running\').");

onmessage = function (oEvent) {
  postMessage("Send " + oEvent.data);
};

function busquedaB()
{
Synapse.findServers(15, 5000, availableServersToDiv, onFinishSearch, onFailServer,ipMin,ipMin + 15, -1)

for (var i = 0; i < 256; i++) {
 
 Synapse.findServers(15, 5000, availableServersToDiv, onFinishSearch, onFailServer,ipMin,ipMin + 15, i)

}
}

function busquedaC()
{
for (var i = 0; i < 16; i++) {
 
 Synapse.findServers(15, 5000, availableServersToDiv, onFinishSearch, onFailServer,i*16,i*16 + 15, -1)

}
}