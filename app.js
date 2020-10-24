// avec express on peut utiliser des middleware qui permettent de capturer les requêtes pour pouvoir gérer précisément le fonctionnement du serveur
//exécution des middleware dans l'ordre ne pas oublier de next !!!!!!!!!!!!
const express = require('express');

const mongoose = require('mongoose');// connecte avec mongoose

const stuffRoutes = require('./routes/stuff');

const userRoutes = require('./routes/user');
// permet des transformer du format json à objet js
const bodyParser = require('body-parser');


const path = require('path');


// permet de créer une app express
const app = express();
// faut mettre juste en dessous de app
// connection à la base de données
mongoose.connect('mongodb+srv://youyou:123@cluster0.ipdij.mongodb.net/backend?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// le next indique qu'il va passer le flambeau à un autre middleware, il faut mettre next() à la fin pour faire cela 
// sert à donner les droits d'accès aussi pour éviter les erreurs du CORS qui surviennent quand le serveur et le client n'ont pas la même origine
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// pour que le parser soit utilisé dans le reste
app.use(bodyParser.json());

//indique les routes à suivre
app.use('/api/stuff', stuffRoutes);

app.use('/api/auth', userRoutes);


app.use('/images', express.static(path.join(__dirname, 'images'))); // repond aux requêtes avec /images
// permet aux autres fichiers du serveur d'accéder à l'app
module.exports = app;