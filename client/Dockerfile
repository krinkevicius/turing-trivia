FROM node:20.11.1-alpine3.19 AS builder

WORKDIR /app

COPY ../package*.json .
COPY client/package*.json client/
COPY server/package*.json server/
RUN npm ci

COPY . .

ARG VITE_SOCKET_ORIGIN
ARG VITE_SOCKET_PORT
ARG VITE_SENTRY_CLIENT_DSN

WORKDIR /app/client
RUN npm run build

FROM nginx:1.25.3-alpine3.18

RUN rm /usr/share/nginx/html/* -rf

COPY client/nginx/default.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 80

# Start Nginx.
CMD ["nginx", "-g", "daemon off;"]