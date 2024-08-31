require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const servicesRouter = require('./controllers/services');
const citasRouter = require('./controllers/citas');
const paymentsRouter = require('./controllers/payments');
const agendaRouter = require('./controllers/agenda');
const { userExtractor } = require('./middleware/auth');
const logoutRouter = require('./controllers/logout');
const { MONGO_URI } = require('./config');

(async() => {

try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectado a Mongo DB');
} catch (error) {
    console.log(error);
}
})();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Rutas frontend
app.use('/',  express.static(path.resolve('views', 'home')));
app.use('/signup',  express.static(path.resolve('views', 'signup')));
app.use('/login',  express.static(path.resolve('views', 'login')));
app.use('/todos',  express.static(path.resolve('views', 'todos')));
app.use('/admin',  express.static(path.resolve('views', 'admin')));
app.use('/reservar',  express.static(path.resolve('views', 'reservar')));
app.use('/reservaciones',  express.static(path.resolve('views', 'reservaciones')));
app.use('/pago',  express.static(path.resolve('views', 'pago')));
app.use('/components',  express.static(path.resolve('views', 'components')));
app.use('/images',  express.static(path.resolve('img')));
app.use('/verify/:id/:token',  express.static(path.resolve('views', 'verify')));

app.use(morgan('tiny'));

// Rutas backend
app.use('/api/users/', usersRouter);
app.use('/api/login/', loginRouter);
app.use('/api/logout/', logoutRouter);
app.use('/api/agenda/', agendaRouter);
app.use('/api/services/', userExtractor, servicesRouter);
app.use('/api/citas/', userExtractor, citasRouter);
app.use('/api/payments/', userExtractor, paymentsRouter);

module.exports = app;