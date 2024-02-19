#Crea el archivo Dockerfile configurado de forma correcta.
#Se debe partir de la imagen de node:14.
#La carpeta donde debes depositar el código del proyecto dentro del contenedor es: /var/app
#Se debe exponer el puerto 8080 desde el interior del contenedor.
#La forma de arrancar el proyecto será ejecutando “npm start”
#Crea un archivo .dockerignore, para que al construir la imagen, no se copien todos los archivos (solo los deseados).
#Configura este archivo para que ignore la carpeta “node_modules” y cualquier archivo que termine en “.log”
#Construye la imagen. Cuando la construyas, ponle el nombre “mi-app”. Una vez tengas la imagen construida, ejecútala.
#Debes dar los pasos necesarios para que el contenedor quede con la ip fija “172.30.0.10”, dentro de una red que se llame “red-nodejs”.


FROM node:14

WORKDIR /var/app

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
