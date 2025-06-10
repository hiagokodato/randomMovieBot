import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const commonGenres = [
    'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Animation',
    'Documentary', 'Family', 'Romance', 'Fantasy', 'Adventure', 'Mystery', 'Crime'
];

const MovieRecommendationsPage = () => {
    const [selectedGenre, setSelectedGenre] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!selectedGenre) {
            toast.error('Por favor, selecione um gênero.');
            return;
        }

        setLoading(true);
        setError('');
        setMovies([]);
        const toastId = toast.loading(`Buscando filmes de ${selectedGenre}...`);

        try {
            const res = await api.get(`/api/movies/recommendations?genre=${selectedGenre}`);
            setMovies(res.data);
            toast.success(`Filmes de ${selectedGenre} carregados!`, { id: toastId });
        } catch (err) {
            console.error('Erro ao buscar filmes:', err);
            const errorMessage = err.response?.data?.message || 'Erro ao buscar filmes. Tente novamente.';
            setError(errorMessage);
            toast.error(errorMessage, { id: toastId });

            if (err.response && err.response.status === 401) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Recomendação de Filmes</h1>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-bold mb-4">Escolha um Gênero</h2>
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <select
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                        className="p-2 border rounded flex-grow"
                    >
                        <option value="">Selecione um Gênero</option>
                        {commonGenres.map(genre => (
                            <option key={genre} value={genre}>{genre}</option>
                        ))}
                    </select>
                    <button
                        onClick={handleSearch}
                        disabled={loading}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                    >
                        {loading ? 'Buscando...' : 'Buscar Filmes'}
                    </button>
                </div>
                {error && <p className="text-red-500 text-xs italic mt-2 text-center">{error}</p>}
            </div>

            {movies.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Filmes Recomendados</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {movies.map(movie => (
                            <div key={movie._id} className="border rounded-lg p-4 shadow-sm text-center">
                                {movie.poster && (
                                    <img
                                        src={movie.poster}
                                        alt={movie.title}
                                        className="w-full h-48 object-cover rounded-md mb-2"
                                        onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/150?text=Sem+Poster" }}
                                    />
                                )}
                                <h3 className="font-bold text-lg">{movie.title} ({movie.year})</h3>
                                {movie.imdb?.rating && <p className="text-sm">IMDb: {movie.imdb.rating.toFixed(1)}/10</p>}
                                <p className="text-sm text-gray-600 line-clamp-3">{movie.plot}</p>
                                <p className="text-xs text-gray-500 mt-1">{movie.genres.join(', ')}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieRecommendationsPage;