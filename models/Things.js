const mongoose = require('mongoose');
// required pour montrer que le champs est obligatoire
const thingSchema = mongoose.Schema({
  
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  
});
// expoter est necessaire pour pouvoir utliser le schéma 
module.exports = mongoose.model('Things', thingSchema);
