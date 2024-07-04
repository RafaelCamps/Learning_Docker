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

## Crear un contenedor de Docker basado en esa imagen

- Los contenedores se crean basados en imágenes
- Se pueden crear múltiples contenedores de una misma imagen, con diferentes opciones/variables de entorno

```bash
docker run -d -p 3005:3000 --name bookService 
```

Detalles del comando
- -d  Detach mode, se ejecuta en segundo plano, así no bloquea la terminal desde la q se lanza el comando
- -p para exponer un puerto, el primero es con el q podremos acceder al contenedor, el segundo es el q tiene el servidor de express dentro del contenedor
- --name para darle un nombre al contenedor
- bookService - Nombre del contenedor
- book-service - Nombre de la imagen q vamos a usar para crear el contenedor


### Interactuar con un contenedor

#### Ver los logs

```bash
docker logs nombreContenedor
```

#### Ejecutar una consola dentro del contenedor

```bash
docker exec -it book-service bash
```

Detalles del comando
- exec - ejecutar comandos dentro del contenedor
- -it - para q se ejecuten y se muestren los resultados en la consola actual desde la q se lanza el comando
- book-service - el nombre o ID del contenedor con el q queremos interactuar
- bash - el tipo de terminal q queremos ejecutar en el contenedor


## Ejecutar múltiples contenedores - Docker-Compose

Una de las ventajas de docker es q podemos crear múltiples contenedores y q cada uno ejecute una parte del trabajo de la aplicación.

Para crear una estructura con múltiples contenedores, necesitaremos un archivo `.yaml` llamado **docker-compose** que tendrá la información de los diferentes servicios q queremos crear. 

En dicho archivo, crearemos una red para interconectar los diferentes contenedores, y que puedan comunicarse entre sí.

Al ejecutar este archivo, se crearán los contenedores necesarios, basados en las imágenes indicadas en el mismo, así como la red y los volúmenes para la persistencia de los datos.

En este archivo declararemos los servicios (contenedores) que compondrán nuestro entorno, así como la forma en la q se comunicarán.

```yaml
# version: "3.8"  - indica la versión del schema de docker-compose q vamos a usar

services:
    book-service:  //Nombre del servicio
        build: ./book-service   //Donde está el código fuente para crear este servicio/contenedor en esta ubicación se buscará un archivo Dockerfile
        image: book-service:latest  //Q imagen debemos usar para este servicio
        container_name: bookService  //Nombre q docker asignará a este contenedor
        ports:
            - 4000:3000   // puerto q exponemos fuera del contenedor : puerto interno del contenedor al q equivale
        networks:
            - app-network  //Nombre de la red desde la q se podrá acceder a este contenedor
        environment:
            - key:value // variables de entorno necesarias para el servicio q se ejecuta en el contenedor
            - DATABASE_URL=mongodb://book-service-db:27017/books  //book-service-db es el nombre de otro servicio, al q se conectará este, no el nombre del contenedor, aunq puede q sean el mismo
        depends_on:
            - book-service-db  //servicios de los q depende, q se deben ejecutar /montar antes q este
    book-service-db:
        image: mongo:latest
        container_name: book-service-db
        // en este caso no es necesario especificar un puerto, ya q no lo exponemos fuera de la red creada por docker, pero los contenedores q estén en la misma pueden acceder
        networks:
            - app-network
        volumes:
            - mongo-data:/data/db  #crea un volumen para la persistencia de datos, en la máquina, fuera del contenedor de docker
    
    # para conectar varios servicios mediante http requests, lo mejor es poner en las variables de entorno una referencia al nombre del servicio, así no tendremos problemas si cambia de ip
    loan-service:
        build: ./loan-service
        image: loan-service:latest
        ports: 
            - 5000:3001
        networks: # todos los contenedores q queremos q se puedan conectar entre sí, deben estar en la misma red.
            - app-network
        environment:
            - BOOK_SERVICE_URL=http://book-service:3000




# hay q especificarle a docker q volúmenes para persistencia de datos, queremos crear    
volumes:
    mongo-data:

# Así como q redes queremos crear
networks:
    app-network:
        driver: bridge  # para crear una red interna entre los contenedores, pero no permite q desde fuera de la red se pueda acceder a su contenido, solo los expuestos.


```
Nota: En estos archivos es muy importante el indentado.

### Conectar con una imagen de MongoDB

`mongodb://book-service-db:27017/books` 

mongodb:nombreDelContenedor:puerto/BBDD


   volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ubicación del archivo q queremos copiar : ubicación dentro del contenedor del archivo q queremos copiar (ruta absoluta)
      o bien un volumen del propio docker
      -  nombre volumen : ubicación del contenido del volumen, en el contenedor


    depends_on:
        - servicio q debe estar iniciado antes de iniciarse el q contiene esta propiedad
        - pueden ser varios

## Comunicación entre servicios en una misma red de docker usando HTTP requests


## Crear un reverse PROXY 

Consiste en crear un contenedor, q contenga un servidor web, q es el q recibe las llamadas desde el exterior, y este es el q se comunica con los servicios q están en la red de docker


En el archivo de configuración de nginx podemos llamar directamente al puerto q tiene a la escucha el servidor express, no es necesario llamar al puerto q exponemos.
Es más, si montamos un servidor proxy, podemos no exponer ningún puerto... en los servicios...