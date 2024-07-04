FROM node:20


# Directorio dentro del contenedor dónde estarán todos los archivos de la aplicación / servicio
WORKDIR /app

# Copiamos los archivos de nuestro local a ./ dentro del contenedor, dentro del WORKDIR
COPY package*.json ./

# Ejecutamos la instalación del contenido del package.json q hemos copiado en el paso anterior
RUN npm install

# Copiamos el código fuente de nuestra aplicación - copia todos los archivos del directorio book-service en el directorio /app del contenedor
COPY . . 

# Ahora añadimos los comandos q deben ejecutarse para iniciar la aplicación
CMD ["node", "./src/index.js"]