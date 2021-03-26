# Github-client

Esse é um projeto desenvolvido para relacionar tags aos repositórios starred do seu github e depois facilmente conseguir filtrar
os repositórios pelas tags relacionadas;

Nessa aplicação é possivel:
 - Fazer a autenticação pela conta do Github;
 - Criar, deletar, editar e listar Tags;
 - Listar todos os repositórios do usuário fornecido que receberam estrela do mesmo;
 - Registrar os repositórios que deseja relacionar com tags mais tarde;
 - Relacionar tags com repositórios;

# Instruções para instalar e configurar;
Para instalar o projeto e rodar localmente:
* Clonar o projeto:

    ```
    git clone https://github.com/Monamello/github-client.git
    ```
* Instalar dependências:
    ```
    yarn install
    ```
* Configurar o ambiente:
    ```
    criar um banco postgres com as credenciais registradas no arquivo database.js
    ```
* Criar um arquivo .env com as chaves OAuth do Github:
    ```
    CLIENT_ID=def8605f383ad3e8fa01
    CLIENT_SECRET=c5be45ebf063dc48ad818efc47de9871e467cd59
    ```
* Rodar as migrações:
    ```
    yarn sequelize-cli db:migrate
    ```
* Rodar o projeto:
    ```
    yarn start
    ```
# Ambiente de trabalho
## Tecnologias
 - Esse projeto foi desenvolvido com NodeJS com Sequelize, Express e outras ferramentas para manipulação do código;
 - O banco é Postgres, que para conectar com o projeto foi necessário usar os packages pg e pg-hstore;



# Rotas
Após rodar o projeto é disponibilizado um conjuto de rotas e para navegar entre elas:

### Authentication:
A autenticação do projeto é feita atráves da API do Github;

Os processos necessários para essa conexão foram:
```
- Criado CLIENT_ID e CLIENT_SECRET para conectar com o github;
- Configurado no github a rota de callback para o redirecionamento após o login;
```

* GET "/login"
     - Nessa requisição é passado o CLIENT_ID para a tela no frontend onde tem um botão que
    redireciona para realizar o login com o Github;

* GET "/callback"
     - Essa é a rota que é chamada pelo Github após a realização com sucesso do login,
    a rota redireciona para uma tela index, apenas com o intuito de mostrar que os dados
    do user podem ser acessados agora após a autenticação e para salvar o token_access no local storage;

* GET "/user"
     - Retorno dos dados do User autenticado;

Trabalhei com a parte do front apenas nesta parte da autenticação, simples porém achei necessário para mostrar como funcionaria todo o fluxo de autenticação com o Github, quanto ao restante do projeto preferi me dedicar mais ao meus conhecimentos do backend e entregar todos os requisitos;

### Tags:
As tags existem com o intuito de identificar melhor os repositórios com estrela do usuário fornecido;

* GET "/tag"
     - Retorna todas as tags criadas e registradas no db;

* POST "/tag"
     - Cria a tag e registra no db conforme o body fornecido;
    ```
    {
        "name": "Backend",
    }
    ```

* PUT "/tag/:id"
     - Edita a tag pelo id fornecido nos params e registra no db confome o novo body fornecido;
    ```
    {
        "name": "Backlog",
    }
    ```

* DELETE "/tag/:id"
     - Deleta a tag pelo id fornecido nos params;


* GET "/tag/repositories"
    ```
        /tag/repositories?name=back
    ```
     - Filtra todos os repositórios que contém a tag "back" fornecida pela query na url ou alguma tag similar, neste caso retornaria os repositórios que contém as tags tanto "Backend" quanto "Backlog";

### Repositories:
Os repositórios são registrados no banco para facilitar a manipulação e relação com Tags;

* GET "/repositories"
     - Retorna todos os repositórios do db;

* GET "/repositories/:id"
     - Retorna um repositório segundo o id passado por params com suas tags associadas;

* GET "/repositories/:user"
     - Pega todos os repositórios que o usuário fornecido no params deu estrela e registra no db;

* GET "/repositories/github/:user"
     - Retorna todos os repositórios do github em que o usuário deu estrela;

* GET "/repository/:id"
     - Pega a lista de tags enviadas pelo body e associa ao repositório com o id fornecido por params;
    ```
    {
        "name": "Backlog"
    },
    {
        "name": "Backend"
    },
    {
        "name": "Desenvolvimento"
    }
    ```

## Postman prontinho:
Caso queira testar as rotas tenho aqui um postman com todas as rotas configuradas,
o arquivo está na raiz do projeto e chama: Github-Client.postman_collection.json
para localhost ou o Github-Client.postman_collection_heroku.json com o link do heroku;

Para rodar:
 - abra o postman
 - clique em import
 - selecione este arquivo (Github-Client.postman_collection.json || Github-Client.postman_collection_heroku)


 ## Heroku
 Para deixar mais fácil de testar as rotas tem o link do heroku com o projeto rodando:
  - https://github-client-magrathea.herokuapp.com/
