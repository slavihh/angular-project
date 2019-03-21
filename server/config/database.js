module.exports = {
    development: {
        username: 'root',
        password: "2x300699",
        database: 'server',
        host: 'localhost',
        dialect: 'mysql',
        logging: false,
        freezeTableName: true,
        operatorsAliases: false
    },
    test: {
        username: process.env.DB_TEST_USERNAME,
        password: process.env.DB_TEST_PASSWORD,
        database: process.env.DB_TEST_NAME,
        host: process.env.DB_TEST_HOSTNAME,
        dialect: process.env.DB_TEST_DIALECT,
        logging: false,
        freezeTableName: true,
        operatorsAliases: false
    },
    production: {
        username: process.env.DB_PROD_USERNAME,
        password: process.env.DB_PROD_PASSWORD,
        database: process.env.DB_PROD_NAME,
        host: process.env.DB_PROD_HOSTNAME,
        dialect: process.env.DB_PROD_DIALECT,
        logging: false,
        freezeTableName: true,
        operatorsAliases: false
    }
}

