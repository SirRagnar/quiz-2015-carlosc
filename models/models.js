var path=require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
// Descomentar para que funcione con npm start
//var process=process ||{};process.env = process.env || {DATABASE_STORAGE:'quiz-noenv.sqlite',DATABASE_URL:'sqlite://:@:/' };console.log('process.env' + process.env);
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;


console.log('Variables de la cadena de conexión presuntamente establecidas: \n'+
	'ulr: ' + url + '\n' +
	'DB_name:' + DB_name + '\n' +
	'user:' + user + '\n' +
	//'pwd:' + pwd + '\n' +
	'protocol:' + protocol + '\n' +
	'dialect:' + dialect + '\n' +
	'port:' + port + '\n' +
	'host:' + host + '\n' +
	'storage:' + storage 
	);

// Cargar modelo ORM
var Sequelize=require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, 
  { dialect:  dialect,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }      
);

var tematica = {
		ciencia:     {codigo:'ciencia', descripcion: 'Ciencia'},
		humanidades: {codigo:'humanidades', descripcion: 'Humanidades'},
		tecnologia:  {codigo:'tecnologia', descripcion: 'Tecnología'},
		ocio:        {codigo:'ocio', descripcion: 'Ocio'},
		otro:        {codigo:'otro', descripcion: 'Otro'}
};

// Importar la definición de las tablas Quiz
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

// Agregar un atributo con las temáticas posibles
Quiz.tematica=tematica;

exports.Quiz=Quiz; // Exportar la definición de la tabla Quiz

// Inicialización de la tabla
sequelize.sync().then(function(){
	Quiz.count().then(function(count){
		if(count===0){ // La tabla se inicializa sólo si está vacía
			
			Quiz.create({
				tema: tematica.humanidades.codigo,
				pregunta: 'Capital de Italia',
				respuesta: 'Roma'
			});
			
			Quiz.create({
				tema: tematica.humanidades.codigo,
				pregunta: 'Capital de Portugal',
				respuesta: 'Lisboa'
			});
			
		}
	}).then(function(){console.log('Base de datos inicializa')});
});