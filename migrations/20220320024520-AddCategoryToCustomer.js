'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Customers', 'categoryId',
      { 
        type: Sequelize.INTEGER,
        references:{
          model: 'Categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        defaultValue: null,
        after: 'sewer',
      }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Customers', 'categoryId'),

    ]);

  }
};
