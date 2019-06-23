FROM node:11-alpine

WORKDIR /srv/app/transactions

COPY transactions .

RUN npm i
RUN npm run build

COPY transactions .

CMD [ "npm", "run", "start:prod" ]
