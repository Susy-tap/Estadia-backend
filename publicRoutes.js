const express = require('express');

const router = express.Router();

const sesionController = require('./controllers/SesionController');
const usersController = require('./controllers/UsersController');
const passwordController = require('./controllers/PasswordController');

module.exports = function() {
  // rutas que no requieren autenticacion
  router.post('/login', sesionController.login);
  router.post('/signup', usersController.add);
  router.post('/recuperar-password', passwordController.resetPassword);
  router.post('/validar-token', passwordController.tokenValidation);
  router.post('/actualizar-password', passwordController.saveNewPassword);

  return router;
};