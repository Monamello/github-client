'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('repository_tag',
      {
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        repository_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: 'repositories',
            key: 'id'
          }
        },
        tag_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: 'tags',
            key: 'id'
          }
        },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('repository_tag');
  }
};
