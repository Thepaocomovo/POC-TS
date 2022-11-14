<h1>BookShelf</h1>

An API created to manege a virtual bookShelf.

<h2>About this project</h2>

This project idea came out of a way to solve a commom problem between the readers community, where almost everyone would like to have an online place to catalog their readings.

<h2>Used technologies</h2>

Typescript
Express 
PostgreSQL 

<h2>How to run</h2>

1. clone this repository
2. install the dependencies through the following command:

npm i

3. connect to postgres
4. create a postgres database 
5. populate the database with dump file in this repository

psql NAME_OF_DATABASE < dump.sql

6. create and configure the .env file using the patterns in .env.example 

7. run the server with the following command

npm start


<h2>rotas</h2>


<h3>sign-up:</h3>

POST 
"/sign-up"

body:
{
  "name": "joao",
  "email": "joao@email.com",
  "password": "#123123Ab"
}

response:

400 Bad Request
{
  "message": "body error explanation"
}

409 Conflict
"email already registered"

201 Created


==========================================================================


<h3>sign-in:</h3>

POST 
"/sign-in"

body:
{
  "email": "junin@email.com",
  "password": "#123123Ab"
}

response: 

400 Bad Request
{
  "message": "body error explanation"
}

401 Unauthorized 
"wrong email or password"

200 OK
{
token: "token criptografado" 
}


==========================================================================


<h3>create new book:</h3>

POST
"/books"

headers:
Authorization: Bearer token 

body:
{
  "name": "nome do livro",
  "author": "autor do livro",
  "pages": 100, //should be a number
  "read": false //boollean who define if user have read the book
}

response:

400 Bad Request
{
  "message": "explicação de erro no body"
}

400 Bad Request
when header authorization is missing

201 Created


==========================================================================


<h3>get all user books:</h3>

headers:
Authorization: Bearer token 

GET
"/books"

response:

200 OK
[
  {
    "id": 7,
    "createdAt": "2022-11-12T18:47:30.048Z",
    "name": "livro",
    "author": "autor do livro",
    "pages": 100
  },
  {
    "id": 8,
    "createdAt": "2022-11-12T18:48:30.646Z",
    "name": "livro",
    "author": "autor do livro",
    "pages": 100
  }
]

400 Bad Request
when header authorization is missing


==========================================================================


<h3>get book:</h3>

GET
"/book/:id" 

headers:
Authorization: Bearer token 

response:

400 Bad Request
when header authorization is missing

200 OK
{
  "createdAt": "2022-11-12T18:50:06.057Z",
  "bookId": 10,
  "read": true, //boollean who define if user have read the book
  "name": "nome do livro",
  "author": "autor do livro",
  "pages": 100
}


==========================================================================


<h3>delete book:</h3>

DELETE
/book/:id

headers:
Authorization: Bearer token 

repsonse:

400 Bad Request
when header authorization is missing

204 No Content


==========================================================================


<h3>edit book:</h3>

PUT
/book/:id

headers:
Authorization: Bearer token 

body:
{
  "name": "nome do livro",
  "author": "autor do livro",
  "pages": 100, //deve ser um numero
  "read": false //boollean who define if user have read the book
}


response:

400 Bad Request
when header authorization is missing

404 Not Found
when the user doesn't have the book on their shelf

200 OK


==========================================================================


<h3>get read pages number:</h3>


GET
/pages

headers:
Authorization: Bearer token 

response:

400 Bad Request
when header authorization is missing

200 OK
{
pages: 500
}





