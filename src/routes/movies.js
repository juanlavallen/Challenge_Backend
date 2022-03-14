const { Router } = require('express');
const verifyToken = require('../middlewares/verify-token');

const {
    getMovies,
    getDetailMovies,
    createMovie,
    editMovie,
    deleteMovie,
    filtersMovies
} = require('../controllers/movies');

const router = Router();

// GET - Obtener Peliculas
router.get('/', verifyToken, getMovies);

// GET - Obtener Detalle de Pelicula
router.get('/detail', verifyToken, getDetailMovies);

// GET - Filtrado de Peliculas
router.get('/search', verifyToken, filtersMovies);

// POST - Crear Pelicula
router.post('/', verifyToken, createMovie);

// PUT - Actualizar Pelicula
router.put('/:id', verifyToken, editMovie);

// DELETE - Eliminar Pelicula
router.delete('/:id', verifyToken, deleteMovie);

module.exports = router;