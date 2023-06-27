const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const categories = [];

    while (categories.length < 20) {
      const categoryName = faker.commerce.productAdjective();
      const alreadyExists = categories.filter((category) => category.name === categoryName).length;

      if (!alreadyExists) {
        categories.push({
          name: categoryName,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    return queryInterface.bulkInsert('shopping_categories', categories);
  },

  // eslint-disable-next-line
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('shopping_categories', null, {});
  }
};
