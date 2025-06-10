const mongoose = require('mongoose');
const dotenv = require('dotenv'); // Importar dotenv novamente aqui, pois este arquivo será usado independentemente

dotenv.config(); // Carregar variáveis de ambiente aqui também, para garantir

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erro ao conectar ao MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;