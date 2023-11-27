![3](https://github.com/codecatss/API-BD3/assets/108769169/4b3d05cb-e99d-4c51-8ef2-31c987e94521)

<br id="topo">
<p align="center">
    <a href="#sobre">Projeto</a>  |
    <a href="#backlogs">Backlog do produto</a>  |
    <a href="#entrega">Entrega das Sprints</a>  |
    <a href="#manual">Manual do Usuário</a> |
    <a href="#prototipo">Protótipo</a>   |
    <a href="#tecnologias">Tecnologias utilizadas</a>  |
    <a href="#linguagens">Linguagens utilizadas</a>  |
    <a href="#equipe">Equipe</a>
</p>

<span id="sobre">

## :page_with_curl: O Projeto
<br></br>
![5](https://github.com/codecatss/API-BD3/assets/108769169/ba43707c-72fa-456b-a4a9-0945acc5bf05)
> Projeto baseado na metodologia ágil SCRUM.

<span id="backlogs">



## :dart: Backlog do produto

<table>
  <thead>
    <tr>
      <th>COMO UM</th>
      <th>EU PRECISO</th>
      <th>PARA</th>
      <th>PRIORIDADE</th>
      <th>SPRINT</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Administrador</td>
      <td>Adicionar colaboradores e gestores, editar ou inativar</td>
      <td>Que o CR possa utilizar o sistema</td>
      <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <td>Administrador</td>
      <td>Adicionar novos clientes, editar ou inativar</td>
      <td>Que o CR possa utilizar o sistema</td>
      <td>2</td>
      <td>1</td>
    </tr>
    <tr>
      <td>Administrador</td>
      <td>Adicionar centro de resultado, editar ou inativar</td>
      <td>Que o CR possa utilizar o sistema</td>
      <td>3</td>
      <td>1</td>
    </tr>
    <tr>
      <td>Administrador</td>
      <td>Adicionar novos integrantes e nomear um gestor para um centro de resultado</td>
      <td>Que o CR possa trabalhar nos projetos</td>
      <td>4</td>
      <td>1</td>
    </tr>
    <tr>
      <td>Colaborador</td>
      <td>Lançar minhas horas extras</td>
      <td>Serem registradas e aprovadas por um gestor</td>
      <td>5</td>
      <td>1</td>
    </tr>
    <tr>
      <td>Colaborador</td>
      <td>Lançar meus sobreavisos</td>
      <td>Serem registradas e aprovadas por um gestor</td>
      <td>6</td>
      <td>1</td>
    </tr>
    <tr>
      <td>Gestor</td>
      <td>Lançar minhas horas extras</td>
      <td>Serem registradas e aprovadas por um Administrador</td>
      <td>7</td>
      <td>1</td>
    </tr>
    <tr>
      <td>Gestor</td>
      <td>Lançar meus sobreavisos</td>
      <td>Serem registradas e aprovadas por um Administrador</td>
      <td>8</td>
      <td>1</td>
    </tr>
    <tr>
      <td>Gestor</td>
      <td>Apontar ou não as horas lançadas por um colaborador</td>
      <td>Repassar ao RH</td>
      <td>9</td>
      <td>2</td>
    </tr>
    <tr>
      <td>Administrador</td>
      <td>Consultar e aprovar as horas extras e sobreavisos apontadas pelos gestores</td>
      <td>Serem pagas</td>
      <td>10</td>
      <td>2</td>
    </tr>
    <tr>
      <td>Usuário</td>
      <td>Acessar o sistema através da matrícula e senha</td>
      <td>Visualizar minha área de navegação</td>
      <td>11</td>
      <td>2</td>
    </tr>
    <tr>
      <td>Administrador</td>
      <td>Poder acessar as informações de parametrização</td>
      <td>Padronizar o sistema com valores a serem pagos pelas horas</td>
      <td>12</td>
      <td>2</td>
    </tr>
    <tr>
      <td>Colaborador</td>
      <td>Acessar meu painel de controle para visualizar informações sobre as horas já registradas, com a capacidade de filtrar por período, equipe e obter uma visão geral abrangente</td>
      <td>Gerenciar e monitorar minhas informações de lançamento individual.</td>
      <td>13</td>
      <td>3</td>
    </tr>
    <tr>
      <td>Gestor</td>
      <td>Acessar meu painel de controle para visualizar informações sobre as horas que já foram registradas, bem como detalhes sobre minha equipe. Além disso, desejo a capacidade de aplicar filtros às informações conforme necessário</td>
      <td>Acompanhar todas as minhas informações de lançamentos individuais, bem como monitorar informações relacionadas às equipes das quais sou gestor.</td>
      <td>14</td>
      <td>3</td>
    </tr>
    <tr>
      <td>Administrador</td>
      <td>Acessar o dashboard a fim de facilitar a visualização abrangente de informações compartilhadas entre colaboradores, gestores e centros de resultados, permitindo também a aplicação de filtros para uma análise mais precisa</td>
      <td>Monitorar o desempenho de todos os participantes do sistema</td>
      <td>15</td>
      <td>3</td>
    </tr>
    <tr>
      <td>Administrador</td>
      <td>Visualizar as horas com suas respectivas verbas selecionadas</td>
      <td>Realizar o pagamento adequado a cada hora lançada e aprovada</td>
      <td>16</td>
      <td>4</td>
    </tr>
    <tr>
      <td>Administrador</td>
      <td>Gerar um relatório com base nas informações e período que eu selecionar</td>
      <td>Exportar como CSV</td>
      <td>17</td>
      <td>4</td>
    </tr>
  </tbody>
</table>


<span id="entrega">

## :white_check_mark: Entrega das Sprints

| **SPRINT** | **PERÍODO**| **O QUE SERÁ ENTREGUE** |
|:-------------:|:-----------------------:|:-------------------------:|
|  01  | 04/09 a 24/09 | Sistema de cadastro e sistema de lançamento de horas |
|  02  | 25/09 a 15/10 | Sistema de apontamento de horas do gestor, sistema de aprovação do administrador e sistema de gerenciamento de verbas |
|  03  | 16/10 a 05/19 | Sistema dashboards e visualizações gerais das horas |
|  04  | 06/11 a 26/11 | Sistema de extração de relatórios em CSV |

<span id="manual">

## 👣 Manual do Usuário

- <a href="https://github.com/codecatss/API-BD3/wiki/Manual-do-Usu%C3%A1rio">Manual do Usuário</a>

<span id="prototipo">

## :computer: Protótipo
- <a href="https://www.figma.com/proto/8vSYUz2vXHStMQyV5PRwjg/Telas-ADM?page-id=0%3A1&type=design&node-id=245-12&viewport=-624%2C814%2C0.44&t=nn4yAOXzbSdnAbSJ-1&scaling=min-zoom&starting-point-node-id=204%3A3&mode=design">Telas do ADM</a>

<br>

- <a href="https://www.figma.com/proto/SRlYvOtqT3aanoUjeVhF7I/Telas-Usu%C3%A1rio?page-id=0%3A1&type=design&node-id=257-971&viewport=-1630%2C195%2C0.42&t=DTxKuXXheJMw9522-1&scaling=min-zoom&mode=design">Tela do Usuário</a>

<br>

- <a href="https://www.figma.com/proto/V082qgtKEwamDaDpHOhhEE/Telas-Gestor?page-id=0%3A1&type=design&node-id=257-971&viewport=205%2C360%2C0.1&t=u58E8K3Sb5eBXItg-1&scaling=min-zoom&mode=design">Tela do Gestor</a>

<span id="tecnologias">

## :wrench: Tecnologias
![7](https://github.com/codecatss/API-BD3/assets/108769169/8f6798ae-6f20-4154-9560-dabd4fd93ab8)
> Canva, Docker, Postgres, Jira, Visual Studio Code, IntelliJ, Slack, Figma, Insomnia, Dbeaver, GitHub, Excel

<span id="linguagens">

## 📖 Linguagens
![9](https://github.com/codecatss/API-BD3/assets/108769169/9570a6fa-42d5-4b41-b46c-16c6fdeed9d5)
> Java, HTML5, CSS3, JavaScript, Spring Boot, Hibernate

<span id="equipe">

## :busts_in_silhouette: Equipe
![Equipe](https://github.com/codecatss/API-BD3/assets/108769169/9f3ff1d9-0010-43ce-b158-f5a996b79a29)


|    Função     | Nome    |    LinkedIn & GitHub      |
| :-----------: | :------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Scrum Master | Larissa Reis        |     [![Linkedin Badge](https://img.shields.io/badge/Linkedin-blue?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/larissa-reis-693568250/) [![GitHub Badge](https://img.shields.io/badge/GitHub-111217?style=flat-square&logo=github&logoColor=white)](https://github.com/larissa-fernanda)              |
| Product Owner | Laroy Prado      |     [![Linkedin Badge](https://img.shields.io/badge/Linkedin-blue?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/laroyprado/) [![GitHub Badge](https://img.shields.io/badge/GitHub-111217?style=flat-square&logo=github&logoColor=white)](https://github.com/laroyprado)              |
| Developer| Christopher Silva         |     [![Linkedin Badge](https://img.shields.io/badge/Linkedin-blue?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/christophercs) [![GitHub Badge](https://img.shields.io/badge/GitHub-111217?style=flat-square&logo=github&logoColor=white)](https://github.com/chriskryon) |
| Developer | Nicole Souza           |     [![Linkedin Badge](https://img.shields.io/badge/Linkedin-blue?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/nicolem-souza/) [![GitHub Badge](https://img.shields.io/badge/GitHub-111217?style=flat-square&logo=github&logoColor=white)](https://github.com/NicSouza)              |
| Developer | Willian Danko      |     [![Linkedin Badge](https://img.shields.io/badge/Linkedin-blue?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/willian-danko-leite-caboski-5410741b4) [![GitHub Badge](https://img.shields.io/badge/GitHub-111217?style=flat-square&logo=github&logoColor=white)](https://github.com/DankoCaboski)

→ [Voltar ao topo](#topo)




