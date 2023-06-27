/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('shopping_products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      stock: {
        type: Sequelize.INTEGER,
      },
      shoppingVendorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'shopping_vendors',
          key: 'id',
        },
      },
      shoppingCategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'shopping_categories',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  // eslint-disable-next-line
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('shopping_products');
  },
};
