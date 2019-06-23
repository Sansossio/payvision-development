# Currency Microservice

This microservice make all the operations relational with currency

# Technologies

- Typescript
- NestJS (https://nestjs.com/)

# External service

Was use an external service on this microservice: https://api.exchangeratesapi.io
This service is used to currency converter operations

# Environment variables

It's not necessary

# Run

With docker
`docker build -t currency-service .`
`docker run -p 3000:3000 currency-service`

With docker-compose
`docker-compose build`
`docker-compose up`

Npm:
`npm start`

Npm debug with nodemon:
`npm run start:debug`

# Test

`npm run test`
