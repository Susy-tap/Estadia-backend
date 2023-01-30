const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const {User} = require('../models');
const {passwordEmail} = require('../Utils/passwordEmail');


exports.resetPassword  = async(request, response, next) => {
    try{
        if(!request.body.email){
            response.status(400).json({error: true, message: 'Debe proporsionar el email'});
        }

        //buscar el usuario con ese Email
        const usuario = await User.findOne({ 
            where: {email: request.body.email}
            
        });

        if (!usuario){
            response.status(404).json({message: 'No existe el usuario'});
        }
        //generar el token de recupracion de contrseña
        let token = await bcrypt.hash(usuario.email + Date.now().toString(), 10);
        token = token.replace(/\//g, "-");

        //guardar el token
        usuario.passwordResetToken = token;
        usuario.passwordResetExpire = Date.now() + 3600000;

        await usuario.save();

        //enviar el Email
        const resultadoEmail = await passwordEmail(
            usuario.name,
            usuario.email,
            token
        );
        if (resultadoEmail) {
            response.json({ message: 'Un mensaje ha sido enviado al email proporcionado'});
        } else {
            response.status(503).json({
                error: true,
                message: 'Ocurrió un error al enviar el email de recuperación',
            });
        }

    }  catch (error) {
        console.log(error);
        response.status(503).json({ 
          error: true, 
          message: 'Ocurrió un error al intentar enviar el email de recuperación.',
        })
    }
};

exports.tokenValidation = async (request, response, next) => {
    try {
      // buscar el usuario con el toke, y vigencia
      const usuario = await User.findOne({
        where: {
          passwordResetToken: request.body.token,
          passwordResetExpire: {[Op.gt]: new Date() }, // el token aún le quede vida
        }
      });
  
      if (!usuario) {
        response.status(400).json({
          message: 'El link de restablecer contraseña es inválido o ha expirado.'
        });
      }
  
      // retornar un status que indique que si es válido
      response.json({
        isValid: true,
        message: 'Ingrese una nueva contraseña.',
      });
    } catch (error) {
      console.log(error);
      response.status(503).json({ message: 'Error al validar el token.' });
    }
  };

  exports.saveNewPassword = async (request, response, next) => {
    try {
      // volver a validar el toke
      const usuario = await User.findOne({
        where: {
          passwordResetToken: request.body.token,
          passwordResetExpire: {[Op.gt]: new Date() }, // el token aún le quede vida
        }
      });
  
      if (!usuario) {
        response.status(400).json({
          message: 'El link de restablecer contraseña es inválido o ha expirado.'
        });
      }
  
      // validar que se reciba la contraseña
      if (!request.body.password) {
        return response.status(400).json({ message: 'La contraseña es obligatoria.'});
      }
  
      // cifrar la contraseña
      const salt = await bcrypt.genSalt(10);
  
      // cifrar la contraseña y meterla en los datos del usuario
      usuario.password = await bcrypt.hash(request.body.password, salt);
  
      // quitar el token de recuperación
      usuario.passwordResetToken = '';
      usuario.passwordResetExpire = null;
  
      // guardamos cambios
      await usuario.save();
  
      response.json({ message: 'La nueva contraseña ha sido guardada. Inicie sesión.' });
  
    } catch (error) {
      console.log(error);
      response.status(503).json({ message: 'Error al actualizar contraseña.' });
    }
  };