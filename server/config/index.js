require('dotenv').config();

const PORT = process.env.PORT || 3000;

const dbConfigs = {
    development: {
        url: process.env.DEV_DATABASE_URL,
        username: process.env.DEV_USERNAME,
        password: process.env.DEV_PASSWORD,
        database: process.env.DEV_DB_NAME,
        host: process.env.HOST,
        dialect: 'postgres',
        operatorsAliases: false
    },
    test: {
        url: process.env.TEST_DATABASE_URL,
        username: process.env.TEST_USERNAME,
        password: process.env.TEST_PASSWORD,
        database: process.env.TEST_DB_NAME,
        host: process.env.HOST,
        dialect: 'postgres'
    },
    production: {
        url: process.env.DATABASES_URL,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.HOST,
        dialect: 'postgres'
    }
};

module.exports = {
    PORT,
    ...dbConfigs
};
