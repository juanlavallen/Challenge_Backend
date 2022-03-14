const { Op } = require('sequelize');
const Character = require('../models/Character');
const Movie = require('../models/Movie');

const getMovies = async (req, res) => {
    const movies = await Movie.findAll({
        attributes: ['title', 'img', 'createdAt']
    });

    res.status(200).json({ movies });
}

const getDetailMovies = async (req, res) => {
    const movies = await Movie.findAll({
        include: {
            model: Character,
            as: 'characters'
        }
    });

    res.status(200).json({ movies });
}

const filtersMovies = async (req, res) => {
    let movies;
    try {
        if (req.query.title) {
            movies = await Movie.findAll({
                where: {
                    title: { [Op.substring]: req.query.title }
                }
            });
        }

        if (req.query.order === 'ASC') {
            movies = await Movie.findAll({
                order: [['createdAt', 'DESC']]
            });
        } else {
            movies = await Movie.findAll({
                order: [['createdAt', 'ASC']]
            });
        }

        res.status(200).json({ movies });

    } catch (err) {
        console.log(err);
        return res.status(404).json({
            msg: 'Pelicula no encontrada'
        });
    }
}

const createMovie = async (req, res) => {
    const { title, qualification, img } = req.body;

    // Verificando si la pelicula ya existe en DB - Cambiar por un middleware
    const verifyMovie = await Movie.findOne({ title });
    if (verifyMovie) {
        return res.status(400).json({
            msg: `La pelicula ${title} ya existe`
        });
    }

    try {
        const movie = Movie.build({ title, qualification, img });
        await movie.save();

        res.status(201).json({ movie });

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            msg: 'Ocurrio un error al crear la pelicula'
        });
    }
}

const editMovie = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const movie = await Movie.findByPk(id);
        if (!movie) {
            return res.status(404).json({
                msg: `La pelicula ${id} no existe`
            });
        }

        await movie.update(body);
        res.status(200).json({ movie });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Ocurrio un error al actualizar la pelicula'
        });
    }
}

const deleteMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findByPk(id);
        if (!movie) {
            return res.status(404).json({
                msg: `La pelicula ${id} no existe`
            });
        }

        // await character.update({ status: false });
        await movie.destroy();
        res.status(200).json({ msg: 'Pelicula eliminada' });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Ocurrio un error al eliminar la pelicula'
        });
    }
}

module.exports = {
    getMovies,
    getDetailMovies,
    filtersMovies,
    createMovie,
    editMovie,
    deleteMovie
}