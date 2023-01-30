const { Customer } = require('../models');
const { Op } = require('sequelize');

//post
exports.add = async(req, res, next) => {
  try{
    const clienteData = {...req.body};

    const customer = await Customer.create(clienteData);
    res.json({
      message: "Cliente registrado.",
      customer,
    });
  
  } catch(error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al leer clientes',
    });
  }
};


  exports.list = async(req, res, next) => {
  try {
    const customers = await Customer.findAll({
      include: ['category'],
    });
    res.json(customers);

  } catch(error) {
    console.log(error)
    res.status(500).json({
      message: 'Error al leer clientes',
    });
  }
};

  exports.filtrar  = async(req, res, next) => {
    try{
      const customers = await Customer.findAll({
        where: {
          categoryId: req.body.category,
        },
        include: ['category'],
      });
      res.json({resultados: customers});
  
    } catch(error) {
      console.log(error)
      res.status(500).json({
        message: 'Error al leer clientes',
      });
    }
  };

  exports.search  = async(req, res, next) => {
  try {
    console.log(req.query);
    const customers = await Customer.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${req.query.q.toLowerCase()}%`
              },
            },
          {
            direction: {
              [Op.like]: `%${req.query.q.toLowerCase()}%`
              },
            },
          {
            toma: {
              [Op.like]: `%${req.query.q.toLowerCase()}%`
              },
            
            },
            {
              amount: {
                [Op.like]: `%${req.query.q.toLowerCase()}%`
                },
              
              },
              {
                sewer: {
                  [Op.like]: `%${req.query.q.toLowerCase()}%`
                  },
                },
          ] 
        },
        include: ['category'],
    });
    res.json({resultados: customers});

  } catch(error) {
    console.log(error);
    res.status(500).json({
    message: 'Error al leer clientes',
    });
  }
};

exports.update = async (req, res, next) => {
  try {

      const customersupdate = await Customer.findByPk(req.params.id);
      if (!customersupdate) { // si no hay cliente
          res.status(404).json({ mensaje: 'No se encontró al cuidadano.' });
      } else {

          // actualizar el objeto cliente
          Object.keys(req.body).forEach((propiedad) => {
              customersupdate[propiedad] = req.body[propiedad];
          });

          await customersupdate.save();
          res.json({ mensaje: 'El cuidadano fue actualizado.' });

      }
  } catch (error) {
      console.log(error);
      let errores = [];
      if (error.errors) {
          errores = error.errors.map(errorItem => ({
              campo: errorItem.path,
              error: errorItem.message,
          }));
      }

      res.status(503).json({ error: true, mensaje: 'Error al registrar al ciudadano', errores });
  }
};






