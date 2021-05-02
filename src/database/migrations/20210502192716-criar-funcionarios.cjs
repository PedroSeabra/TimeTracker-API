'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('funcionarios', {
      cpf: {
        type: Sequelize.STRING(11),
        allowNull: false,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      dataCadastro: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      senha: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
      }
    })
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('funcionarios');
  }
};
