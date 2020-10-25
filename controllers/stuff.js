const Thing = require('../models/Things');
const fs = require('fs');



exports.createThing = (req, res, next) => {




  const thingObject = JSON.parse(req.body.file); // Pour ajouter un fichier à la requête, le front-end doit envoyer les données de la requête sous la forme form-data, et non sous forme de JSON
  delete thingObject._id;
  const thing = new Thing({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));

    
};






exports.getOneThing = (req, res, next) => {
    
    Thing.findOne({ _id: req.params.id /*trouve l'id*/ })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  
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


