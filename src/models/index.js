const Character = require('./Character');
const Movie = require('./Movie');

Character.belongsToMany(Movie, {
    as: 'movies',
    through: 'CharactersMovies',
    foreignKey: 'characterId',
    timestamps: false
});

Movie.belongsToMany(Character, {
    as: 'characters',
    through: 'CharactersMovies',
    foreignKey: 'movieId',
    timestamps: false
});