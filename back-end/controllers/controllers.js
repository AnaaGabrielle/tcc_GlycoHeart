const db = require('../config/db'); // Certifique-se de que o caminho aponta para o seu db.js

const loginUsuario = async (req, res) => {
    try {
        const { usuario, senha } = req.body; 

        if (!usuario || !senha) {
            return res.status(400).json({ erro: "Usuário e senha são obrigatórios!" });
        }

        // Busca o usuário no banco de dados MySQL
        // Nota: Substitua 'usuarios' pelo nome exato da sua tabela se for diferente
        const [rows] = await db.query('SELECT * FROM usuarios WHERE usuario = ? AND senha = ?', [usuario, senha]);

        // Se o banco de dados retornar alguma linha, significa que achou o usuário com a senha certa
        if (rows.length > 0) {
            return res.status(200).json({ 
                mensagem: "Login realizado com sucesso!",
                usuario: usuario 
            });
        } else {
            // Se não retornar nada, as credenciais estão erradas
            return res.status(401).json({ erro: "Usuário ou senha incorretos." });
        }

    } catch (error) {
        console.error("Erro no servidor ao conectar ao banco:", error);
        return res.status(500).json({ erro: "Erro interno no servidor ao tentar logar." });
    }
};

module.exports = {
    loginUsuario
};
