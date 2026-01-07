-- Script de Inicialização da Base de Dados
-- StudyFlow - Aplicação de Gestão Académica

-- Criar base de dados
CREATE DATABASE IF NOT EXISTS `app_aui_ispg` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Usar a base de dados
USE `app_aui_ispg`;

-- Criar tabela de utilizadores
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('user', 'admin') DEFAULT 'user',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_email` (`email`),
    INDEX `idx_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- NOTA: Para criar um utilizador administrador, use a API de registo
-- e depois altere o role manualmente, ou execute o seguinte comando
-- após registar um utilizador:
-- UPDATE users SET role = 'admin' WHERE email = 'seu-email@exemplo.com';

-- Verificar estrutura da tabela
DESCRIBE `users`;

-- Mostrar todos os utilizadores
SELECT `id`, `email`, `role`, `created_at` FROM `users`;

