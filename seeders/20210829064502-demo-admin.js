'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const saltRounds = await bcrypt.genSalt(10);
    const hashingPassword = await bcrypt.hash('passwordadmin', saltRounds);
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: uuidv4(),
          fullname: 'Admin WaysBucks',
          email: 'adminwaysbucks@gmail.com',
          password: hashingPassword,
          image: 'http://localhost:3001/images/admin.png',
          status: 'admin',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {},
};
