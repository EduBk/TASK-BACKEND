#Etapa 1: Construye la aplicacion.
FROM node:20 as builder

#Define directorio donde vivira la app.
WORKDIR /usr/src/app

#Copia los package's al directorio de nuestra app.
COPY package*.json ./

RUN npm install

#Copia el proyecto.
COPY . .
RUN npm run build


#Etapa 2: Construye la imagen en base a la etapa #1 para mayor optimizacion.
FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./

#Expone el puerto
EXPOSE 3001

CMD [ "npm", "start" ]