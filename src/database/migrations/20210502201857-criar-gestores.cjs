'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('gestores', {
      cpfFuncionario: {
        type: Sequelize.STRING(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'funcionarios',
          key: 'cpf'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    })
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('gestores');
  }
};
