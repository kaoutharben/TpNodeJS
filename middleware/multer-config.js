const multer = require('multer');
// type d'extensions
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images'); // si tout marche bien le callback est null
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');// on retire les espaces on met à la place des _
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');// single pour que le fichier soit unique non pas un groupe de fichiers