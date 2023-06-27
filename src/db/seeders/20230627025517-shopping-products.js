const { faker } = require('@faker-js/faker');
const { getRandomNumberBetween } = require('rndjs');

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
    const products = [];
    const categoriesIds = Array.from({ length: 20 }, (_, i) => i + 1);
    const vendorsIds = Array.from({ length: 20 }, (_, i) => i + 1);

    for (let i = 0; i < 50; i++) {
      const categoryId = getRandomNumberBetween(1, categoriesIds.length);
      const vendorId = getRandomNumberBetween(1, vendorsIds.length);
      const stock = getRandomNumberBetween(0, 10);

      products.push({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock,
        shoppingVendorId: vendorId,
        shoppingCategoryId: categoryId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert('shopping_products', products);
  },

  // eslint-disable-next-line
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('shopping_products', null, {});
  }
};
