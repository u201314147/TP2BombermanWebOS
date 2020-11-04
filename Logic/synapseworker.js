postMessage("Testing Web Workers(\'ejemplo\').");

onmessage = function (oEvent) {
  postMessage("Hola " + oEvent.data);
};

function busqueda()
{
Synapse.findServers(15, 5000, availableServersToDiv, onFinishSearch, onFailServer,ipMin,ipMin + 15, -1)

for (var i = 0; i < 256; i++) {
 
 Synapse.findServers(15, 5000, availableServersToDiv, onFinishSearch, onFailServer,ipMin,ipMin + 15, i)

}
}