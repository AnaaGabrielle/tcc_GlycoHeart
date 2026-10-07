/// back-end/config/db.js
require('dotenv').config();
const mysql = require('mysql2/promise'); // <-- precisa ser /promise

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Teste rápido para validar a conexão ao iniciar o app
pool.getConnection()
  .then(conn => {
    console.log(`✅ Conectado com sucesso ao MySQL! (banco: ${process.env.DB_NAME})`);
    conn.release();
  })
  .catch(err => {
    console.error('❌ Erro ao conectar ao banco de dados:', err.message);
  });

module.exports = pool;
