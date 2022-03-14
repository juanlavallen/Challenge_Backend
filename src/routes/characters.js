const { Router } = require('express');
const verifyToken = require('../middlewares/verify-token');

const {
    getCharacters,
    getDetailsCharacters,
    filtersCharacters,
    createCharacter,
    editCharacter,
    deleteCharacter
} = require('../controllers/characters');

const router = Router();

// GET - Obtener Personajes
router.get('/', verifyToken, getCharacters);

// GET - Obtener Detalle del Personaje
router.get('/detail', verifyToken, getDetailsCharacters);

// GET - Filtrado de Personaje
router.get('/search/', verifyToken, filtersCharacters);

// POST - Crear Personaje
router.post('/', verifyToken, createCharacter);

// PUT - Actualizar Personaje
router.put('/:id', verifyToken, editCharacter);

// DELETE - Eliminar Personaje
router.delete('/:id', verifyToken, deleteCharacter);

module.exports = router;