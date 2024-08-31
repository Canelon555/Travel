const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwordHash: String,
  verified: {
    type: Boolean,
    default: false
  },
  citas: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Cita'
  }],
  role: {
    type: String,
    enum: ['user', 'admin', 'cliente'],
    default: 'user'
  }
});

userSchema.set('toJSON', {
  transform: (document, retunedObject) => {
    retunedObject.id = retunedObject._id.toString();
    delete retunedObject._id;
    delete retunedObject.__v;
    delete retunedObject.passwordHash;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;