const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
//exploite les propriétés de things : const Thing = require('../models/Things');

const multer = require('../middleware/multer-config');
const stuffCtrl = require('../controllers/stuff');

router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth, multer, stuffCtrl.createThing);// l'ordre est important il faut mettre auth avant tout pour que l'authentification se fasse avant toute chose
router.get('/:id', auth, stuffCtrl.getOneThing); // /:id veut dire que l'id est dynamique
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, multer, stuffCtrl.deleteThing);

module.exports = router;




/*



// sert à envoyer des infos à la bd
router.post('/', );



// pour modifier une objet 
router.put('/:id', (req, res, next) => {
    
  });

  
// supprimer un objet 
router.delete('/:id', (req, res, next) => {
    
  });  
  
  
  
// pour trouver un objet avec son id
router.get('/:id', (req, res, next) => { // :id montre que le id est dynamique
  });


// sert à donner une réponse si on ne l'utilise pas on aura une erreur c'est une middleware
// montre les objets de la db
router.get('/', (req, res, next) => { // /api/stuff indique la route à suivre 
    
  });

*/