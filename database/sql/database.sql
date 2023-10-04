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
    cnpj VARCHAR(14) NOT NULL,
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


CREATE TABLE hora(
    id SERIAL NOT NULL,
    codigo_cr VARCHAR(10) COLLATE pg_catalog."default" NOT NULL,
    matricula_lancador VARCHAR(20) COLLATE pg_catalog."default" NOT NULL,
    cnpj_cliente VARCHAR(14) COLLATE pg_catalog."default" NOT NULL,
    data_hora_inicio timestamp without time zone NOT NULL,
    data_hora_fim timestamp without time zone NOT NULL,
    tipo VARCHAR(20) COLLATE pg_catalog."default",
    justificativa_lancamento VARCHAR(500) COLLATE pg_catalog."default" NOT NULL,
    projeto VARCHAR(100) COLLATE pg_catalog."default" NOT NULL,
    solicitante_lancamento VARCHAR(80) COLLATE pg_catalog."default" NOT NULL,
    status_aprovacao VARCHAR(30) NOT NULL DEFAULT 'pendente',
    justificativa_negacao VARCHAR(500),
   	matricula_gestor VARCHAR(20),
    data_lancamento timestamp without time zone NOT NULL,
    data_modificacao_gestor timestamp without time zone NOT NULL,
   	matricula_admin VARCHAR(20),
    data_modificacao_admin timestamp without time zone NOT NULL,
    CONSTRAINT hora_pkey PRIMARY KEY (id),
    CONSTRAINT hora_cnpj_cliente_fkey FOREIGN KEY (cnpj_cliente)
    	REFERENCES public.cliente (cnpj),
    CONSTRAINT hora_cod_cr_fkey FOREIGN KEY (codigo_cr)
    	REFERENCES public.centro_resultado (codigo_cr),
    CONSTRAINT hora_matricula_lancador_fkey FOREIGN KEY (matricula_lancador)
    	REFERENCES public.usuario (matricula),
    CONSTRAINT hora_matricula_gestor_fkey FOREIGN KEY (matricula_gestor)
    	REFERENCES public.usuario(matricula),
    CONSTRAINT hora_matricula_admin_fkey FOREIGN KEY (matricula_admin)
    	REFERENCES public.usuario(matricula)
);

CREATE TABLE IF NOT EXISTS public.parametrizacao
(
    id integer NOT NULL,
    hora_inicio time without time zone,
    hora_fim time without time zone,
    exclusivo_fds boolean NOT NULL DEFAULT (true),
    remuneracao SMALLINT NOT NULL,
    CONSTRAINT parametrizacao_pkey PRIMARY KEY (id)
);

INSERT INTO public.parametrizacao(
	id, hora_inicio, hora_fim, exclusivo_fds, remuneracao)
	VALUES 
	(1601, '06:00', '22:00', false, 75),
	(1602, '06:00', '22:00', false, 100),
	(3000, '22:01', '05:59', false, 75),
	(3001, '22:01', '05:59', false, 100),
	(1809, '00:00', '24:00', false, 30)
