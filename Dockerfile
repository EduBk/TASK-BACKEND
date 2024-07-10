FROM node:20-alpine

WORKDIR /app

COPY package*.json /app

RUN npm ci

COPY tsconfig*.json /app

COPY . .

EXPOSE 8000

CMD [ "npm", "start" ]