const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const { protect } = require('../middleware/authMiddleware'); // Proteger essa rota

const commonGenres = [ // Gêneros comuns para validação ou exibição
    'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Animation',
    'Documentary', 'Family', 'Romance', 'Fantasy', 'Adventure', 'Mystery', 'Crime'
];

router.get('/recommendations', protect, async (req, res) => {
  const genre = req.query.genre;
  const limit = parseInt(req.query.limit) || 10;

  if (!genre) {
    return res.status(400).json({ message: 'O gênero é obrigatório para a recomendação.' });
  }
  if (!commonGenres.includes(genre)) { // Validação simples do gênero
      return res.status(400).json({ message: `Gênero inválido: ${genre}` });
  }

  try {
    const recommendedMovies = await Movie.find({
      genres: { $regex: new RegExp(genre, 'i') }
    })
    .limit(limit)
    .sort({ 'imdb.rating': -1 }) // Ordena pelos mais bem avaliados
    .select('title year plot genres poster imdb.rating runtime directors cast'); // Campos para o frontend

    if (recommendedMovies.length === 0) {
      return res.status(404).json({ message: `Nenhum filme encontrado para o gênero: ${genre}` });
    }

    res.json(recommendedMovies);
  } catch (error) {
    console.error('Erro ao buscar recomendações de filmes:', error);
    res.status(500).json({ message: 'Erro no servidor ao buscar recomendações.' });
  }
});

router.get('/genres', protect, async (req, res) => {
    try {
        // Alternativa: Se você quiser listar apenas os gêneros que têm filmes com rating alto
        // ou apenas os gêneros mais populares
        // Por simplicidade, vamos retornar uma lista fixa ou usar Movie.distinct
        // const genres = await Movie.distinct('genres');
        // res.json(genres.sort());
        res.json(commonGenres.sort()); // Retorna gêneros fixos para simplificar
    } catch (error) {
        console.error('Erro ao buscar gêneros:', error);
        res.status(500).json({ message: 'Erro ao buscar gêneros de filmes.' });
    }
});

module.exports = router;