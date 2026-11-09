document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("loginForm");
    const mensagem = document.getElementById("mensagem");
    const campoUsuario = document.getElementById("usuario");
    const campoSenha = document.getElementById("senha");

    if (!formulario || !mensagem || !campoUsuario || !campoSenha) {
        console.error("Elementos do login não encontrados.");
        return;
    }

    formulario.addEventListener("submit", (event) => {
        event.preventDefault();

        const usuario = campoUsuario.value.trim();
        const senha = campoSenha.value;

        if (usuario === "admin" && senha === "1234") {
            mensagem.textContent = "Login realizado! Entrando...";
            mensagem.style.color = "green";

            localStorage.setItem("glycoheartLogado", "true");

            window.location.href = "./index.html";
        } else {
            mensagem.textContent = "Usuário ou senha incorretos!";
            mensagem.style.color = "red";
        }
    });
});