const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.add = async (request, response, next) => {
  try {
    // validar que venga la contraseña
    if (!request.body.password) {
      response.status(400).json({ message: 'La contraseña es obligatoria.'});
      next();
    }

    const datosUsuario = {...request.body};

    // asegurar la contraseña
    // usar bcrypt
    // salt: generacion de una cadena aleatoria de N longitud
    const salt = await bcrypt.genSalt(10);

    // cifrar la contraseña y meterla en los datos del usuario
    datosUsuario.password = await bcrypt.hash(datosUsuario.password, salt);

    // registrar el usuario
    const user = await User.create(datosUsuario);

    user.password = null; // evitar enviarlo en la respuesta

    response.json({ message: 'El usuario ha sido registrado.', user});
  } catch (error) {
    console.log(error);
  
    let errores = [];
    if (error.errors) {
      errores = error.errors.map( errorItem => ({ 
        campo: errorItem.path,
        error: errorItem.message,
      }));
    }

    response.json({ error: true, mensaje: 'Error al registrar el usuario', errores });
  }
};