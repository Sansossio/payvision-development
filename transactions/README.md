# Transactions Microservice

This microservice make all the operations relational with transactions (payvision api)

# Technologies

- Typescript
- NestJS (https://nestjs.com/)

# Environment variables
## Payvision credentials
API_ENDPOINT= Payvision endpoint
API_USERNAME= Payvision username
API_PASSWORD= Paysivion password
## Email credentials
MAILER_HOST= Smtp host
MAILER_PORT= Smtp port
MAILER_SSL= Use tls?
MAILER_USERNAME= Username
MAILER_PASSWORD= Password

# Run
With docker
`docker build -t transactions-service .`
`docker run -p 3000:3000 transactions-service`

Npm:
`npm start`

Npm debug with nodemon:
`npm run start:debug`

# Test
`npm run test`
