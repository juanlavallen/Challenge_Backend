const express = require('express');
const cors = require('cors');
const database = require('../config/database/connection');
const config = require('../config/config');
require('../models/index');

class Server {
    constructor() {
        this.app = express();
        this.port = config.port;
        this.paths = {
            auth: require('../routes/auth'),
            characters: require('../routes/characters'),
            movies: require('../routes/movies')
        }

        // Connection Database
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Routes App
        this.routes();
    }

    async connectDB() {
        try {
            // await database.authenticate();
            await database.sync();
            console.log('Database online!');
        } catch (err) {
            console.log(err);
        }
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes() {
        this.app.use('/auth', this.paths.auth);
        this.app.use('/characters', this.paths.characters);
        this.app.use('/movies', this.paths.movies);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening port: ${config.port}`);
        });
    }
}

module.exports = Server;