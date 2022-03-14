const { Op } = require('sequelize');
const Character = require('../models/Character');
const Movie = require('../models/Movie');

const getCharacters = async (req, res) => {
    const characters = await Character.findAll({
        attributes: ['name', 'img']
    });

    res.status(200).json({ characters });
}

const getDetailsCharacters = async (req, res) => {
    const characters = await Character.findAll({
        include: {
            model: Movie,
            as: 'movies',
            attributes: { exclude: ['characterId'] }
        }
    });

    res.status(200).json({ characters });
}

const filtersCharacters = async (req, res) => {
    let character;
    try {
        if (req.query.name) {
            character = await Character.findAll({
                where: {
                    name: { [Op.substring]: req.query.name }
                }
            });
        }

        if (req.query.age) {
            character = await Character.findAll({
                where: {
                    age: { [Op.substring]: req.query.age }
                }
            });
        }

        if (req.query.weight) {
            character = await Character.findAll({
                where: {
                    weight: { [Op.substring]: req.query.weight }
                }
            });
        }

        if (req.query.movies) {
            character = await Character.findAll({
                include: [{
                    model: Movie,
                    as: 'movies',
                    where: {
                        id: req.query.movies
                    }
                }]
            });
        }

        res.status(200).json({ character });

    } catch (err) {
        console.log(err);
        return res.status(404).json({
            msg: 'Personaje no encontrado'
        });
    }
}

const createCharacter = async (req, res) => {
    const { name, age, weight, img, history } = req.body;

    // Verificando si el personaje ya existe en DB - Cambiar por un middleware
    const verifyCharacter = await Character.findOne({ name });
    if (verifyCharacter) {
        return res.status(400).json({
            msg: `El personaje ${name} ya existe`
        });
    }

    try {
        const character = Character.build({ name, age, weight, img, history });
        await character.save();

        res.status(201).json({ character });

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            msg: 'Ocurrio un error al crear el personaje'
        });
    }
}

const editCharacter = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const character = await Character.findByPk(id);
        if (!character) {
            return res.status(404).json({
                msg: `El personaje ${id} no existe`
            });
        }

        await character.update(body);
        res.status(200).json({ character });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Ocurrio un error al actualizar el personaje'
        });
    }
}

const deleteCharacter = async (req, res) => {
    const { id } = req.params;
    try {
        const character = await Character.findByPk(id);
        if (!character) {
            return res.status(404).json({
                msg: `El personaje ${id} no existe`
            });
        }

        // await character.update({ status: false });
        await character.destroy(); 
        res.status(200).json({ msg: 'Personaje eliminado' });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Ocurrio un error al eliminar el personaje'
        });
    }
}

module.exports = {
    getCharacters,
    getDetailsCharacters,
    filtersCharacters,
    createCharacter,
    editCharacter,
    deleteCharacter
} 