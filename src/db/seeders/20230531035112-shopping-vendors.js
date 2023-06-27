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
    const vendors = [];

    for (let i = 0; i < 20; i++) {
      const vendorName = faker.company.name();
      const contactEmail = faker.internet.email({
        firstName: vendorName,
        lastName: null,
        provider: 'shopping-api.com',
      }).toLowerCase();
      const phoneNumber = faker.phone.number('###-###-####');

      vendors.push({
        name: vendorName,
        contactEmail,
        phoneNumber,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert('shopping_vendors', vendors);
  },

  // eslint-disable-next-line
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('shopping_vendors', null, {});
  }
};
