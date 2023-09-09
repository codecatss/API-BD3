-- Criação do banco de dados
CREATE DATABASE "2rp";

-- Configurando usuário e senha padrão do banco de dados para conexão JDBC
CREATE USER admin WITH PASSWORD 'admin123';

-- Concede permissões
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO admin;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO admin;

-- Define o banco de dados 2rp como o padrão
\c "2rp";
