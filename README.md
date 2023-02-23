# ZetaProject

<p>Este é um desafio técnico(backend) do processo seletivo da Zeta.</p>
<p>É avaliado capacidade de realizar operações básicas de criação, leitura, atualização e remoção de dados seguindo os padrões de projetos de uma API RESTful e arquitetura separada por camadas de responsabilidades únicas.</p>

## Sumário

- [Back-end](https://github.com/RodrigoLMarques/ZetaProject#backend)
- [Executando o projeto](https://github.com/RodrigoLMarques/ZetaProject#executando-o-projeto)
- [Executando os testes](https://github.com/RodrigoLMarques/ZetaProject#executando-os-testes)
- [Usando a API REST](https://github.com/RodrigoLMarques/ZetaProject#usando-a-api-rest)


## Backend

O back-end do projeto é formado pelo banco de dados, que armazena os dados das pessoas dos usuários, e pela API, que controla o acesso ao banco de dados a partir de requisições feitas em um client.

### Banco de dados

O banco de dados utilizado é o `Postgres`, um banco relacional.

Possuindo apenas uma única tabela, sendo a de Usuários.

#### User

| id | name | email | password | contact |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| integer | string | string | string | string |

- `id`: identificador único da pessoa usuária.
- `name`: nome da pessoa usuária.
- `email`: email único da pessoa usuária.
- `password`: senha da pessoa usuária.
- `contact`: contato da pessoa usuária.

### API Features

A API desenvolvida possui esses seguintes recursos:

- [x] Cadastro de usuário.
- [x] Listar todos os usuários.
- [x] Listar um dos usuários.
- [X] Atualizar usuário.
- [X] Deletar usuário.
- [X] Login de usuário gerando token.

### Tecnologias

As seguintes são as principais tecnologias usadas na construção do projeto:

- [Express](https://expressjs.com/pt-br/): para construir o servidor da API.
- [Prisma](https://www.prisma.io/): para mapear as entidades do banco de dados em objetos.
- [Json Web Token](https://jwt.io/): para gerar e validar tokens de acesso usados em endpoints da API.
- [Joi](https://joi.dev/): para validar os dados enviados à API.
- [bcrypt](https://www.npmjs.com/package/bcrypt): para gerar o hash das senhas das pessoas usuárias que serão guardados no banco de dados.

### Arquitetura

A arquitetura baseada na criação da API foi o modelo `MSC` (Model Service Controller), contendo cada camada responsabilidades únicas.

- `Controller`: A camada de controle é responsável por intermediar as requisições enviadas pelo Client com as respostas fornecidas pelo Service.
- `Service`: A camada de serviço é resonsável pelas validações e agrupar as regras de negócios da aplicação.
- `Model`: A camada de model é responsável pelo acesso e manipulação dos dados da aplicação.

![MSC](https://user-images.githubusercontent.com/102917955/220129108-b18b89cc-967f-470a-b9c6-8d824855ff35.png)

## Executando o projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com) e o [Docker](https://www.docker.com/).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).

### Passo a passo

</br>

1. Clone o este repositório:

``` bash
git clone https://github.com/RodrigoLMarques/ZetaProject
```

2. Na raiz do projeto instale as dependências e execute o composer do docker:

``` bash
npm install
docker compose -f docker-compose.dev.yml up -d
```

3. Acesse o terminal do container da API com o comando abaixo:

``` bash
docker exec -it zeta-project sh
```

4. No terminal do container da API, execute o seguinte comando:

``` bash
npx prisma migrate dev
```

Assim os containers se ativaram e o servidor da aplicação já vai estar rodando em `http://localhost:3000` pronto para serem usados.

## Executando os testes

Foram feitos testes unitários e de integração para cada endpoint da API usando `Jest` e `Supertest`.

Para executar os testes, siga os seguintes passos:

1. Acesse o terminal do container da API com o comando abaixo:

``` bash
docker exec -it zeta-project sh
```

2. No terminal do container da API, execute o seguinte comando:

``` bash
npm test
```

## Usando a API REST

Você pode acessar a API REST do servidor usando os seguintes endpoints:

### `GET`

- `/api/users`: Buscar todos os usuários.
- `/api/users/<int:id>`: Buscar um único usuário.

### `POST`

- `/api/users`: Criar um novo usuário.
  - Body:
    - `name: String` (required): O nome do usuário.
    - `email: String` (required): O endereço de e-mail do usuário.
    - `contact: String` (required): O contato do usuário.
    - `password: String` (required): A senha do usuário.
    
- `/api/login`: Login do usuário
  - Body:
    - `email: String` (optional): O endereço de e-mail do usuário.
    - `password: String` (optional): A senha do usuário.

### `PUT`
- `/api/users/<int:id>`: Atualizar um usuário.
  - Body:
    - `name: String` (optional): O nome do usuário a ser alterado.
    - `email: String` (optional): O endereço de e-mail do usuário a ser alterado.
    - `contact: String` (optional): O contato do usuário a ser alterado.
    - `password: String` (optional): A senha do usuário a ser alterado.
  - Token:
    - `Bearer Token` (required): Token de login do usuário.
    
### `DELETE`
- `/api/users/<int:id>`: Excluir um usuário.
  - Token:
    - `Bearer Token` (required): Token de login do usuário.
 
