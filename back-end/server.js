const express = require('express');
const cors = require('cors'); // 1. Importa o CORS para liberar o Front
const routes = require('./routes/route'); // Ajuste o caminho se necessário

const app = express();

// 2. Configura o CORS para aceitar requisições do seu Frontend
// Se o seu front rodar em outra porta (ex: Live Server na 5500), mude aqui embaixo
app.use(cors({
    origin: '*', // Permite qualquer origem (ideal para desenvolvimento do TCC)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Middleware obrigatório para o Back conseguir ler o JSON enviado pelo seu login.js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Suas rotas
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor backend rodando na porta ${PORT}`);
});
