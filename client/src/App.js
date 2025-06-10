import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // Componente para exibir os toasts

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage'; // Página inicial padrão após login
import MovieRecommendationsPage from './pages/MovieRecommendationsPage'; // Sua nova página de filmes

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem('token');
      setIsAuthenticated(!!updatedToken);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div>
      <Toaster position="top-right" /> {/* Renderiza o Toaster */}
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rotas Protegidas */}
        {/* Dashboard como rota principal protegida */}
        <Route
          path="/"
          element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
        />
        {/* Página de Recomendações de Filmes protegida */}
        <Route
          path="/movies"
          element={isAuthenticated ? <MovieRecommendationsPage /> : <Navigate to="/login" />}
        />

        {/* Você pode ter uma rota Catch-all para 404, se quiser */}
        {/* <Route path="*" element={<div>Página não encontrada</div>} /> */}
      </Routes>
    </div>
  );
}

export default App;