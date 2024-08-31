const loginRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

loginRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const userExist = await User.findOne({ email: email });

  if (!userExist) {
    return response.status(400).json({ error: 'correo o contraseña incorrectos' });
  }

  if (!userExist.verified) {
    return response.status(400).json({ error: 'Tu correo no ha sido verificado' });
  }

  const isCorrect = await bcrypt.compare(password, userExist.passwordHash);

  if (!isCorrect) {
    return response.status(400).json({ error: 'correo o contraseña incorrectos' });
  };

  const userForToken = {
    id: userExist.id,
  }

  const accesToken = jwt.sign(userForToken, process.env.ACCES_TOKEN_SECRET, {
    expiresIn: '1d'
  });

  response.cookie('accesToken', accesToken, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  });

  return response.status(200).json(userExist);

});

module.exports = loginRouter;