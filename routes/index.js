var express = require('express');
var router = express.Router();

// Declaración del controller de preguntas
var quizController = require('../controllers/quiz_controller');

// Declaración del controlador de página de autor
var authorController = require('../controllers/author_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//////////////////////
// API Rest de quizes
//////////////////////
// La lista de recursos es la primera del API y se resuelve en el controlador con index.
router.get('/quizes',                      quizController.index);
// La ruta que muestra el recurso principal suele ser show en el controlador
router.get('/quizes/:quizId(\\d+)',        quizController.show);
// De esta cuelgan todas las que saquen información relacionada con el recurso
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

//////////////////////////////////
// API Rest de la página de autor
/////////////////////////////////
router.get('/author', authorController.profile);

module.exports = router;
