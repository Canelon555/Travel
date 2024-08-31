const express = require('express');
const paymentsRouter = express.Router();
const Payment = require('../models/payment');
const User = require('../models/user');

// paymentsRouter.get('/', async (req, res) => {
//   try {
//     const payments = await Payment.find().select('payment ref cita.service.name cita.service.description cita.date user');
//     res.json(payments);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error al obtener pagos' });
//   }
// });

  // Obtener todos los pagos de un usuario específico o todos los pagos si el usuario es administrador
  paymentsRouter.get('/', async (request, response) => {
    try {
      const user = request.user;
      let payments;

      if (user.role === 'admin') {
        payments = await Payment.find().populate('user', 'name email');
      } else {
        payments = await Payment.find({ user: user._id }).populate('user', 'name email');
      }
      return response.status(200).json(payments);
    } catch (error) {
      console.error('Error al buscar los pagos:', error);
      return response.status(500).json({ error: 'Error interno del servidor' })
    }
  });
  
  // Crear un nuevo pago
  paymentsRouter.post('/', async (request, response) => {
    try {
      const user = request.user;
      const { pay, ref, cita, service } = request.body;
      console.log(pay, ref, cita, service);
      
      const newPayment = new Payment({
        pay,
        ref,
        cita: cita._id,
        service: service._id,
        user: user._id
      });

      const savedPayment = await newPayment.save();

      user.payments.push(savedPayment._id);
      await user.save();

      response.status(200).json({ payment: savedPayment });

      setTimeout(async () => {
        savedPayment.finished = true;
        await savedPayment.save();

        const activePayments = await Payment.find({ pay: savedPayment.pay, ref: savedPayment.ref });
        if (activePayments.length === 1) {
          await Payment.updateMany({ pay: savedPayment.pay, ref: savedPayment.ref });
        }
      }, 3600000);
    } catch (error) {
      console.error('Error al guardar el pago:', error);
      response.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
  // Eliminar un pago

  paymentsRouter.delete('/:id', async (request, response) => {
    try {
      const paymentId = request.params.id;
      const payment = await Payment.findById(paymentId);
      if (!payment) {
        return response.status(404).json({ error: 'El pago no fue encontrado' });
      }

      await Payment.findByIdAndDelete(paymentId);
      return response.status(200).json({ message: 'El pago ha sido eliminado' });
    } catch (error) {
      console.error('Error al eliminar el pago:', error);
      return response.status(500).json({ error: 'Error interno del servidor' });
    }
  });

  module.exports = paymentsRouter;