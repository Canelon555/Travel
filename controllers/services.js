const servicesRouter = require('express').Router();
const User = require('../models/user');
const Servicio = require('../models/servicio');

// Ruta GET para obtener todos los servicios
servicesRouter.get('/', async (request, response) => {

  try {
    // Obtener todos los servicios de la base de datos
    const servicios = await Servicio.find({});
    response.status(200).json(servicios);
  } catch (error) {
    // Manejar cualquier error que ocurra durante la obtención de los servicios
    console.error('Error al obtener los servicios:', error); 
      response.status(500).json({ error: 'Error interno del servidor'});
    }
});

// Ruta POST para agregar un nuevo servicio
servicesRouter.post('/', async (request, response) => {
  try {
    // Obtener los datos del servicio del cuerpo de la solicitud
    const { name, description, price } = request.body;
    //Verificar si ya existe un servicio con el mismo nombre
    const serviceExist = await Servicio.findOne({ name, description, price });

    if (serviceExist) {
      // Si el servicio ya existe, enviar una respuesta de error
      return response.status(400).json({ error: 'El paquete ya existe' });
    }
    // Crear un nuevo servicio
    const newService = new Servicio({
      name, 
      description, 
      price, 
    });
    // Guardar el nuevo servicio en la base de datos
    const savedService = await newService.save();
    // Enviar una respuesta con el servicio guardado
    response.status(201).json(savedService);

  } catch (error) {
  // Manejar cualquier error que ocurra durante la creación del servicio
    console.error('Error al crear el paquete', error);
    response.status(500).json({ error: 'Error interno del servidor' });
  }
});

servicesRouter.delete('/:id', async (request, response) => {
  const user = request.user;
// Verificar si user está definido
  if (!user) {
    console.error('El objeto user no está definido correctamente');
    return response.status(500).send('Error interno del servidor');
  }

  try {
    // Eliminar el servicio por su ID usando mongoose
    await Servicio.findByIdAndDelete(request.params.id);

    // Filtrar las services del usuario para eliminar el servicio con el ID correspondiente
    user.services = user.services.filter(servicio => servicio._id.toString() !== request.params.id);

    // Guardar los cambios en la base de datos
    await user.save();

    return response.sendStatus(204);
  } catch (error) {
    console.error('Error al eliminar el servicio:', error);
    return response.status(500).send('Error interno del servidor');
  }
});

servicesRouter.put('/:id', async (request, response) => {
  try {
    // Obtener el ID del servicio a editar desde los parámetros de la solicitud
    const { id } = request.params;

    // Obtener los nuevos datos del servicio del cuerpo de la solicitud
    const { name, description, price } = request.body;
    // Buscar el servicio por su ID y actualizar los datos
    const updatedService = await Servicio.findByIdAndUpdate(id, { name, description, price }, { new: true });

    // Verificar si el servicio fue encontrado y actualizado correctamente
    if (!updatedService) {
      return response.status(404).json({ error: 'Servicio no encontrado' });
    }
    // Enviar una respuesta con el servicio actualizado
    response.status(200).json(updatedService);
  } catch (error) {
    // Manejar cualquier error que ocurra durante la edición del servicio
    console.error('Error al editar el servicio:', error);
    response.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = servicesRouter;