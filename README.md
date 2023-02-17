# ZetaProject

<p>Desafio técnico(backend) do processo seletivo da Zeta</p>
<p>É avaliado capacidade de realizar operações básicas de criação, leitura, atualização e remoção de dados seguindo os padrões de projetos de uma API RESTful e arquitetura separada por camadas de responsabilidades únicas.</p>

## Features

- [x] Cadastro de usuário
- [x] Listar todos os usuários
- [x] Listar um dos usuários
- [X] Atualizar usuário
- [X] Deletar usuário
- [X] Login de usuário gerando token

## Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Prisma ORM](https://www.prisma.io/)
- [JWT](https://jwt.io/)

## Instalando

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Docker](https://www.docker.com/), [Node.js](https://nodejs.org/en/download/) ou [Yarn](https://yarnpkg.com/en/docs/install). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

<details><summary>Utilizando o docker(recomendado)</summary>

</br>

Clone o este repositório:

```
git clone https://github.com/RodrigoLMarques/ZetaProject
```

Execute o composer do docker:

```
docker compose -f docker-compose.dev.yml up
```

Assim os containers se ativaram e o servidor da aplicação já vai estar rodando em `http://localhost:3000`. Você pode enviar as solicitações de API implementadas em `index.js`, e.g. [`http://localhost:3000/api/`](http://localhost:3000/api/).

</details>

### 1. Fazendo o dowload do projeto (npm)

Clone o este repositório:

```
git clone https://github.com/RodrigoLMarques/ZetaProject
```

Instale as dependências:

```
cd ZetaProject
npm install
```

### 2. Crie e seed o banco de dados

Tenha um servidor postgres rodando na porta `5432` e crie um banco de dados chamado `zetaproject`, após isso execute o seguinte comando para cria a tabela `User` que são definidas em [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

Quando executado `npx prisma migrate dev` é criado uma nova tabela, e o seeding também é acionada. O arquivo seed em [`prisma/seed.ts`](./prisma/seed.ts) será executado e seu banco de dados será preenchido com os dados de amostra.

### 3. Inicie o servidor da API REST

Renomeie `.env.example` para `.env` e execute este comando para iniciar o servidor:

```
npm run dev
```

O servidor agora está rodando em `http://localhost:3000`. Você pode enviar as solicitações de API implementadas em `index.js`, e.g. [`http://localhost:3000/api/`](http://localhost:3000/api/).

### 4. Testanto os endpoints

Os testes estão localizados na pasta `tests`. 

```
npm test
```

## Usando a API REST

Você pode acessar a API REST do servidor usando os seguintes endpoints:

### `GET`

- `/api/users`: Buscar todos os usuários
- `/api/users/:id`: Buscar um único usuário

### `POST`

- `/api/users`: Criar um novo usuário
  - Body:
    - `name: String` (required): O nome do usuário 
    - `email: String` (required): O endereço de e-mail do usuário
    - `contact: String` (required): O contato do usuário 
    - `password: String` (required): A senha do usuário 
    
- `/api/login`: Login do usuário
  - Body:
    - `email: String` (optional): O endereço de e-mail do usuário
    - `password: String` (optional): A senha do usuário 

### `PUT`
- `/api/users/:id`: Atualizar um usuário
  - Body:
    - `name: String` (optional): O nome do usuário 
    - `email: String` (optional): O endereço de e-mail do usuário
    - `contact: String` (optional): O contato do usuário 
    - `password: String` (optional): A senha do usuário 
  - Token:
    - `Bearer Token` (required): Token de login do usuário
    
### `DELETE`
- `/api/users/:id`: Excluir um usuário
   - Token:
    - `Bearer Token` (required): Token de login do usuário
 




