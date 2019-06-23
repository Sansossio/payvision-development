FROM node:11-alpine

WORKDIR /srv/app/currency

COPY currency .

RUN npm i
RUN npm run build

COPY currency .

CMD [ "npm", "run", "start:prod" ]
