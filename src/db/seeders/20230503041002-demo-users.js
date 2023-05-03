const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const users = [];

    for (let i = 0; i < 35; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();

      users.push({
        firstName,
        lastName,
        username: faker.internet.userName(firstName, lastName).toLowerCase(),
        email: faker.internet.email(firstName, lastName, 'example.com').toLowerCase(),
        picture: 'https://placehold.co/250x250',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    return queryInterface.bulkInsert('users', users);
  },

  // eslint-disable-next-line
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('users', null, {});
  }
};
