'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sale', {
      id: { 
        type: Sequelize.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      saller_id: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references: {
          model: 'users',
          key: 'id'
        }
      },
      total_price: {
        type: Sequelize.DECIMAL,
        allowNull: false, 
      },
      delivery_address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      delivery_number: {
        type: Sequelize.STRING
      },
      sale_date: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.INTEGER
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sales')
  }
};
