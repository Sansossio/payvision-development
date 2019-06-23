FROM node:10 as builder
RUN mkdir /app
WORKDIR /app
COPY frontend .
RUN npm i node-sass
RUN npm i
ARG ENV
ENV REACT_APP_ENV="${ENV}"
RUN npm run build
FROM ubuntu
RUN apt-get update
RUN apt-get install -y apache2 && apt-get clean
RUN a2enmod rewrite
EXPOSE 80
COPY frontend/config/.htaccess /var/www/html/
COPY frontend/config/000-default.conf /etc/apache2/sites-available
COPY --from=builder /app/build /var/www/html/
RUN service apache2 restart
CMD apachectl -D FOREGROUND