const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
//exploite les propriétés de things : const Thing = require('../models/Things');

const multer = require('../middleware/multer-config');
const stuffCtrl = require('../controllers/stuff');

router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth, multer, stuffCtrl.createThing);// l'ordre est important il faut mettre auth avant tout pour que l'authentification se fasse avant toute chose
router.get('/:id', auth, stuffCtrl.getOneThing); // /:id veut dire que l'id est dynamique
router.delete('/:id', auth, multer, stuffCtrl.deleteThing);

module.exports = router;




