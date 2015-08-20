'use strict';

var express = require('express');
var router = express.Router();

// Declaración del controller de preguntas
var quizController = require('../controllers/quiz_controller');

// Declaración del controlador de comentarios
var commentController = require('../controllers/comment_controller');

// Declaración del controlador de página de autor
var authorController = require('../controllers/author_controller');

// Controlador de sesiones
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz',errors:[] });
});

/* Autoload de comandos con :quizId */
router.param('quizId', quizController.load); // autolad :quizId
router.param('commentId', commentController.load); // autoload :commentId

// Definición de rutas de sesión
router.get('/login', sessionController.new);      // Formulario de login
router.post('/login', sessionController.create);  // Crear sesión
router.get('/logout', sessionController.destroy); // Destruir sesión
router.get('*', sessionController.autologout);

//////////////////////
// API Rest de quizes
//////////////////////
// La lista de recursos es la primera del API y se resuelve en el controlador con index.
router.get('/quizes',                      quizController.index);
// Ruta para crear una pregunta nueva
router.get('/quizes/new',                  sessionController.loginRequired, quizController.new);
// Ruta de respuesta tras crear la pregunta
router.post('/quizes/create',              sessionController.loginRequired, quizController.create);
// Ruta para iniciar la edición de una pregunta
router.get('/quizes/:quizId(\\d+)/edit',   sessionController.loginRequired, quizController.edit);
// Ruta que hace el put para actualizar una pregunta
router.put('/quizes/:quizId(\\d+)',        sessionController.loginRequired, quizController.update);
// Ruta para eliminar una pregunta
router.delete('/quizes/:quizId(\\d+)',     sessionController.loginRequired, quizController.destroy);
// La ruta que muestra el recurso principal suele ser show en el controlador
router.get('/quizes/:quizId(\\d+)',        quizController.show);
// De esta cuelgan todas las que saquen información relacionada con el recurso
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

///////////////////////////
// API Rest de comentarios
///////////////////////////
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments/create', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);

//////////////////////////////////
// API Rest de la página de autor
/////////////////////////////////
router.get('/author', authorController.profile);

module.exports = router;
