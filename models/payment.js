const mongoose = require ('mongoose');

const paymentSchema = new mongoose.Schema({
  pay: String,
  ref: String,
  cita: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cita',
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

paymentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;