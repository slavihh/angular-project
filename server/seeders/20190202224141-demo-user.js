'use strict';

const faker = require("faker");
const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 12;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let newData = [];
        await bcrypt.hash('qwerty', BCRYPT_SALT_ROUNDS).then((hashedPassword) => {
            for (let i = 0; i < 100; i++) {
                const seedData = {
                    email: faker.internet.email(),
                    password: hashedPassword,
                    lastLogin: new Date(),
                    confirmedAt: new Date(),
                    blockedAt: new Date(),
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                newData.push(seedData);
            }
        });

        return queryInterface.bulkInsert('Users', newData);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
