# Docker

## Crear una imagen de docker

### Creamos un Dockerfile de la imagen

- Es un archivo del tipo **Dockerfile** que contiene las instrucciones para montar un contenedor de docker con unas características determinadas.
- Las imágenes son inmutables, y no ejecutan la aplicación por si solas, es necesario crear un contenedor usando dicha imagen.

Ejemplo de un **Dockerfile**

```Dockerfile
#Runtime
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

```

### Ignorar ciertos archivos al crear la imagen de docker 

Para esto usaremos un archivo llamado **.dockerignore**, y el contenido del mismo serán los archivos q el **Dockerfile** debe ignorar cuando cree la imagen del docker.

Creamos el archivo `.dockerignore` y le añadimos los archivos o carpetas a ignorar:

```dockerignore
node_modules
```

### Crear la imagen

Para esto deberemos ejecutar el siguiente comando en la terminal:

```bash

docker build -t book-service:latest .

```
Detalle del comando:
- t - indica que queremos asignarle una versión a la imagen
- book-service:latest - es el nombre de la imagen y su versión
- . le indica a docker q debe buscar dentro del directorio actual un archivo **Dockerfile**