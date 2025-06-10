import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-hot-toast';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    let toastId;

    if (password !== confirmPassword) {
      const validationError = 'As senhas não coincidem!';
      setError(validationError);
      toast.error(validationError);
      setLoading(false);
      return;
    }

    try {
      toastId = toast.loading('Registrando...');
      await api.post('/api/users/register', {
        name,
        email,
        password,
      });

      toast.success('Usuário registrado com sucesso! Faça login.', { id: toastId });
      navigate('/login');

    } catch (err) {
      console.error('Erro de registro:', err.response ? err.response.data : err.message);
      const errorMessage = err.response?.data?.message || 'Erro ao registrar. Tente novamente.';
      setError(errorMessage);
      toast.error(errorMessage, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nome:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Senha:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirmar Senha:</label>
            <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" disabled={loading}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:opacity-50">
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
          </div>
          {error && <p className="text-red-500 text-xs italic mt-4 text-center">{error}</p>}
        </form>
        <p className="text-center text-gray-600 text-sm mt-4">Já tem uma conta? <Link to="/login" className="text-blue-500 hover:text-blue-700">Faça login aqui</Link></p>
      </div>
    </div>
  );
}

export default RegisterPage;