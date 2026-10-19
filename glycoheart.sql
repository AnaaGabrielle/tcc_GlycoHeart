-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 19, 2026 at 02:11 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `glycoheart`
--

-- --------------------------------------------------------

--
-- Table structure for table `alimentacoes`
--

CREATE TABLE `alimentacoes` (
  `id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `refeicao` varchar(30) NOT NULL,
  `alimentos` text NOT NULL,
  `data_registro` date NOT NULL,
  `horario_registro` time NOT NULL,
  `criado_em` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `alimentacoes`
--

INSERT INTO `alimentacoes` (`id`, `usuario_id`, `refeicao`, `alimentos`, `data_registro`, `horario_registro`, `criado_em`) VALUES
(1, 1, 'Café da manhã', 'Maça', '2026-10-19', '11:08:12', '2026-10-19 11:08:12');

-- --------------------------------------------------------

--
-- Table structure for table `glicemias`
--

CREATE TABLE `glicemias` (
  `id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `valor` int NOT NULL,
  `momento` varchar(30) NOT NULL,
  `data_registro` date NOT NULL,
  `horario_registro` time NOT NULL,
  `criado_em` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `glicemias`
--

INSERT INTO `glicemias` (`id`, `usuario_id`, `valor`, `momento`, `data_registro`, `horario_registro`, `criado_em`) VALUES
(1, 1, 100, 'Jejum', '2026-10-19', '11:07:46', '2026-10-19 11:07:47');

-- --------------------------------------------------------

--
-- Table structure for table `medicamentos`
--

CREATE TABLE `medicamentos` (
  `id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  `horario` time NOT NULL,
  `data_registro` date NOT NULL,
  `horario_registro` time NOT NULL,
  `criado_em` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `medicamentos`
--

INSERT INTO `medicamentos` (`id`, `usuario_id`, `nome`, `horario`, `data_registro`, `horario_registro`, `criado_em`) VALUES
(1, 1, 'teste', '12:00:00', '2026-10-19', '11:08:23', '2026-10-19 11:08:23');

-- --------------------------------------------------------

--
-- Table structure for table `pressoes`
--

CREATE TABLE `pressoes` (
  `id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `sistolica` smallint NOT NULL,
  `diastolica` smallint NOT NULL,
  `frequencia` smallint NOT NULL,
  `data_registro` date NOT NULL,
  `horario_registro` time NOT NULL,
  `criado_em` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pressoes`
--

INSERT INTO `pressoes` (`id`, `usuario_id`, `sistolica`, `diastolica`, `frequencia`, `data_registro`, `horario_registro`, `criado_em`) VALUES
(1, 1, 120, 80, 75, '2026-10-19', '11:08:00', '2026-10-19 11:08:00');

-- --------------------------------------------------------

--
-- Table structure for table `sessoes`
--

CREATE TABLE `sessoes` (
  `id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `data_login` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `sessoes`
--

INSERT INTO `sessoes` (`id`, `usuario_id`, `data_login`) VALUES
(1, 1, '2026-10-19 11:07:17');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `nascimento` date DEFAULT NULL,
  `criado_em` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `usuario`, `senha`, `nascimento`, `criado_em`) VALUES
(1, 'lucky', 'lucasteste200011@gmail.com', 'lucasteste200011@gmail.com', 'Escola2025##', '2008-10-04', '2026-10-19 11:07:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alimentacoes`
--
ALTER TABLE `alimentacoes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_alimentacoes_usuario_data` (`usuario_id`,`data_registro`);

--
-- Indexes for table `glicemias`
--
ALTER TABLE `glicemias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_glicemias_usuario_data` (`usuario_id`,`data_registro`);

--
-- Indexes for table `medicamentos`
--
ALTER TABLE `medicamentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_medicamentos_usuario_data` (`usuario_id`,`data_registro`);

--
-- Indexes for table `pressoes`
--
ALTER TABLE `pressoes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_pressoes_usuario_data` (`usuario_id`,`data_registro`);

--
-- Indexes for table `sessoes`
--
ALTER TABLE `sessoes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alimentacoes`
--
ALTER TABLE `alimentacoes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `glicemias`
--
ALTER TABLE `glicemias`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `medicamentos`
--
ALTER TABLE `medicamentos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pressoes`
--
ALTER TABLE `pressoes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sessoes`
--
ALTER TABLE `sessoes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `alimentacoes`
--
ALTER TABLE `alimentacoes`
  ADD CONSTRAINT `alimentacoes_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `glicemias`
--
ALTER TABLE `glicemias`
  ADD CONSTRAINT `glicemias_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `medicamentos`
--
ALTER TABLE `medicamentos`
  ADD CONSTRAINT `medicamentos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pressoes`
--
ALTER TABLE `pressoes`
  ADD CONSTRAINT `pressoes_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sessoes`
--
ALTER TABLE `sessoes`
  ADD CONSTRAINT `sessoes_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
