const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: { type: Number },
    plot: { type: String },
    genres: { type: [String] }, // Array de strings para gêneros
    poster: { type: String }, // URL do pôster
    imdb: {
        rating: { type: Number },
        votes: { type: Number }
    }
}, { collection: 'movies' }); // IMPORTANTE: Mapeia para a coleção 'movies' no sample_mflix

module.exports = mongoose.model('Movie', MovieSchema);