const cluster = require('cluster');
const os = require('os');
const CPUS = os.cpus();


// Se o processo iniciado for um cluster principal,
// então inicializa os eventos para monitorar e
// iniciar clusters secundários (processo filho)
if (cluster.isMaster) {
  CPUS.forEach(() => cluster.fork());
  cluster.on('listening', worker => {
    console.log(`Cluster ${worker.process.pid} conectado`);
});
  cluster.on('disconnect', worker => {
    console.log(`Cluster ${worker.process.pid} desconectado`);
});
  cluster.on('exit', worker => {
    console.log(`Cluster ${worker.process.pid} saiu do ar`);
    // Garante que um novo cluster inicie se um antigo morrer
    cluster.fork();
});
} else {
  // Se o processo iniciado for um cluster secundário, então inicia o servidor
  require('./index.js');
}