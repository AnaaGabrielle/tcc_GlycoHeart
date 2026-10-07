const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers'); // Certifique-se de que o caminho até a pasta controllers está correto

// Rota que o login.js vai chamar via POST
router.post('/login', controllers.loginUsuario);

module.exports = router;
