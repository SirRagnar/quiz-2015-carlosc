# Quiz el juego de las pregunas

Ejercicio del curso de [Desarrollo de servicios en la nube con HTML5, Javascript y node.js](https://www.miriadax.net/web/javascript-node-js)

El resultado del ejercicio está desplegado en [heroku](https://quiz-2015-carlosc.herokuapp.com/).

## Build & development

Ejecuta `npm install` para instalarlo y `foreman start` para arrancarlo.

Es necesario tener instalado el toolbelt de heroku para arrancarlo


## Configuración de la base de datos en local

En local se crea el fichero .env, que también se agrega al .gitignore por lo que no está trackeado. Este es el contenido del fichero.env en local:

```
DATABASE_URL=sqlite://:@:/
DATABASE_STORAGE=quiz.sqlite
```
De esta forma se emula el entorno de heroku en local para sqlite
