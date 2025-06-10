import React, { useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode'; // Certifique-se que o nome é jwtDecode

function DashboardPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : null;

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    toast.success('Você foi desconectado.');
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Dashboard, {user?.name || 'Usuário'}!</h1>
      <p className="mb-4">Esta é uma área protegida. Você está logado.</p>
      <nav className="mb-4">
        <ul className="flex justify-center gap-4">
          <li>
            <Link to="/movies" className="text-blue-500 hover:underline">Recomendador de Filmes</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
          </li>
        </ul>
      </nav>
      <p>Aqui você pode adicionar mais funcionalidades financeiras ou de gestão.</p>
    </div>
  );
}

export default DashboardPage;