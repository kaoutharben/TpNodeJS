const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);


// create server sert à créer le serveur en utilisant une requete et une réponse
/*const server = http.createServer((req, res) => {
    res.end('9owd 3liya 7ambak');
});*/
// server.listen sert à indiquer le port que le serveur doit écouter, process.env.PORT donne un port si 3000 n'est pas dispo
//server.listen(process.env.PORT || 3000);
// nodemon sert à faire en sorte que le serveur exécute les modifications en temps réel




