/* =========================================================
   GLYCOHEART
   SISTEMA PRINCIPAL
========================================================= */


/* =========================================================
   BANCO DE DADOS LOCAL
========================================================= */

let dados = JSON.parse(
    localStorage.getItem("glycoheart")
) || {
    glicemias: [],
    pressoes: [],
    alimentacoes: [],
    medicamentos: [],
    perfil: {}
};


/* =========================================================
   GARANTIR ESTRUTURA DOS DADOS
========================================================= */

if (!Array.isArray(dados.glicemias)) {
    dados.glicemias = [];
}

if (!Array.isArray(dados.pressoes)) {
    dados.pressoes = [];
}

if (!Array.isArray(dados.alimentacoes)) {
    dados.alimentacoes = [];
}

if (!Array.isArray(dados.medicamentos)) {
    dados.medicamentos = [];
}

if (!dados.perfil) {
    dados.perfil = {};
}


/* =========================================================
   SALVAR DADOS
========================================================= */

function salvarDados() {

    localStorage.setItem(
        "glycoheart",
        JSON.stringify(dados)
    );

}


/* =========================================================
   ELEMENTOS
========================================================= */

const telaLogin =
    document.getElementById("telaLogin");

const aplicacao =
    document.getElementById("aplicacao");

const formLogin =
    document.getElementById("formLogin");

const mostrarSenha =
    document.getElementById("mostrarSenha");

const criarContaBtn =
    document.getElementById("criarContaBtn");

const modalCadastro =
    document.getElementById("modalCadastro");

const fecharCadastro =
    document.getElementById("fecharCadastro");

const formCadastro =
    document.getElementById("formCadastro");

const sairBtn =
    document.getElementById("sairBtn");

const esqueciSenha =
    document.getElementById("esqueciSenha");

const notificacao =
    document.getElementById("notificacao");

const notificacaoTexto =
    document.getElementById("notificacaoTexto");

const notificacaoIcone =
    document.getElementById("notificacaoIcone");


/* =========================================================
   NOTIFICAÇÃO
========================================================= */

let notificacaoTimer;

function notificar(
    mensagem,
    icone = "✓"
) {

    notificacaoTexto.textContent =
        mensagem;

    notificacaoIcone.textContent =
        icone;

    notificacao.classList.add(
        "mostrar"
    );

    clearTimeout(
        notificacaoTimer
    );

    notificacaoTimer =
        setTimeout(function() {

            notificacao.classList.remove(
                "mostrar"
            );

        }, 3000);

}


/* =========================================================
   VERIFICAR LOGIN
========================================================= */

function verificarLogin() {

    const usuario =
        JSON.parse(
            localStorage.getItem(
                "glycoheartUsuario"
            )
        );

    const loginAtivo =
        localStorage.getItem(
            "glycoheartLogin"
        );

    if (
        usuario &&
        loginAtivo === "true"
    ) {

        telaLogin.classList.add(
            "oculta"
        );

        aplicacao.style.display =
            "block";

        carregarUsuario();

    } else {

        telaLogin.classList.remove(
            "oculta"
        );

        aplicacao.style.display =
            "none";

    }

}


/* =========================================================
   CARREGAR USUÁRIO
========================================================= */

function carregarUsuario() {

    const usuario =
        JSON.parse(
            localStorage.getItem(
                "glycoheartUsuario"
            )
        );

    if (!usuario) {
        return;
    }

    const nome =
        usuario.nome || "Usuário";

    const email =
        usuario.email || "";

    document.getElementById(
        "nomeTopo"
    ).textContent = nome;

    document.getElementById(
        "emailTopo"
    ).textContent = email;

    document.getElementById(
        "tituloBoasVindas"
    ).textContent =
        "Bem-vindo, " +
        nome +
        " 👋";

    document.getElementById(
        "avatarUsuario"
    ).textContent =
        nome.charAt(0).toUpperCase();

}


/* =========================================================
   MOSTRAR / ESCONDER SENHA
========================================================= */

mostrarSenha.addEventListener(
    "click",
    function() {

        const campo =
            document.getElementById(
                "loginSenha"
            );

        if (
            campo.type ===
            "password"
        ) {

            campo.type =
                "text";

            this.textContent =
                "🙈";

        } else {

            campo.type =
                "password";

            this.textContent =
                "👁️";

        }

    }
);


/* =========================================================
   LOGIN
========================================================= */

formLogin.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const email =
            document
                .getElementById(
                    "loginEmail"
                )
                .value
                .trim()
                .toLowerCase();

        const senha =
            document
                .getElementById(
                    "loginSenha"
                )
                .value;

        const lembrar =
            document.getElementById(
                "lembrarLogin"
            ).checked;

        const usuario =
            JSON.parse(
                localStorage.getItem(
                    "glycoheartUsuario"
                )
            );


        if (!usuario) {

            notificar(
                "Crie uma conta primeiro.",
                "⚠️"
            );

            return;
        }


        if (
            email !==
            usuario.email ||
            senha !==
            usuario.senha
        ) {

            notificar(
                "E-mail ou senha incorretos.",
                "❌"
            );

            return;
        }


        localStorage.setItem(
            "glycoheartLogin",
            "true"
        );


        if (lembrar) {

            localStorage.setItem(
                "glycoheartLembrar",
                "true"
            );

        } else {

            localStorage.removeItem(
                "glycoheartLembrar"
            );

        }


        telaLogin.classList.add(
            "oculta"
        );

        aplicacao.style.display =
            "block";


        carregarUsuario();

        atualizarTela();


        document.getElementById(
            "loginSenha"
        ).value = "";


        notificar(
            "Login realizado com sucesso!",
            "🔐"
        );

    }
);


/* =========================================================
   ABRIR CADASTRO
========================================================= */

criarContaBtn.addEventListener(
    "click",
    function() {

        modalCadastro.classList.add(
            "ativo"
        );

    }
);


/* =========================================================
   FECHAR CADASTRO
========================================================= */

fecharCadastro.addEventListener(
    "click",
    function() {

        modalCadastro.classList.remove(
            "ativo"
        );

    }
);


/* =========================================================
   FECHAR MODAL CLICANDO FORA
========================================================= */

modalCadastro.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            modalCadastro
        ) {

            modalCadastro.classList.remove(
                "ativo"
            );

        }

    }
);


/* =========================================================
   CADASTRAR CONTA
========================================================= */

formCadastro.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const nome =
            document
                .getElementById(
                    "cadastroNome"
                )
                .value
                .trim();


        const email =
            document
                .getElementById(
                    "cadastroEmail"
                )
                .value
                .trim()
                .toLowerCase();


        const senha =
            document
                .getElementById(
                    "cadastroSenha"
                )
                .value;


        const confirmar =
            document
                .getElementById(
                    "confirmarSenha"
                )
                .value;


        if (nome.length < 2) {

            notificar(
                "Digite seu nome completo.",
                "⚠️"
            );

            return;

        }


        if (senha.length < 6) {

            notificar(
                "A senha precisa ter pelo menos 6 caracteres.",
                "⚠️"
            );

            return;

        }


        if (
            senha !==
            confirmar
        ) {

            notificar(
                "As senhas não são iguais.",
                "❌"
            );

            return;

        }


        const usuarioExistente =
            JSON.parse(
                localStorage.getItem(
                    "glycoheartUsuario"
                )
            );


        if (
            usuarioExistente &&
            usuarioExistente.email ===
            email
        ) {

            notificar(
                "Já existe uma conta com este e-mail.",
                "⚠️"
            );

            return;

        }


        const novoUsuario = {

            nome: nome,

            email: email,

            senha: senha

        };


        localStorage.setItem(
            "glycoheartUsuario",
            JSON.stringify(
                novoUsuario
            )
        );


        dados.perfil.nome =
            nome;

        dados.perfil.email =
            email;

        salvarDados();


        modalCadastro.classList.remove(
            "ativo"
        );


        formCadastro.reset();


        document.getElementById(
            "loginEmail"
        ).value =
            email;


        document.getElementById(
            "loginSenha"
        ).value =
            "";


        notificar(
            "Conta criada! Faça login para continuar.",
            "✅"
        );

    }
);


/* =========================================================
   ESQUECI SENHA
========================================================= */

esqueciSenha.addEventListener(
    "click",
    function() {

        notificar(
            "A recuperação de senha ainda não está disponível neste protótipo.",
            "ℹ️"
        );

    }
);


/* =========================================================
   SAIR
========================================================= */

sairBtn.addEventListener(
    "click",
    function() {

        const confirmar =
            confirm(
                "Deseja realmente sair da conta?"
            );


        if (!confirmar) {
            return;
        }


        localStorage.removeItem(
            "glycoheartLogin"
        );


        aplicacao.style.display =
            "none";

        telaLogin.classList.remove(
            "oculta"
        );


        document.getElementById(
            "loginSenha"
        ).value = "";


        mostrarPagina(
            "inicio"
        );


        notificar(
            "Você saiu da conta.",
            "🚪"
        );

    }
);


/* =========================================================
   NAVEGAÇÃO
========================================================= */

function mostrarPagina(id) {

    const paginas =
        document.querySelectorAll(
            ".pagina"
        );

    const botoes =
        document.querySelectorAll(
            ".nav-btn"
        );


    paginas.forEach(
        function(pagina) {

            pagina.classList.remove(
                "ativa"
            );

        }
    );


    botoes.forEach(
        function(botao) {

            botao.classList.remove(
                "ativo"
            );

        }
    );


    const pagina =
        document.getElementById(id);


    const botao =
        document.querySelector(
            `.nav-btn[data-pagina="${id}"]`
        );


    if (pagina) {

        pagina.classList.add(
            "ativa"
        );

    }


    if (botao) {

        botao.classList.add(
            "ativo"
        );

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    atualizarTela();

}


/* =========================================================
   BOTÕES DE NAVEGAÇÃO
========================================================= */

document
    .querySelectorAll(
        ".nav-btn"
    )
    .forEach(
        function(botao) {

            botao.addEventListener(
                "click",
                function() {

                    mostrarPagina(
                        this.dataset.pagina
                    );

                }
            );

        }
    );


/* =========================================================
   AÇÕES RÁPIDAS
========================================================= */

document
    .querySelectorAll(
        ".acao-rapida"
    )
    .forEach(
        function(botao) {

            botao.addEventListener(
                "click",
                function() {

                    mostrarPagina(
                        this.dataset.pagina
                    );

                }
            );

        }
    );


/* =========================================================
   GLICEMIA
========================================================= */

document
    .getElementById(
        "formGlicemia"
    )
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const valor =
                Number(
                    document.getElementById(
                        "valorGlicemia"
                    ).value
                );


            const momento =
                document.getElementById(
                    "momentoGlicemia"
                ).value;


            if (
                !valor ||
                valor <= 0
            ) {

                notificar(
                    "Digite um valor válido.",
                    "⚠️"
                );

                return;

            }


            dados.glicemias.push({

                id:
                    Date.now(),

                valor:
                    valor,

                momento:
                    momento,

                data:
                    new Date()
                        .toLocaleString(
                            "pt-BR"
                        )

            });


            salvarDados();


            this.reset();


            atualizarTela();


            notificar(
                "Glicemia registrada!",
                "🩸"
            );

        }
    );


/* =========================================================
   PRESSÃO
========================================================= */

document
    .getElementById(
        "formPressao"
    )
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const sistolica =
                Number(
                    document.getElementById(
                        "sistolica"
                    ).value
                );


            const diastolica =
                Number(
                    document.getElementById(
                        "diastolica"
                    ).value
                );


            const frequencia =
                Number(
                    document.getElementById(
                        "frequencia"
                    ).value
                );


            if (
                !sistolica ||
                !diastolica ||
                !frequencia
            ) {

                notificar(
                    "Preencha todos os campos.",
                    "⚠️"
                );

                return;

            }


            dados.pressoes.push({

                id:
                    Date.now(),

                sistolica:
                    sistolica,

                diastolica:
                    diastolica,

                frequencia:
                    frequencia,

                data:
                    new Date()
                        .toLocaleString(
                            "pt-BR"
                        )

            });


            salvarDados();


            this.reset();


            atualizarTela();


            notificar(
                "Pressão registrada!",
                "❤️"
            );

        }
    );


/* =========================================================
   ALIMENTAÇÃO
========================================================= */

document
    .getElementById(
        "formAlimentacao"
    )
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const refeicao =
                document.getElementById(
                    "tipoRefeicao"
                ).value;


            const alimentos =
                document.getElementById(
                    "alimentos"
                ).value.trim();


            if (!alimentos) {

                notificar(
                    "Digite os alimentos consumidos.",
                    "⚠️"
                );

                return;

            }


            dados.alimentacoes.push({

                id:
                    Date.now(),

                refeicao:
                    refeicao,

                alimentos:
                    alimentos,

                data:
                    new Date()
                        .toLocaleString(
                            "pt-BR"
                        )

            });


            salvarDados();


            this.reset();


            atualizarTela();


            notificar(
                "Refeição registrada!",
                "🍎"
            );

        }
    );


/* =========================================================
   MEDICAMENTOS
========================================================= */

document
    .getElementById(
        "formMedicamento"
    )
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const nome =
                document.getElementById(
                    "nomeMedicamento"
                ).value.trim();


            const horario =
                document.getElementById(
                    "horarioMedicamento"
                ).value;


            if (
                !nome ||
                !horario
            ) {

                notificar(
                    "Preencha todos os campos.",
                    "⚠️"
                );

                return;

            }


            dados.medicamentos.push({

                id:
                    Date.now(),

                nome:
                    nome,

                horario:
                    horario,

                data:
                    new Date()
                        .toLocaleString(
                            "pt-BR"
                        )

            });


            salvarDados();


            this.reset();


            atualizarTela();


            notificar(
                "Medicamento cadastrado!",
                "💊"
            );

        }
    );


/* =========================================================
   PERFIL
========================================================= */

document
    .getElementById(
        "formPerfil"
    )
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const nome =
                document.getElementById(
                    "nomeUsuario"
                ).value.trim();


            const email =
                document.getElementById(
                    "emailUsuario"
                ).value.trim();


            const nascimento =
                document.getElementById(
                    "nascimentoUsuario"
                ).value;


            if (!nome) {

                notificar(
                    "Digite seu nome.",
                    "⚠️"
                );

                return;

            }


            dados.perfil = {

                nome:
                    nome,

                email:
                    email,

                nascimento:
                    nascimento

            };


            const usuario =
                JSON.parse(
                    localStorage.getItem(
                        "glycoheartUsuario"
                    )
                );


            if (usuario) {

                usuario.nome =
                    nome;

                usuario.email =
                    email;

                localStorage.setItem(
                    "glycoheartUsuario",
                    JSON.stringify(
                        usuario
                    )
                );

            }


            salvarDados();


            carregarUsuario();


            notificar(
                "Perfil atualizado!",
                "✅"
            );

        }
    );


/* =========================================================
   EXCLUIR REGISTRO
========================================================= */

function excluirRegistro(
    tipo,
    id
) {

    const confirmar =
        confirm(
            "Deseja excluir este registro?"
        );


    if (!confirmar) {
        return;
    }


    dados[tipo] =
        dados[tipo].filter(
            function(item) {

                return item.id !== id;

            }
        );


    salvarDados();

    atualizarTela();


    notificar(
        "Registro excluído.",
        "🗑️"
    );

}


/* =========================================================
   ESCAPAR HTML
========================================================= */

function escaparHTML(texto) {

    return String(texto)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   ATUALIZAR TELA
========================================================= */

function atualizarTela() {


    /* =========================
       DATA
    ========================== */

    const hoje =
        new Date();

    document.getElementById(
        "dataAtual"
    ).textContent =
        hoje.toLocaleDateString(
            "pt-BR",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        );


    /* =========================
       GLICEMIA ATUAL
    ========================== */

    const glicemiaAtual =
        document.getElementById(
            "glicemiaAtual"
        );


    if (
        dados.glicemias.length > 0
    ) {

        const ultima =
            dados.glicemias[
                dados.glicemias.length - 1
            ];


        glicemiaAtual.textContent =
            ultima.valor +
            " mg/dL";

    } else {

        glicemiaAtual.textContent =
            "--";

    }


    /* =========================
       PRESSÃO ATUAL
    ========================== */

    const pressaoAtual =
        document.getElementById(
            "pressaoAtual"
        );


    if (
        dados.pressoes.length > 0
    ) {

        const ultima =
            dados.pressoes[
                dados.pressoes.length - 1
            ];


        pressaoAtual.textContent =
            ultima.sistolica +
            "/" +
            ultima.diastolica;

    } else {

        pressaoAtual.textContent =
            "--";

    }


    /* =========================
       CONTADORES
    ========================== */

    document.getElementById(
        "totalRefeicoes"
    ).textContent =
        dados.alimentacoes.length;


    document.getElementById(
        "totalMedicamentos"
    ).textContent =
        dados.medicamentos.length;


    document.getElementById(
        "relGlicemia"
    ).textContent =
        dados.glicemias.length;


    document.getElementById(
        "relPressao"
    ).textContent =
        dados.pressoes.length;


    document.getElementById(
        "relRefeicoes"
    ).textContent =
        dados.alimentacoes.length;


    document.getElementById(
        "relMedicamentos"
    ).textContent =
        dados.medicamentos.length;


    document.getElementById(
        "resumoGlicemia"
    ).textContent =
        dados.glicemias.length;


    document.getElementById(
        "resumoPressao"
    ).textContent =
        dados.pressoes.length;


    document.getElementById(
        "resumoRefeicoes"
    ).textContent =
        dados.alimentacoes.length;


    document.getElementById(
        "resumoMedicamentos"
    ).textContent =
        dados.medicamentos.length;


    /* =========================
       CONTADORES DOS HISTÓRICOS
    ========================== */

    document.getElementById(
        "contadorGlicemia"
    ).textContent =
        dados.glicemias.length +
        (
            dados.glicemias.length === 1
                ? " registro"
                : " registros"
        );


    document.getElementById(
        "contadorPressao"
    ).textContent =
        dados.pressoes.length +
        (
            dados.pressoes.length === 1
                ? " registro"
                : " registros"
        );


    document.getElementById(
        "contadorAlimentacao"
    ).textContent =
        dados.alimentacoes.length +
        (
            dados.alimentacoes.length === 1
                ? " registro"
                : " registros"
        );


    document.getElementById(
        "contadorMedicamentos"
    ).textContent =
        dados.medicamentos.length +
        (
            dados.medicamentos.length === 1
                ? " registro"
                : " registros"
        );


    /* =========================
       LISTA GLICEMIA
    ========================== */

    const listaGlicemia =
        document.getElementById(
            "listaGlicemia"
        );


    listaGlicemia.innerHTML =
        "";


    if (
        dados.glicemias.length === 0
    ) {

        listaGlicemia.innerHTML =
            `
            <div class="vazio">
                Nenhuma glicemia registrada.
            </div>
            `;

    } else {

        dados.glicemias
            .slice()
            .reverse()
            .forEach(
                function(item) {

                    listaGlicemia.innerHTML +=
                        `
                        <div class="registro">

                            🩸

                            <strong>
                                ${escaparHTML(item.valor)}
                                mg/dL
                            </strong>

                            <br>

                            Momento:
                            ${escaparHTML(item.momento)}

                            <small>
                                ${escaparHTML(item.data)}
                            </small>

                            <button
                                class="btn-excluir"
                                onclick="excluirRegistro('glicemias', ${item.id})"
                                title="Excluir"
                            >
                                🗑️
                            </button>

                        </div>
                        `;

                }
            );

    }


    /* =========================
       LISTA PRESSÃO
    ========================== */

    const listaPressao =
        document.getElementById(
            "listaPressao"
        );


    listaPressao.innerHTML =
        "";


    if (
        dados.pressoes.length === 0
    ) {

        listaPressao.innerHTML =
            `
            <div class="vazio">
                Nenhuma pressão registrada.
            </div>
            `;

    } else {

        dados.pressoes
            .slice()
            .reverse()
            .forEach(
                function(item) {

                    listaPressao.innerHTML +=
                        `
                        <div class="registro">

                            ❤️

                            <strong>
                                ${escaparHTML(item.sistolica)}/${escaparHTML(item.diastolica)}
                                mmHg
                            </strong>

                            <br>

                            Frequência:
                            ${escaparHTML(item.frequencia)}
                            bpm

                            <small>
                                ${escaparHTML(item.data)}
                            </small>

                            <button
                                class="btn-excluir"
                                onclick="excluirRegistro('pressoes', ${item.id})"
                                title="Excluir"
                            >
                                🗑️
                            </button>

                        </div>
                        `;

                }
            );

    }


    /* =========================
       LISTA ALIMENTAÇÃO
    ========================== */

    const listaAlimentacao =
        document.getElementById(
            "listaAlimentacao"
        );


    listaAlimentacao.innerHTML =
        "";


    if (
        dados.alimentacoes.length === 0
    ) {

        listaAlimentacao.innerHTML =
            `
            <div class="vazio">
                Nenhuma refeição registrada.
            </div>
            `;

    } else {

        dados.alimentacoes
            .slice()
            .reverse()
            .forEach(
                function(item) {

                    listaAlimentacao.innerHTML +=
                        `
                        <div class="registro">

                            🍎

                            <strong>
                                ${escaparHTML(item.refeicao)}
                            </strong>

                            <br>

                            ${escaparHTML(item.alimentos)}

                            <small>
                                ${escaparHTML(item.data)}
                            </small>

                            <button
                                class="btn-excluir"
                                onclick="excluirRegistro('alimentacoes', ${item.id})"
                                title="Excluir"
                            >
                                🗑️
                            </button>

                        </div>
                        `;

                }
            );

    }


    /* =========================
       LISTA MEDICAMENTOS
    ========================== */

    const listaMedicamentos =
        document.getElementById(
            "listaMedicamentos"
        );


    listaMedicamentos.innerHTML =
        "";


    if (
        dados.medicamentos.length === 0
    ) {

        listaMedicamentos.innerHTML =
            `
            <div class="vazio">
                Nenhum medicamento cadastrado.
            </div>
            `;

    } else {

        dados.medicamentos
            .slice()
            .reverse()
            .forEach(
                function(item) {

                    listaMedicamentos.innerHTML +=
                        `
                        <div class="registro">

                            💊

                            <strong>
                                ${escaparHTML(item.nome)}
                            </strong>

                            <br>

                            Horário:
                            ${escaparHTML(item.horario)}

                            <small>
                                Cadastrado em:
                                ${escaparHTML(item.data || "")}
                            </small>

                            <button
                                class="btn-excluir"
                                onclick="excluirRegistro('medicamentos', ${item.id})"
                                title="Excluir"
                            >
                                🗑️
                            </button>

                        </div>
                        `;

                }
            );

    }


    /* =========================
       ÚLTIMOS REGISTROS
    ========================== */

    atualizarUltimosRegistros();


    /* =========================
       CARREGAR PERFIL
    ========================== */

    document.getElementById(
        "nomeUsuario"
    ).value =
        dados.perfil.nome || "";


    document.getElementById(
        "emailUsuario"
    ).value =
        dados.perfil.email || "";


    document.getElementById(
        "nascimentoUsuario"
    ).value =
        dados.perfil.nascimento || "";

}


/* =========================================================
   ÚLTIMOS REGISTROS
========================================================= */

function atualizarUltimosRegistros() {

    const container =
        document.getElementById(
            "ultimosRegistros"
        );


    const registros = [];


    dados.glicemias.forEach(
        function(item) {

            registros.push({

                tipo: "🩸",

                titulo:
                    "Glicemia: " +
                    item.valor +
                    " mg/dL",

                data:
                    item.data,

                pagina:
                    "glicemia"

            });

        }
    );


    dados.pressoes.forEach(
        function(item) {

            registros.push({

                tipo: "❤️",

                titulo:
                    "Pressão: " +
                    item.sistolica +
                    "/" +
                    item.diastolica,

                data:
                    item.data,

                pagina:
                    "pressao"

            });

        }
    );


    dados.alimentacoes.forEach(
        function(item) {

            registros.push({

                tipo: "🍎",

                titulo:
                    "Refeição: " +
                    item.refeicao,

                data:
                    item.data,

                pagina:
                    "alimentacao"

            });

        }
    );


    dados.medicamentos.forEach(
        function(item) {

            registros.push({

                tipo: "💊",

                titulo:
                    "Medicamento: " +
                    item.nome,

                data:
                    item.data || "",

                pagina:
                    "medicamentos"

            });

        }
    );


    registros.reverse();


    const ultimos =
        registros.slice(
            0,
            5
        );


    if (
        ultimos.length === 0
    ) {

        container.innerHTML =
            `
            <div class="vazio">
                Nenhum registro realizado ainda.
            </div>
            `;

        return;

    }


    container.innerHTML =
        "";


    ultimos.forEach(
        function(item) {

            container.innerHTML +=
                `
                <div
                    class="registro"
                    style="cursor:pointer"
                    onclick="mostrarPagina('${item.pagina}')"
                >

                    ${item.tipo}

                    <strong>
                        ${escaparHTML(item.titulo)}
                    </strong>

                    <small>
                        ${escaparHTML(item.data)}
                    </small>

                </div>
                `;

        }
    );

}


/* =========================================================
   INICIAR SISTEMA
========================================================= */

salvarDados();

verificarLogin();

atualizarTela();