# Banco de Dados: PostgreSQL
### Descrição: Este banco de dados contém informações sobre usuários, clientes, centros de resultado, integrantes e horas registradas.


## Tabelas

<br id="topo">
<p align="center">
    <a href="#Usuario">usuario</a>  |
    <a href="#Cliente">cliente</a>  |
    <a href="#Centro_Resultado">centro_resultado</a>  |
    <a href="#Integrante">integrante</a>   |
    <a href="#Hora">hora</a>
</p>
</b>
<span id="Usuario">

### Tabela usuario
Armazena informações sobre os usuários do sistema, permitindo a autenticação e gestão de permissões de acesso.
#### Colunas

| Nome da Coluna    | Tipo         | Propriedades  | Descrição           |
| ------------------ | ------------ | ------------- | ------------------- |
| matricula          | VARCHAR(20)  | NOT NULL, PK  | Matrícula do usuário|
| nome               | VARCHAR(80)  | NOT NULL      | Nome do usuário     |
| senha              | VARCHAR(15)  | NOT NULL      | Senha do usuário    |
| funcao             | VARCHAR(20)  | NOT NULL      | Função do usuário   |
| status_usuario     | VARCHAR(10)  | NOT NULL, DEFAULT 'ativo' | Status do usuário |

<span id="Cliente">

### Tabela Cliente
Armazena informações sobre clientes, permitindo que sejam atrelados ao lançamento da hora.
#### Colunas

| Nome da Coluna    | Tipo         | Propriedades  | Descrição           |
| ------------------ | ------------ | ------------- | ------------------- |
| cnpj               | VARCHAR(14)  | NOT NULL, PK  | CNPJ do cliente     |
| razao_social       | VARCHAR(150) | NOT NULL      | Razão social do cliente |
| status_cliente     | VARCHAR(10)  | NOT NULL, DEFAULT 'ativo' | Status do cliente |

<span id="Centro_Resultado">

### Tabela centro_resultado
Armazena informações sobre os centros de resultados, ou seja, unidades organizacionais dentro da empresa criadas para gerenciar e controlar recursos específicos e alcançar metas de desempenho definidas
#### Colunas
| Nome da Coluna    | Tipo         | Propriedades  | Descrição           |
| ------------------ | ------------ | ------------- | ------------------- |
| nome               | VARCHAR(30)  | NOT NULL      | Nome do centro de resultado |
| codigo_cr          | VARCHAR(10)  | NOT NULL, PK  | Código do centro de resultado |
| sigla              | VARCHAR(10)  | NOT NULL, UNIQUE | Sigla do centro de resultado |
| status_cr          | VARCHAR(10)  | NOT NULL, DEFAULT 'ativo' | Status do centro de resultado |

<span id="Integrante">

### Tabela integrante
Armazena os usuários que fazem parte do centro de resultado. Além disso, explicita se são gestores desse centro.
#### Colunas
| Nome da Coluna       | Tipo         | Propriedades  | Descrição           |
| --------------------- | ------------ | ------------- | ------------------- |
| gestor               | BOOLEAN      | NOT NULL      | Indica se o usuário é gestor |
| matricula_integrante | VARCHAR(20)  | NOT NULL      | Matrícula do usuário |
| cod_cr               | VARCHAR(10)  | NOT NULL      | Código do centro de resultado ao qual o integrante pertence |
| PRIMARY KEY          | (matricula_integrante, cod_cr) | Chave primária composta |
| FOREIGN KEY                | (cod_cr) REFERENCES public.centro_resultado (codigo_cr) | Chave estrangeira para a tabela centro_resultado |
| FOREIGN KEY                | (matricula_integrante) REFERENCES public.usuario (matricula) | Chave estrangeira para a tabela usuario |

<span id="Hora">

### Tabela hora
Armazena as horas lançadas no sistema, assim como quem está lançando, seu centro de resultado e o cliente.
#### Colunas
| Nome da Coluna            | Tipo               | Propriedades  | Descrição           |
| -------------------------- | ------------------ | ------------- | ------------------- |
| id                         | SERIAL             | NOT NULL, PK  | ID da hora registrada |
| codigo_cr                  | VARCHAR(10)        | NOT NULL      | Código do centro de resultado associado à hora |
| matricula_lancador         | VARCHAR(20)        | NOT NULL      | Matrícula do usuário que lançou a hora |
| cnpj_cliente               | VARCHAR(14)        | NOT NULL      | CNPJ do cliente associado à hora |
| data_hora_inicio           | TIMESTAMP          | NOT NULL      | Data e hora de início do registro de hora |
| data_hora_fim              | TIMESTAMP          | NOT NULL      | Data e hora de término do registro de hora |
| tipo                       | VARCHAR(20)        |               | Tipo de registro de hora |
| justificativa_lancamento   | VARCHAR(500)       | NOT NULL      | Justificativa para o lançamento da hora |
| projeto                    | VARCHAR(100)       | NOT NULL      | Projeto associado à hora |
| solicitante_lancamento     | VARCHAR(80)        | NOT NULL      | Solicitante do lançamento da hora |
| FOREIGN KEY                | (cnpj_cliente) REFERENCES public.cliente (cnpj) | Chave estrangeira para a tabela cliente |
| FOREIGN KEY                | (codigo_cr) REFERENCES public.centro_resultado (codigo_cr) | Chave estrangeira para a tabela centro_resultado |
| FOREIGN KEY                | (matricula_lancador) REFERENCES public.usuario (matricula) | Chave estrangeira para a tabela usuario |
