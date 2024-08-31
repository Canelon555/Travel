const mongoose = require('mongoose');

const agendaSchema = new mongoose.Schema({
  fecha: String,
  cliente: String,
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin' // Nombre del modelo del administrador
  },
});

agendaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Agenda = mongoose.model('Agenda', agendaSchema);

module.exports = Agenda;