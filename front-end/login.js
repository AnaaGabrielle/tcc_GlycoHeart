const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem");

    // Limpa mensagens anteriores e avisa que está processando
    mensagem.textContent = "Verificando dados...";
    mensagem.style.color = "#3b82f6";

    // Cria o objeto com os dados para enviar ao backend
    const dadosLogin = {
        usuario: usuario,
        senha: senha
    };

    // Faz a requisição POST para o backend
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Avisa o back que estamos enviando JSON
        },
        body: JSON.stringify(dadosLogin) // Converte os dados em texto JSON
    })
    .then(response => {
        // Se o backend retornar um status de erro (ex: 400, 401, 500)
        if (!response.ok) {
            return response.json().then(err => { 
                throw new Error(err.erro || "Erro ao realizar login."); 
            });
        }
        return response.json(); // Se der certo, converte a resposta para JSON
    })
    .then(data => {
        // Grava os dados da sessão no navegador
        localStorage.setItem("glycoheartLogado", "true");
        localStorage.setItem("glycoheartUsuario", usuario);

        // Mensagem de sucesso vinda do backend
        mensagem.textContent = data.mensagem || "Login realizado! Entrando...";
        mensagem.style.color = "#16a34a";

        setTimeout(function () {
            window.location.href = "index.html";
        }, 500);
    })
    .catch(error => {
        // Exibe o erro exato que o seu backend gerou
        mensagem.textContent = error.message;
        mensagem.style.color = "#dc2626";
    });
});
