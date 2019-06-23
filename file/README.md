# Currency Microservice

This microservice make all the operations relational with files (pdf, templates and csv)

# Technologies

- Typescript
- NestJS (https://nestjs.com/)
- Puppeteer (chromium)

# Environment variables

It's not necessary

# Run

With docker
`docker build -t file-service .`
`docker run -p 3000:3000 file-service`

Npm:
`npm start`

Npm debug with nodemon:
`npm run start:debug`

# Test

`npm run test`
