const Thing = require('../models/Things');
const fs = require('fs');



exports.createThing = (req, res, next) => {
/*Nous devons également résoudre l'URL complète de notre image, car req.file.filename ne contient que le segment filename . 
Nous utilisons req.protocol pour obtenir le premier segment (dans notre cas 'http' ). 
Nous ajoutons '://' , puis utilisons req.get('host') pour résoudre l'hôte du serveur (ici, 'localhost:3000' ). 
Nous ajoutons finalement '/images/' et le nom de fichier pour compléter notre URL*/



  const thingObject = JSON.parse(req.body.thing); // Pour ajouter un fichier à la requête, le front-end doit envoyer les données de la requête sous la forme form-data, et non sous forme de JSON
  delete thingObject._id;
  const thing = new Thing({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));

    
  
  /*delete req.body._id; // l'id donnée est aléatoire 
    const thing = new Thing({
      ...req.body // utilisée pour avoir les informations contenues dans le corps de la requête
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'})) // necessaire pour éviter le bloquage de la page après
      .catch(error => res.status(400).json({ error }));  */
  
};






exports.getOneThing = (req, res, next) => {
    
    Thing.findOne({ _id: req.params.id /*trouve l'id*/ })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  
};






exports.modifyThing = (req, res, next) => {
  const thingObject = req.file ?
  { // s'il existe on fait les même traitements que dans post c'est à dire transformer les string en objets
    ...JSON.parse(req.body.thing),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body /* s'il n'existe pas */ };
Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Objet modifié !'}))
  .catch(error => res.status(400).json({ error }));



/*
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) // premier argument est l'id de l'objet qu'on veut modifier deuxième argument c'est le nouveau objet avec l'id aussi 
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error })); */
  
};








exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id }) // on trouve l'objet 
    .then(thing => {
      const filename = thing.imageUrl.split('/images/')[1]; // ontrouve le nom du fichier
      fs.unlink(`images/${filename}`/* on supprime le fichier avec unlink*/, /* dans le callback on supprime l'objet*/ () => {
        Thing.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};







exports.getAllStuff = (req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
    //res.status(200).json(stuff);// fait apparaitre stuff
};


