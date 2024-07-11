# Usar la imagen oficial de Node.js
FROM node:16 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias de Angular
RUN npm install

# Copiar el resto de los archivos del proyecto Angular
COPY . .

# Compilar la aplicación Angular
RUN npm run build --prod

# Etapa final: Servir la aplicación Angular usando nginx
FROM nginx:alpine

# Copiar archivos compilados de Angular al directorio de nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80 para el servicio de nginx
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
