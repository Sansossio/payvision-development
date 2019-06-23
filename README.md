# Payvision

Hello! My name is Julio Sansossio, this is my backend test :) (https://github.com/payvision-development/recruitment-challenges/tree/fullstack-engineer)
## Technologies
### Common (backend and frontend)
- Docker
- NodeJS

### Backend
- TypeScript
- NestJS (As a framework)
- Puppeteer (pdf)

### Frontend
- ReactJS [its my favorite :)]

## Architecture
I decided to use an architecture based on "services" (or microservice, it depends of you definition of microservices) because with this, the future maintenance, testing and understaing is more efficient (an easier)

## Principal features
- Listing transactions
- Reporting of transactions
- Detail transactions
- Creation of pdf (transactions and reports)
- Send emails (transactions and reports)

## How to run?
Its very easy! Only run the next commands:
```sh docker-compose build```
```sh docker-compose up``` 

The build is slow, because this repository has 4 projects (3 backend and 1 frontend), and special one "file-service" is slow, because to the correct work it needs some native OS dependencies, like "chromium".

## And, what about testing?
Of course this was thinking, 3 of the 4 projects has tests (frontend has not testing because I did not have time). To run tests is easy, you only need go to every backend folder and run:
```sh npm i```
```sh npm run test```
That tests are basics, because the system is basic.

## Default swagger
After run docker-compose (without edit) swaggers are in:
- http://localhost:3000 (transactions service)
- http://localhost:4000 (currency service)
- http://localhost:9000 (file service)

## Why?
#### TypeScript
When you write code in typescript, unlike nodejs, you have a control more exactly of the code, because with typescript you can manage types of receive/response, tests more exactly etc...

### Puppeteer
Puppeteer use chromium as core, when you make pdf with this, the result is closer to the html file, and it is more effective in time to team (for general, frontend)

### NestJS
NestJS is a beautiful framework based on typescript, it has a lot of utils packages, decorators, etc.
Its compatible with a lot of ORM, like TypeOrm (my favorite), Sequelize, mongoose and more, this is very useful when you need use differents database on a single backend.
I think, the most utility of typeorm are: 
- Simple migrations system
- Sincronize system (for develop is amazing)
- An amazing compatibily with postgres

### ReactJS
Every one know exists "react", or not? I dont need explain because I use it, I guess.

### Docker
Docker is amazing for development and production environments.
this is a test, so i thought the test revissor has not time to install all dependencies of each test. For that reason with a pair of commands they can tests my code.
# Environment variables per project
### Transactions service:
#### Payvision credentials
API_ENDPOINT= Payvision endpoint
API_USERNAME= Payvision username
API_PASSWORD= Paysivion password
#### Email credentials
MAILER_HOST= Smtp host
MAILER_PORT= Smtp port
MAILER_SSL= Use tls?
MAILER_USERNAME= Username
MAILER_PASSWORD= Password

### Frontend
REACT_APP_API= Endpoint transactions service (is optional, default: http://localhost:3000)

On the "docker-compose" file you have an example.
Username and password for payvision services is written in this file, because is a development api (and its not expose in frontend, obvious) so, you only need run a simple command.

## PD:
Excuse my English, I'm working to improve it
