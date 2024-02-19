# Establece la imagen base de Docker como Node.js versión 14
FROM node:14

# Establece el directorio de trabajo dentro del contenedor como /var/app
WORKDIR /var/app

# Copia todos los archivos y directorios del contexto de construcción (el directorio local) al directorio de trabajo del contenedor
COPY . .

# Expone el puerto 8080 para que pueda ser accesible desde fuera del contenedor
EXPOSE 8080

# Define el comando por defecto para ejecutar la aplicación Node.js cuando el contenedor se inicia
CMD ["npm", "start"]
