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

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

router.get('/author', authorController.profile);

module.exports = router;
