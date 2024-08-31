const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: String,
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin' // Nombre del modelo del administrador
    }
  });

servicioSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v; 
  }
});

const Service = mongoose.model('Service', servicioSchema);

module.exports = Service;