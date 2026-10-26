-- ============================================
-- Banco de dados do GlycoHeart
-- ============================================
-- OBS: você NÃO precisa executar este arquivo manualmente.
-- O back-end (config/db.js) cria o banco e todas as tabelas
-- automaticamente ao iniciar, se ainda não existirem.
-- Este arquivo fica como documentação da estrutura.

CREATE DATABASE IF NOT EXISTS glycoheart CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE glycoheart;

-- Usuários (cadastro + perfil)
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    nascimento DATE NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Sessões (um registro por login realizado)
CREATE TABLE IF NOT EXISTS sessoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    data_login DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Glicemia
CREATE TABLE IF NOT EXISTS glicemias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    valor INT NOT NULL,                       -- mg/dL
    momento VARCHAR(30) NOT NULL,             -- Jejum, Antes da refeição, ...
    data_registro DATE NOT NULL,
    horario_registro TIME NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_glicemias_usuario_data (usuario_id, data_registro)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Pressão arterial
CREATE TABLE IF NOT EXISTS pressoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    sistolica SMALLINT NOT NULL,              -- mmHg
    diastolica SMALLINT NOT NULL,             -- mmHg
    frequencia SMALLINT NOT NULL,             -- bpm
    data_registro DATE NOT NULL,
    horario_registro TIME NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_pressoes_usuario_data (usuario_id, data_registro)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Alimentação
CREATE TABLE IF NOT EXISTS alimentacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    refeicao VARCHAR(30) NOT NULL,            -- Café da manhã, Almoço, ...
    alimentos TEXT NOT NULL,
    data_registro DATE NOT NULL,
    horario_registro TIME NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_alimentacoes_usuario_data (usuario_id, data_registro)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Medicamentos
CREATE TABLE IF NOT EXISTS medicamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    horario TIME NOT NULL,                    -- horário em que deve tomar
    data_registro DATE NOT NULL,              -- quando foi cadastrado
    horario_registro TIME NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_medicamentos_usuario_data (usuario_id, data_registro)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
