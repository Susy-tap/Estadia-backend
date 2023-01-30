'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Customer.belongsTo(models.Category, {
        as: 'category',
        foreingKey: 'categoryId',
      });
    }
  }
  
  Customer.init({ 
    name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg: 'El nombre del cliente no puede quedar vacío'
        }
      }
    }, 
    direction:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg: 'El campo no puede quedar vacío'
        }
      }
    },
    toma: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg: 'El campo no puede quedar vacío'
        }
      }
    },
    amount: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg: 'El campo no puede quedar vacío'
        }
      }
    },
    sewer: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg: 'El campo  no puede quedar vacío'
        }
      }
    },

    categoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};