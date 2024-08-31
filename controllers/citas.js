const express = require('express');
const citasRouter = express.Router();
const Cita = require('../models/cita');
const User = require('../models/user');

// Obtener todas las citas de un usuario específico o todas las citas si el usuario es administrador
citasRouter.get('/', async (request, response) => {
    try {
      const user = request.user;
      let citas;

      if (user.role === 'admin') {
        citas = await Cita.find().populate('user', 'name email');
      } else {
        citas = await Cita.find({ user: user._id }).populate('user', 'name email');
      }
      return response.status(200).json(citas);
    } catch (error){
        console.error('Error al buscar las reservas:', error);
        return response.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Crear una nueva cita

citasRouter.post('/', async (request, response) => {
  try {
    const user = request.user;
    const { date, pay, ref, service, totalPrice } = request.body;
    console.log(date, pay, ref, service, totalPrice);

    // Verificar si la referencia ya está en uso
    const citaRefExists = await Cita.findOne({ ref });
    if (citaRefExists) {
      return response.status(400).json({ error: 'La referencia ya está en uso. Por favor, elige otra.' });
    }

    // Verificar si la fecha seleccionada ha alcanzado el límite máximo de 10 citas
    const citasConFecha = await Cita.find({ date, pay, reservada: true });
    if (citasConFecha.length >= 10) {
      return response.status(400).json({ error: 'La fecha seleccionada ha alcanzado el límite máximo de 10 citas. Por favor, elige otra.' });
    }

    // // Verificar si la cita existe y está reservada
    // const citaExists = await Cita.findOne({ date });
    // if (citaExists && citaExists.reservada) {
    //   return response.status(400).json({ error: 'La fecha seleccionada no está disponible. Por favor, elige otra.' });
    // }

    const newCita = new Cita({
      date,
      pay,
      ref,
      service,
      totalPrice,
      user: user._id,
      reservada: true
    });

    const savedCita = await newCita.save();

    user.citas.push(savedCita._id);
    await user.save();

    response.status(200).json({ cita: savedCita });

    setTimeout(async () => {
        savedCita.finished = true;
        await savedCita.save();

        const activeCitas = await Cita.find({ date: savedCita.date, pay: savedCita.pay, ref: savedCita.ref, reservada: true });
        if (activeCitas.length === 1) {
            await Cita.updateMany({ date: savedCita.date, pay: savedCita.pay, ref: savedCita.ref }, { reservada: false });
        }
    }, 3600000);

  } catch (error) {
    console.error('Error al guardar la cita:', error);
    response.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Eliminar una cita
citasRouter.delete('/:id', async (request, response) => {
  try {
      const citaId = request.params.id;
      const cita = await Cita.findById(citaId);
      if (!cita) {
          return response.status(404).json({ error: 'La reserva no fue encontrada' });
      }

      await Cita.findByIdAndDelete(citaId);
      return response.status(200).json({ message: 'La reserva ha sido eliminada exitosamente' });
  } catch (error) {
      console.error('Error al eliminar la reserva:', error);
      return response.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = citasRouter;