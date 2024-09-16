FROM node:iron as build

WORKDIR /usr/local/static

COPY ./ /usr/local/static

RUN npm i
RUN npm run build

FROM nginx:latest

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/local/static /usr/share/nginx:w/html

EXPOSE 80
