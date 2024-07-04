
# CLI commands Docker


Command | Description | Comments
---|---|---
`docker build -t book-service:latest . ` | Crea una imagen | -t para darle nombre // . para indicar el directorio en el q está el Dockerfile 
`docker image ls` | Lista todas las imágenes de docker q tenemos en nuestro contexto | .
`docker run -d -p 3005:3000 --name nombreContenedor nombreImagen` | Inicia un contenedor de docker | .. 
`docker container ls` | Lista los contenedores de docker | .
`docker ps` | Lista los contenedores de docker | .. 
`docker stop nombreContenedorAParar/ContainerID` | Para un contenedor por el nombre o la id | .
`docker rm nombreContenedor` | Para borrar un contenedor | .. 
`docker logs nombreContenedor` | Para ver los logs del contenedor | .
`docker exec -it ` | . | .. 
`docker ` | . | .
`docker ` | . | .. 
`docker pull nombreImagen ` | Para descargar imagenes de contenedores de docker, desde DockerHub a nuestro entorno local | .
`docker ` | . | .. 
`docker compose up -d --build` | Para ejecutar el docker-compose file, y crear los contenedores. | -d (detached mode) --build (creando las imagenes si fuera necesario)