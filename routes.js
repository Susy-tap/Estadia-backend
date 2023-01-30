const express = require('express');
const { grantAccess } = require('./middlewares/accessControl');
const router = express.Router();

// importar los controladores
const customersController = require('./controllers/CustomersController');



module.exports = () => {

  // definir las rutas

  // clientes
  router.post('/customers', customersController.add);
  router.get('/customers/:id', customersController.list);
  router.put('/customers/:id', customersController.update);
  router.post('/filtrar', customersController.filtrar);
  router.get('/search', customersController.search);

  return router;
};