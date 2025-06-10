// frontend/src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Mantenha seus estilos CSS globais
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // <<< IMPORTANTE: Importe BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* <<< IMPORTANTE: Envolva o App com BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);