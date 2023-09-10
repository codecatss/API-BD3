-- PARTE 1: psql

-- Criação do banco de dados no psql
CREATE DATABASE "2rp";

-- Configurando usuário e senha padrão para manutenção do banco de dados
CREATE USER superuser WITH PASSWORD 'super123';

-- Configurando usuário e senha padrão do banco de dados para conexão JDBC
CREATE USER admin WITH PASSWORD 'admin123';

-- Concede permissões
GRANT ALL ON ALL TABLES IN SCHEMA public TO superuser;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public to superuser;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO admin;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO admin;

-- PARTE 2: Dbeaver

-- Criação de tabelas

CREATE TABLE usuario (
    matricula VARCHAR(20) NOT NULL,
    nome VARCHAR(80) NOT NULL,
    senha VARCHAR(15) NOT NULL,
    funcao VARCHAR(20) NOT NULL,
    status_usuario VARCHAR(10) NOT NULL DEFAULT 'ativo',
    PRIMARY KEY (matricula)
);

CREATE TABLE cliente (
    cnpj BIGINT NOT NULL,
    razao_social VARCHAR(150) NOT NULL,
    status_cliente VARCHAR(10) NOT NULL DEFAULT 'ativo',
    PRIMARY KEY (cnpj)
);

CREATE TABLE centro_resultado (
    nome VARCHAR(30) NOT NULL,
    codigo_cr VARCHAR(10) NOT NULL,
    sigla VARCHAR(10) NOT NULL,
    status_cr VARCHAR(10) NOT NULL DEFAULT 'ativo',
    PRIMARY KEY (codigo_cr),
    UNIQUE (sigla)
);

CREATE TABLE integrante (
    gestor BOOLEAN NOT NULL,
    matricula_integrante VARCHAR(20) NOT NULL,
    cod_cr VARCHAR(10) NOT NULL,
    FOREIGN KEY (matricula_integrante) REFERENCES usuario(matricula),
    FOREIGN KEY (cod_cr) REFERENCES centro_resultado(codigo_cr),
    PRIMARY KEY (matricula_integrante, cod_cr)
);
