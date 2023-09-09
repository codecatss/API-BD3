-- Criação do banco de dados
CREATE DATABASE "2rp";

-- Configurando usuário e senha padrão do banco de dados para conexão JDBC
CREATE USER admin WITH PASSWORD 'admin123';

-- Concede permissões
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO admin;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO admin;

-- Define o banco de dados 2rp como o padrão
\c "2rp";

-- Criação de tabelas
CREATE TYPE funcao_usuario_enum AS ENUM ('admin', 'gestor', 'colaborador');

CREATE TYPE status_enum AS ENUM ('ativo', 'inativo');

CREATE TABLE usuario (
    matricula VARCHAR(20) NOT NULL,
    nome VARCHAR(80) NOT NULL,
    senha VARCHAR(15) NOT NULL,
    funcao funcao_usuario_enum NOT NULL,
    status_usuario status_enum NOT NULL DEFAULT 'ativo',
    PRIMARY KEY (matricula)
);

CREATE TABLE cliente (
    cnpj BIGINT NOT NULL,
    razao_social VARCHAR(150) NOT NULL,
    status_cliente status_enum NOT NULL DEFAULT 'ativo',
    PRIMARY KEY (cnpj)
);
