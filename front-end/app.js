
/* =========================================================
   GLYCOHEART - SISTEMA DE MONITORAMENTO
========================================================= */


/* =========================================================
   BANCO LOCAL
========================================================= */

const dadosPadrao = {
    glicemias: [],
    pressoes: [],
    alimentacoes: [],
    medicamentos: [],
    perfil: {}
};

let dados = carregarDados();

function carregarDados() {
    try {
        const salvo = localStorage.getItem("glycoheart");

        if (!salvo) {
            return {
                ...dadosPadrao,
                glicemias: [],
                pressoes: [],
                alimentacoes: [],
                medicamentos: [],
                perfil: {}
            };
        }

        const dadosSalvos = JSON.parse(salvo);

        return {
            ...dadosPadrao,
            ...dadosSalvos
        };

    } catch (erro) {
        console.error("Erro ao carregar dados:", erro);

        return {
            glicemias: [],
            pressoes: [],
            alimentacoes: [],
            medicamentos: [],
            perfil: {}
        };
    }
}

function salvarDados() {
    localStorage.setItem("glycoheart", JSON.stringify(dados));
}


/* =========================================================
   NAVEGAÇÃO
========================================================= */

const botoesMenu = document.querySelectorAll(".menu-btn");
const paginas = document.querySelectorAll(".pagina");

botoesMenu.forEach(function(botao) {
    botao.addEventListener("click", function() {
        abrirPagina(this.dataset.page);
    });
});

function abrirPagina(id) {
    paginas.forEach(function(pagina) {
        pagina.classList.remove("ativa");
    });

    botoesMenu.forEach(function(botao) {
        botao.classList.remove("ativo");
    });

    const pagina = document.getElementById(id);

    const botao = document.querySelector(
        `.menu-btn[data-page="${id}"]`
    );

    if (pagina) {
        pagina.classList.add("ativa");
    }

    if (botao) {
        botao.classList.add("ativo");
    }

    atualizarTela();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   NOTIFICAÇÕES
========================================================= */

let notificacaoTimeout;

function notificar(mensagem, icone = "✓") {
    const caixa = document.getElementById("notificacao");
    const texto = document.getElementById("notificacaoTexto");
    const iconeElemento = document.getElementById("notificacaoIcone");

    if (!caixa || !texto || !iconeElemento) return;

    texto.textContent = mensagem;
    iconeElemento.textContent = icone;

    caixa.classList.add("mostrar");

    clearTimeout(notificacaoTimeout);

    notificacaoTimeout = setTimeout(function() {
        caixa.classList.remove("mostrar");
    }, 3000);
}


/* =========================================================
   FORMULÁRIO DE GLICEMIA
========================================================= */

const formGlicemia = document.getElementById("formGlicemia");

if (formGlicemia) {
    formGlicemia.addEventListener("submit", function(event) {
        event.preventDefault();

        const valor = Number(
            document.getElementById("valorGlicemia").value
        );

        const momento = document.getElementById("momentoGlicemia").value;

        const observacao = document.getElementById("observacaoGlicemia").value.trim();

        if (!valor || valor <= 0) {
            notificar("Digite um valor válido.", "!");
            return;
        }

        dados.glicemias.push({
            id: Date.now(),
            valor,
            momento,
            observacao,
            data: new Date().toLocaleString("pt-BR")
        });

        salvarDados();
        this.reset();
        atualizarTela();

        notificar("Glicemia registrada com sucesso!", "🩸");
    });
}


/* =========================================================
   FORMULÁRIO DE PRESSÃO
========================================================= */

const formPressao = document.getElementById("formPressao");

if (formPressao) {
    formPressao.addEventListener("submit", function(event) {
        event.preventDefault();

        const sistolica = Number(document.getElementById("sistolica").value);
        const diastolica = Number(document.getElementById("diastolica").value);
        const frequencia = Number(document.getElementById("frequencia").value);

        if (sistolica <= 0 || diastolica <= 0 || frequencia <= 0) {
            notificar("Preencha todos os valores.", "!");
            return;
        }

        dados.pressoes.push({
            id: Date.now(),
            sistolica,
            diastolica,
            frequencia,
            data: new Date().toLocaleString("pt-BR")
        });

        salvarDados();
        this.reset();
        atualizarTela();

        notificar("Pressão registrada com sucesso!", "❤️");
    });
}


/* =========================================================
   FORMULÁRIO DE ALIMENTAÇÃO
========================================================= */

const formAlimentacao = document.getElementById("formAlimentacao");

if (formAlimentacao) {
    formAlimentacao.addEventListener("submit", function(event) {
        event.preventDefault();

        const refeicao = document.getElementById("tipoRefeicao").value;

        const alimentos = document.getElementById("alimentos").value.trim();

        if (!alimentos) {
            notificar("Informe os alimentos consumidos.", "!");
            return;
        }

        dados.alimentacoes.push({
            id: Date.now(),
            refeicao,
            alimentos,
            data: new Date().toLocaleString("pt-BR")
        });

        salvarDados();
        this.reset();
        atualizarTela();

        notificar("Refeição registrada e analisada!", "🍎");
    });
}


/* =========================================================
   FORMULÁRIO DE MEDICAMENTOS
========================================================= */

const formMedicamento = document.getElementById("formMedicamento");

if (formMedicamento) {
    formMedicamento.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nomeMedicamento").value.trim();

        const horario = document.getElementById("horarioMedicamento").value;

        const observacao = document.getElementById("doseMedicamento").value.trim();

        if (!nome || !horario) {
            notificar("Preencha nome e horário.", "!");
            return;
        }

        dados.medicamentos.push({
            id: Date.now(),
            nome,
            horario,
            observacao
        });

        dados.medicamentos.sort(function(a, b) {
            return a.horario.localeCompare(b.horario);
        });

        salvarDados();
        this.reset();
        atualizarTela();

        notificar("Medicamento cadastrado!", "💊");
    });
}


/* =========================================================
   FORMULÁRIO DE PERFIL
========================================================= */

const formPerfil = document.getElementById("formPerfil");

if (formPerfil) {
    formPerfil.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nomeUsuario").value.trim();

        const email = document.getElementById("emailUsuario").value.trim();

        const nascimento = document.getElementById("nascimentoUsuario").value;

        if (!nome) {
            notificar("Digite seu nome.", "!");
            return;
        }

        dados.perfil = {
            nome,
            email,
            nascimento
        };

        salvarDados();
        atualizarTela();

        notificar("Perfil salvo com sucesso!", "👤");
    });
}


/* =========================================================
   EXCLUIR REGISTROS
========================================================= */

function excluirRegistro(tipo, id) {
    if (!confirm("Deseja realmente excluir este registro?")) {
        return;
    }

    if (!Array.isArray(dados[tipo])) return;

    dados[tipo] = dados[tipo].filter(function(item) {
        return item.id !== id;
    });

    salvarDados();
    atualizarTela();

    notificar("Registro excluído.", "🗑️");
}


/* =========================================================
   ATUALIZAÇÃO GERAL
========================================================= */

function atualizarTela() {
    atualizarDashboard();
    atualizarGlicemia();
    atualizarPressao();
    atualizarAlimentacao();
    atualizarMedicamentos();
    atualizarRelatorios();
    atualizarPerfil();
    atualizarAtividade();
    atualizarGraficos();
    atualizarConsequencias();
}


/* =========================================================
   DASHBOARD
========================================================= */

function atualizarDashboard() {
    const glicemiaElemento = document.getElementById("glicemiaAtual");
    const pressaoElemento = document.getElementById("pressaoAtual");

    if (glicemiaElemento) {
        if (dados.glicemias.length > 0) {
            const ultima = dados.glicemias[dados.glicemias.length - 1];
            glicemiaElemento.textContent = `${ultima.valor} mg/dL`;
        } else {
            glicemiaElemento.textContent = "--";
        }
    }

    if (pressaoElemento) {
        if (dados.pressoes.length > 0) {
            const ultima = dados.pressoes[dados.pressoes.length - 1];
            pressaoElemento.textContent = `${ultima.sistolica}/${ultima.diastolica}`;
        } else {
            pressaoElemento.textContent = "--";
        }
    }

    const totalRefeicoes = document.getElementById("totalRefeicoes");
    if (totalRefeicoes) totalRefeicoes.textContent = dados.alimentacoes.length;

    const totalMedicamentos = document.getElementById("totalMedicamentos");
    if (totalMedicamentos) totalMedicamentos.textContent = dados.medicamentos.length;

    const nomeDashboard = document.getElementById("nomeDashboard");

    if (nomeDashboard) {
        nomeDashboard.textContent = dados.perfil.nome
            ? `Bem-vindo, ${dados.perfil.nome}`
            : "Bem-vindo ao GlycoHeart";
    }
}


/* =========================================================
   LISTA DE GLICEMIA
========================================================= */

function atualizarGlicemia() {
    const lista = document.getElementById("listaGlicemia");
    if (!lista) return;

    if (dados.glicemias.length === 0) {
        lista.innerHTML = `<p class="vazio">Nenhuma glicemia registrada.</p>`;
        return;
    }

    lista.innerHTML = "";

    dados.glicemias.slice().reverse().forEach(function(item) {
        const registro = document.createElement("div");
        registro.className = "registro";

        registro.innerHTML = `
            <button class="excluir"
                onclick="excluirRegistro('glicemias', ${Number(item.id)})"
                title="Excluir">🗑️</button>

            <strong>🩸 ${Number(item.valor)} mg/dL</strong>

            <div class="registro-info">
                Momento: ${escaparHTML(item.momento)}
                ${item.observacao ? `<br>Observação: ${escaparHTML(item.observacao)}` : ""}
            </div>

            <small>${escaparHTML(item.data)}</small>
        `;

        lista.appendChild(registro);
    });
}


/* =========================================================
   LISTA DE PRESSÃO
========================================================= */

function atualizarPressao() {
    const lista = document.getElementById("listaPressao");
    if (!lista) return;

    if (dados.pressoes.length === 0) {
        lista.innerHTML = `<p class="vazio">Nenhuma pressão registrada.</p>`;
        return;
    }

    lista.innerHTML = "";

    dados.pressoes.slice().reverse().forEach(function(item) {
        const registro = document.createElement("div");
        registro.className = "registro";

        registro.innerHTML = `
            <button class="excluir"
                onclick="excluirRegistro('pressoes', ${Number(item.id)})"
                title="Excluir">🗑️</button>

            <strong>❤️ ${Number(item.sistolica)}/${Number(item.diastolica)} mmHg</strong>

            <div class="registro-info">
                Frequência cardíaca: ${Number(item.frequencia)} bpm
            </div>

            <small>${escaparHTML(item.data)}</small>
        `;

        lista.appendChild(registro);
    });
}


/* =========================================================
   LISTA DE ALIMENTAÇÃO
========================================================= */

function atualizarAlimentacao() {
    const lista = document.getElementById("listaAlimentacao");
    if (!lista) return;

    if (dados.alimentacoes.length === 0) {
        lista.innerHTML = `<p class="vazio">Nenhuma refeição registrada.</p>`;
        return;
    }

    lista.innerHTML = "";

    dados.alimentacoes.slice().reverse().forEach(function(item) {
        const registro = document.createElement("div");
        registro.className = "registro";

        registro.innerHTML = `
            <button class="excluir"
                onclick="excluirRegistro('alimentacoes', ${Number(item.id)})"
                title="Excluir">🗑️</button>

            <strong>🍎 ${escaparHTML(item.refeicao)}</strong>

            <div class="registro-info">
                ${escaparHTML(item.alimentos)}
            </div>

            <small>${escaparHTML(item.data)}</small>
        `;

        lista.appendChild(registro);
    });
}


/* =========================================================
   LISTA DE MEDICAMENTOS
========================================================= */

function atualizarMedicamentos() {
    const lista = document.getElementById("listaMedicamentos");
    if (!lista) return;

    if (dados.medicamentos.length === 0) {
        lista.innerHTML = `<p class="vazio">Nenhum medicamento cadastrado.</p>`;
        return;
    }

    lista.innerHTML = "";

    dados.medicamentos.forEach(function(item) {
        const registro = document.createElement("div");
        registro.className = "registro";

        registro.innerHTML = `
            <button class="excluir"
                onclick="excluirRegistro('medicamentos', ${Number(item.id)})"
                title="Excluir">🗑️</button>

            <strong>💊 ${escaparHTML(item.nome)}</strong>

            <div class="registro-info">
                ⏰ Horário: ${escaparHTML(item.horario)}
                ${item.observacao ? `<br>${escaparHTML(item.observacao)}` : ""}
            </div>
        `;

        lista.appendChild(registro);
    });
}


/* =========================================================
   RELATÓRIOS
========================================================= */

function atualizarRelatorios() {
    const relatorios = {
        relGlicemia: dados.glicemias.length,
        relPressao: dados.pressoes.length,
        relRefeicoes: dados.alimentacoes.length,
        relMedicamentos: dados.medicamentos.length
    };

    Object.entries(relatorios).forEach(function([id, valor]) {
        const elemento = document.getElementById(id);
        if (elemento) elemento.textContent = valor;
    });
}


/* =========================================================
   PERFIL
========================================================= */

function atualizarPerfil() {
    const nome = document.getElementById("nomeUsuario");
    const email = document.getElementById("emailUsuario");
    const nascimento = document.getElementById("nascimentoUsuario");

    if (nome) nome.value = dados.perfil.nome || "";
    if (email) email.value = dados.perfil.email || "";
    if (nascimento) nascimento.value = dados.perfil.nascimento || "";
}


/* =========================================================
   ATIVIDADE RECENTE
========================================================= */

function atualizarAtividade() {
    const lista = document.getElementById("atividadeRecente");
    if (!lista) return;

    const atividades = [];

    dados.glicemias.forEach(function(item) {
        atividades.push({
            tipo: "🩸",
            texto: `Glicemia: ${item.valor} mg/dL`,
            data: item.data
        });
    });

    dados.pressoes.forEach(function(item) {
        atividades.push({
            tipo: "❤️",
            texto: `Pressão: ${item.sistolica}/${item.diastolica}`,
            data: item.data
        });
    });

    dados.alimentacoes.forEach(function(item) {
        atividades.push({
            tipo: "🍎",
            texto: `Refeição: ${item.refeicao}`,
            data: item.data
        });
    });

    if (atividades.length === 0) {
        lista.innerHTML = `<p class="vazio">Nenhuma atividade registrada.</p>`;
        return;
    }

    lista.innerHTML = "";

    atividades.slice().reverse().slice(0, 6).forEach(function(item) {
        lista.innerHTML += `
            <div class="atividade-item">
                <div class="atividade-icone">${item.tipo}</div>
                <div class="atividade-texto">
                    <strong>${escaparHTML(item.texto)}</strong>
                    <span>${escaparHTML(item.data)}</span>
                </div>
            </div>
        `;
    });
}


/* =========================================================
   GRÁFICOS
========================================================= */

let chartGlicemia = null;
let chartPressao = null;
let chartGlicemiaRelatorio = null;
let chartPressaoRelatorio = null;

function atualizarGraficos() {
    criarGraficoGlicemia();
    criarGraficoPressao();
    criarGraficoRelatorioGlicemia();
    criarGraficoRelatorioPressao();
}

function criarGraficoGlicemia() {
    const canvas = document.getElementById("graficoGlicemia");

    if (!canvas || typeof Chart === "undefined") return;

    if (chartGlicemia) chartGlicemia.destroy();

    const registros = dados.glicemias.slice(-10);

    chartGlicemia = new Chart(canvas, {
        type: "line",
        data: {
            labels: registros.map(item => item.data.split(",")[0]),
            datasets: [{
                label: "Glicemia mg/dL",
                data: registros.map(item => item.valor),
                borderWidth: 3,
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: false }
            }
        }
    });
}

function criarGraficoPressao() {
    const canvas = document.getElementById("graficoPressao");

    if (!canvas || typeof Chart === "undefined") return;

    if (chartPressao) chartPressao.destroy();

    const registros = dados.pressoes.slice(-10);

    chartPressao = new Chart(canvas, {
        type: "line",
        data: {
            labels: registros.map(item => item.data.split(",")[0]),
            datasets: [
                {
                    label: "Sistólica",
                    data: registros.map(item => item.sistolica),
                    borderWidth: 3,
                    tension: 0.4
                },
                {
                    label: "Diastólica",
                    data: registros.map(item => item.diastolica),
                    borderWidth: 3,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function criarGraficoRelatorioGlicemia() {
    const canvas = document.getElementById("graficoGlicemiaRelatorio");

    if (!canvas || typeof Chart === "undefined") return;

    if (chartGlicemiaRelatorio) chartGlicemiaRelatorio.destroy();

    const registros = dados.glicemias.slice(-15);

    chartGlicemiaRelatorio = new Chart(canvas, {
        type: "bar",
        data: {
            labels: registros.map((item, index) => index + 1),
            datasets: [{
                label: "Glicemia",
                data: registros.map(item => item.valor),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function criarGraficoRelatorioPressao() {
    const canvas = document.getElementById("graficoPressaoRelatorio");

    if (!canvas || typeof Chart === "undefined") return;

    if (chartPressaoRelatorio) chartPressaoRelatorio.destroy();

    const registros = dados.pressoes.slice(-15);

    chartPressaoRelatorio = new Chart(canvas, {
        type: "bar",
        data: {
            labels: registros.map((item, index) => index + 1),
            datasets: [
                {
                    label: "Sistólica",
                    data: registros.map(item => item.sistolica),
                    borderWidth: 1
                },
                {
                    label: "Diastólica",
                    data: registros.map(item => item.diastolica),
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}


/* =========================================================
   ANÁLISE DOS ALIMENTOS
========================================================= */

const ALIMENTOS = [
    // ARROZ, MASSAS E CEREAIS
    {
        chaves: ["arroz integral"],
        caracteristicas: ["Carboidratos", "Fibras"],
        consequencias: [
            {
                icone: "🩸",
                titulo: "Glicemia",
                texto: "As fibras podem contribuir para uma absorção mais gradual dos carboidratos."
            }
        ]
    },
    {
        chaves: ["arroz", "macarrao", "massa", "pao frances", "pao", "farinha", "cuscuz", "tapioca", "aveia", "milho", "pipoca"],
        caracteristicas: ["Fonte de carboidratos"],
        consequencias: [
            {
                icone: "🩸",
                titulo: "Glicemia",
                texto: "Esses alimentos contêm carboidratos e podem elevar a glicose após a refeição. A resposta depende da porção e do preparo."
            }
        ]
    },
    {
        chaves: ["pao integral"],
        caracteristicas: ["Carboidratos", "Fibras"],
        consequencias: [
            {
                icone: "🩸",
                titulo: "Glicemia",
                texto: "As fibras podem ajudar a tornar a absorção dos carboidratos mais gradual."
            }
        ]
    },

    // FEIJÕES E LEGUMINOSAS
    {
        chaves: ["feijoada"],
        caracteristicas: ["Proteínas", "Fibras", "Pode conter bastante sódio e gordura"],
        consequencias: [
            {
                icone: "🧂",
                titulo: "Pressão arterial",
                texto: "Carnes salgadas e embutidos podem aumentar o teor de sódio da refeição."
            },
            {
                icone: "🩸",
                titulo: "Glicemia",
                texto: "O feijão contém fibras, mas os acompanhamentos, como arroz e farofa, também fornecem carboidratos."
            },
            {
                icone: "❤️",
                titulo: "Coração",
                texto: "Algumas versões possuem gordura saturada, especialmente quando levam carnes gordurosas."
            }
        ]
    },
    {
        chaves: ["feijao", "lentilha", "grao de bico", "ervilha", "soja"],
        caracteristicas: ["Fibras", "Proteínas vegetais"],
        consequencias: [
            {
                icone: "🩸",
                titulo: "Glicemia",
                texto: "As fibras e proteínas podem contribuir para uma resposta glicêmica mais gradual."
            },
            {
                icone: "💚",
                titulo: "Nutrição",
                texto: "São fontes de fibras, proteínas vegetais e minerais."
            }
        ]
    },

    // CARNES E PROTEÍNAS
    {
        chaves: ["frango", "peito de frango", "frango grelhado"],
        caracteristicas: ["Fonte de proteínas"],
        consequencias: [
            {
                icone: "💪",
                titulo: "Nutrição",
                texto: "Fornece proteínas importantes para a manutenção dos músculos."
            }
        ]
    },
    {
        chaves: ["carne bovina", "carne de boi", "bife", "picanha", "costela", "carne moida"],
        caracteristicas: ["Proteínas", "Ferro"],
        consequencias: [
            {
                icone: "❤️",
                titulo: "Saúde cardiovascular",
                texto: "Cortes com muita gordura saturada podem contribuir para o aumento do colesterol LDL."
            }
        ]
    },
    {
        chaves: ["carne suina", "carne de porco", "lombo", "pernil"],
        caracteristicas: ["Fonte de proteínas"],
        consequencias: [
            {
                icone: "💪",
                titulo: "Nutrição",
                texto: "Fornece proteínas. O teor de gordura varia de acordo com o corte."
            }
        ]
    },
    {
        chaves: ["ovo", "ovos", "omelete"],
        caracteristicas: ["Proteínas", "Vitaminas"],
        consequencias: [
            {
                icone: "💪",
                titulo: "Nutrição",
                texto: "Ovos fornecem proteínas e nutrientes importantes para o organismo."
            }
        ]
    },
    {
        chaves: ["salmao", "sardinha", "atum", "tilapia", "peixe"],
        caracteristicas: ["Proteínas", "Gorduras saudáveis em alguns peixes"],
        consequencias: [
            {
                icone: "❤️",
                titulo: "Saúde cardiovascular",
                texto: "Peixes como salmão e sardinha contêm ômega-3, associado à saúde cardiovascular."
            }
        ]
    },

    // FRUTAS
    {
        chaves: ["banana", "maca", "laranja", "mamao", "melancia", "uva", "morango", "pera", "abacaxi", "manga", "kiwi", "goiaba", "melão", "melao", "limão", "limao", "ameixa", "pessego", "abacate"],
        caracteristicas: ["Vitaminas", "Fibras", "Açúcares naturais"],
        consequencias: [
            {
                icone: "🩸",
                titulo: "Glicemia",
                texto: "Frutas possuem carboidratos naturais. A influência na glicemia depende do tipo de fruta, da porção e da forma de consumo."
            },
            {
                icone: "💚",
                titulo: "Nutrição",
                texto: "Frutas fornecem vitaminas, minerais e fibras importantes para o organismo."
            }
        ]
    },

    // VERDURAS E LEGUMES
    {
        chaves: ["alface", "tomate", "cenoura", "brocolis", "couve", "espinafre", "repolho", "pepino", "abobrinha", "berinjela", "chuchu", "beterraba", "vagem", "rúcula", "rucula", "agriao", "agrião", "couve flor", "abobora"],
        caracteristicas: ["Fibras", "Vitaminas", "Minerais"],
        consequencias: [
            {
                icone: "🥗",
                titulo: "Nutrição",
                texto: "Esses alimentos contribuem com fibras, vitaminas e minerais para uma alimentação equilibrada."
            }
        ]
    },
    {
        chaves: ["batata doce"],
        caracteristicas: ["Carboidratos", "Fibras"],
        consequencias: [
            {
                icone: "🩸",
                titulo: "Glicemia",
                texto: "Contém carboidratos e fibras. A resposta depende da porção e do preparo."
            }
        ]
    },
    {
        chaves: ["batata"],
        caracteristicas: ["Fonte de carboidratos"],
        consequencias: [
            {
                icone: "🩸",
                titulo: "Glicemia",
                texto: "Pode elevar a glicose no sangue, dependendo da quantidade e do preparo."
            }
        ]
    },

    // BEBIDAS
    {
        chaves: ["refrigerante", "coca cola", "guarana", "fanta", "sprite", "energetico", "cha gelado"],
        caracteristicas: ["Pode conter açúcar", "Bebida"],
        consequencias: [
            {
                icone: "🩸",
                titulo: "Glicemia",
                texto: "Versões com açúcar podem provocar aumento rápido da glicose no sangue."
            }
        ]
    },
    {
        chaves: ["suco", "suco natural"],
        caracteristicas: ["Carboidratos", "Açúcares naturais"],
        consequencias: [
            {
                icone: "🩸",
                titulo: "Glicemia",
                texto: "Mesmo sem açúcar adicionado, sucos podem conter açúcares naturais e menos fibras do que a fruta inteira."
            }
        ]
    },
    {
        chaves: ["cafe", "cafeina"],
        caracteristicas: ["Bebida com cafeína"],
        consequencias: [
            {
                icone: "❤️",
                titulo: "Pressão arterial",
                texto: "A cafeína pode causar alterações temporárias na pressão arterial em algumas pessoas."
            }
        ]
    },
    {
        chaves: ["leite", "iogurte natural"],
        caracteristicas: ["Proteínas", "Cálcio"],
        consequencias: [
            {
                icone: "💚",
                titulo: "Nutrição",
                texto: "Fornecem proteínas e cálcio. O leite também contém lactose, um carboidrato natural."
            }
        ]
    },

    // DOCES E SOBREMESAS
    {
        chaves: ["chocolate", "bolo", "brigadeiro", "sorvete", "doce de leite", "pudim", "beijinho", "bala", "pirulito", "paçoca", "pacoca", "brownie", "cookie", "biscoito recheado"],
        caracteristicas: ["Pode conter bastante açúcar", "Pode conter gorduras"],
        consequencias: [
            {
                icone: "🩸",
                titulo: "Glicemia",
                texto: "Doces podem elevar a glicose no sangue. A resposta depende da quantidade e da composição."
            }
        ]
    },
    {
        chaves: ["biscoito", "bolacha", "salgadinho", "batata chips"],
        caracteristicas: ["Carboidratos", "Pode conter sódio"],
        consequencias: [
            {
                icone: "🩸",
                titulo: "Glicemia",
                texto: "Podem conter carboidratos que influenciam a glicemia."
            },
            {
                icone: "🧂",
                titulo: "Pressão arterial",
                texto: "Algumas versões possuem bastante sódio."
            }
        ]
    },

    // FRITURAS E LANCHES
    {
        chaves: ["batata frita", "pastel", "coxinha", "risole", "empada", "frango frito", "mandioca frita", "fritura"],
        caracteristicas: ["Preparação frita", "Pode conter maior teor de gordura"],
        consequencias: [
            {
                icone: "❤️",
                titulo: "Saúde cardiovascular",
                texto: "O consumo frequente de frituras pode contribuir para uma alimentação rica em gorduras e calorias."
            }
        ]
    },
    {
        chaves: ["pizza", "hamburguer", "cachorro quente", "hot dog", "lasanha", "sanduiche", "sanduíche"],
        caracteristicas: ["Pode conter carboidratos", "Pode conter sódio e gorduras"],
        consequencias: [
            {
                icone: "🩸",
                titulo: "Glicemia",
                texto: "Massas e pães fornecem carboidratos e podem elevar a glicose."
            },
            {
                icone: "❤️",
                titulo: "Saúde cardiovascular",
                texto: "O teor de sódio e gordura varia conforme os ingredientes e o preparo."
            }
        ]
    },

    // ALIMENTOS PROCESSADOS
    {
        chaves: ["salsicha", "presunto", "mortadela", "bacon", "linguica", "salame", "peito de peru"],
        caracteristicas: ["Carnes processadas", "Pode conter bastante sódio"],
        consequencias: [
            {
                icone: "🧂",
                titulo: "Pressão arterial",
                texto: "Carnes processadas podem conter quantidades elevadas de sódio."
            },
            {
                icone: "❤️",
                titulo: "Saúde cardiovascular",
                texto: "O consumo frequente de carnes processadas não é recomendado como parte de uma alimentação equilibrada."
            }
        ]
    },

    // TEMPEROS E OUTROS
    {
        chaves: ["sal", "caldo de galinha", "tempero pronto", "shoyu", "molho ingles"],
        caracteristicas: ["Pode conter bastante sódio"],
        consequencias: [
            {
                icone: "🧂",
                titulo: "Pressão arterial",
                texto: "O excesso de sódio na alimentação pode contribuir para o aumento da pressão arterial."
            }
        ]
    },
    {
        chaves: ["azeite", "castanha", "nozes", "amendoim", "chia", "linhaça"],
        caracteristicas: ["Gorduras insaturadas", "Fibras em alguns alimentos"],
        consequencias: [
            {
                icone: "❤️",
                titulo: "Saúde cardiovascular",
                texto: "Esses alimentos podem fornecer gorduras insaturadas, que fazem parte de uma alimentação favorável à saúde cardiovascular."
            }
        ]
    }
];

function normalizar(texto) {
    return String(texto || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function analisarRefeicao(descricao) {
    const texto = normalizar(descricao);

    return ALIMENTOS.filter(function(alimento) {
        return alimento.chaves.some(function(chave) {
            return texto.includes(normalizar(chave));
        });
    });
}

function atualizarConsequencias() {
    const lista = document.getElementById("listaConsequencias");
    const resumo = document.getElementById("resumoConsequencias");

    if (!lista) return;

    const ultima = dados.alimentacoes[dados.alimentacoes.length - 1];

    if (!ultima) {
        lista.innerHTML = `
            <div class="gh-consequencia-vazia">
                <span class="gh-vazio-icone">🍽️</span>
                <h3>Nenhuma refeição registrada</h3>
                <p>
                    Registre uma refeição para visualizar informações
                    educativas sobre os alimentos.
                </p>
            </div>
        `;

        if (resumo) {
            resumo.textContent =
                "Suas análises aparecerão aqui depois do registro de uma refeição.";
        }

        return;
    }

    if (resumo) {
        resumo.textContent =
            `Refeição analisada: ${ultima.refeicao} — ${ultima.alimentos}`;
    }

    const resultados = analisarRefeicao(ultima.alimentos);

    if (resultados.length === 0) {
        lista.innerHTML = `
            <div class="gh-consequencia-vazia">
                <span class="gh-vazio-icone">🔎</span>
                <h3>Não encontramos esses alimentos</h3>
                <p>
                    Experimente informar ingredientes como arroz,
                    feijão, frango, salada ou peixe.
                </p>
            </div>
        `;
        return;
    }

    const caracteristicas = [
        ...new Set(resultados.flatMap(item => item.caracteristicas))
    ];

    const consequencias = [
        ...new Map(
            resultados
                .flatMap(item => item.consequencias)
                .map(item => [item.titulo + item.texto, item])
        ).values()
    ];

    lista.innerHTML = `
        <section class="gh-corpo-destaque">

            <div class="gh-ilustracao-corpo">
                <div class="gh-corpo-circulo">
                    <span class="gh-corpo-simbolo">♡</span>
                    <span class="gh-corpo-pulso">心</span>
                </div>

                <span class="gh-corpo-legenda">
                    SAÚDE EM ACOMPANHAMENTO
                </span>
            </div>

            <div class="gh-texto-corpo">
                <span class="gh-etiqueta">
                    GLYCOHEART • ANÁLISE EDUCATIVA
                </span>

                <h2>Seu corpo em foco</h2>

                <p>
                    Veja informações gerais sobre os alimentos
                    da sua última refeição e sua relação com a saúde.
                </p>

                <div class="gh-refeicao-atual">
                    <span>Última refeição</span>

                    <strong>
                        ${escaparHTML(ultima.refeicao)}
                    </strong>

                    <small>
                        ${escaparHTML(ultima.alimentos)}
                    </small>
                </div>
            </div>

        </section>

        <section class="gh-caracteristicas">

            <div class="gh-secao-cabecalho">
                <span class="gh-secao-icone">🥗</span>

                <div>
                    <h3>Características dos alimentos</h3>
                    <p>O que encontramos na sua refeição</p>
                </div>
            </div>

            <div class="gh-tags">
                ${caracteristicas.map(item => `
                    <span class="gh-tag">
                        ${escaparHTML(item)}
                    </span>
                `).join("")}
            </div>

        </section>

        <section class="gh-secao-consequencias">

            <div class="gh-secao-cabecalho">
                <span class="gh-secao-icone">♡</span>

                <div>
                    <h3>Possíveis relações com a saúde</h3>
                    <p>
                        Informações educativas, de acordo com
                        os alimentos identificados.
                    </p>
                </div>
            </div>

            <div class="gh-lista-cards">

                ${consequencias.map(item => `
                    <article class="gh-card-consequencia">

                        <div class="gh-icone-consequencia">
                            ${item.icone}
                        </div>

                        <div class="gh-conteudo-card">
                            <h4>
                                ${escaparHTML(item.titulo)}
                            </h4>

                            <p>
                                ${escaparHTML(item.texto)}
                            </p>
                        </div>

                    </article>
                `).join("")}

            </div>

        </section>

        <aside class="gh-dica">

            <span class="gh-icone-dica">💡</span>

            <div>
                <h3>Dica GlycoHeart</h3>

                <p>
                    Uma alimentação variada e equilibrada pode
                    contribuir para a saúde. Registre suas refeições
                    e acompanhe seus indicadores ao longo do tempo.
                </p>
            </div>

        </aside>

        <div class="gh-aviso">
            <strong>Informação importante</strong>

            <p>
                Esta análise é educativa e apresenta características
                gerais dos alimentos informados. Ela não mede a glicemia,
                não prevê resultados clínicos e não substitui a orientação
                de profissionais de saúde.
            </p>
        </div>
    `;
}


/* =========================================================
   MODO ESCURO
========================================================= */

const temaBtn = document.getElementById("temaBtn");

if (temaBtn) {
    temaBtn.addEventListener("click", function() {
        document.body.classList.toggle("dark");

        const escuro = document.body.classList.contains("dark");

        localStorage.setItem(
            "glycoheartTema",
            escuro ? "dark" : "light"
        );

        const textoTema = temaBtn.querySelector("span");

        if (textoTema) {
            textoTema.textContent = escuro ? "Modo claro" : "Modo escuro";
        }

        if (temaBtn.firstChild) {
            temaBtn.firstChild.textContent = escuro ? "☀️ " : "🌙 ";
        }
    });
}


/* =========================================================
   CARREGAR TEMA
========================================================= */

const temaSalvo = localStorage.getItem("glycoheartTema");

if (temaSalvo === "dark") {
    document.body.classList.add("dark");

    if (temaBtn) {
        const textoTema = temaBtn.querySelector("span");

        if (textoTema) {
            textoTema.textContent = "Modo claro";
        }

        if (temaBtn.firstChild) {
            temaBtn.firstChild.textContent = "☀️ ";
        }
    }
}


/* =========================================================
   EXPORTAR DADOS
========================================================= */

const exportarBtn = document.getElementById("exportarBtn");

if (exportarBtn) {
    exportarBtn.addEventListener("click", function() {
        const arquivo = JSON.stringify(dados, null, 4);

        const blob = new Blob([arquivo], {
            type: "application/json"
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = "glycoheart-dados.json";

        link.click();

        URL.revokeObjectURL(url);

        notificar("Dados exportados!", "📥");
    });
}


/* =========================================================
   LIMPAR DADOS
========================================================= */

const limparBtn = document.getElementById("limparBtn");

if (limparBtn) {
    limparBtn.addEventListener("click", function() {
        const confirmar = confirm(
            "ATENÇÃO!\n\n" +
            "Todos os registros do GlycoHeart serão apagados deste navegador.\n\n" +
            "Deseja continuar?"
        );

        if (!confirmar) return;

        dados = {
            glicemias: [],
            pressoes: [],
            alimentacoes: [],
            medicamentos: [],
            perfil: {}
        };

        salvarDados();
        atualizarTela();

        notificar("Todos os dados foram removidos.", "🗑️");
    });
}


/* =========================================================
   SEGURANÇA DE TEXTO
========================================================= */

function escaparHTML(valor) {
    return String(valor ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =========================================================
   INICIAR SISTEMA
========================================================= */

atualizarTela();
