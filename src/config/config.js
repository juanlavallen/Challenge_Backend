const dotenv = require('dotenv');

const envFile = dotenv.config();
if (!envFile) {
    throw new Error('No se encontro el archivo .env');
}

module.exports = {
    "database": process.env.DB_NAME,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "host": process.env.DB_HOST,
    "port": process.env.PORT,
}
