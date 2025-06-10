const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes'); // Rotas de usuário/autenticação
const movieRoutes = require('./routes/movieRoutes'); // Novas rotas de filme

dotenv.config();
connectDB(); // Conecta ao MongoDB

const app = express();

// Configuração do CORS
const allowedOrigins = [
  'http://localhost:3000', // Frontend em desenvolvimento
  // Adicione a URL do seu frontend em produção (ex: 'https://seunome.vercel.app')
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pelo CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
}));

app.use(express.json()); // Habilita o parse de JSON

// Rotas da API
app.use('/api/users', userRoutes); // Rotas de registro e login
app.use('/api/movies', movieRoutes); // Rotas de recomendação de filmes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});