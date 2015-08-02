// Controlador de preguntas

// Importamos el modelo
var models=require('../models/models.js');

// Autoload - factoriza el código si la ruta incluye :quizId
exports.load=function(req,res,next,quizId){
    models.Quiz.findById(quizId).then(
        function(quiz){
            if(quiz){
                req.quiz=quiz;
                next();
            }else{
                next(new Error('No existe quizId=' + quizId));
            }
        }
    ).catch(function(error){next(error);});
}

// GET /quizes
exports.index=function(req,res,next){

    var opcionesBusqueda={};   
    var filtro='';
    if(req.query.search){
        filtro=req.query.search;
        var patron = '%' + filtro.replace(' ','%') + '%';
        console.log('Filtro de entrada: '+ filtro);
        console.log('Filtro procesado: ' + patron);

        opcionesBusqueda.where=["pregunta like ?", patron];
       
    }

    models.Quiz.findAll(opcionesBusqueda).then(function(quizes){
        res.render('quizes/index', {quizes:quizes,filtro:filtro,errors:[]});
    }).catch(
        function(error){next(error);}
    );  
};

// GET /quizes/new
exports.new = function(req,res){
    // Crea un objeto Quiz no persistente
    var quiz = models.Quiz.build(
            { pregunta: 'Pregunta', 
              respuesta: 'Respuesta', 
              tema:models.Quiz.tematica.otro.codigo }
        );
    res.render('quizes/new', {pregunta: quiz, temas:models.Quiz.tematica,errors:[]});   
};

// POST /quizes/create => Primitiva sin vista asociada
exports.create = function(req,res,next){
    console.log('Pregunta a crear => ');
    console.log(req.body.pregunta);
    var quiz = models.Quiz.build(req.body.pregunta);

    // Validación de quiz
    quiz.validate().then(
        function(err){
            if(err){
                res.render('quizes/new', {pregunta: quiz, temas:models.Quiz.tematica, errors: err.errors});
            }else{
                 // guarda en BBDD los campos de quiz
                quiz.save({fields:["pregunta","respuesta","tema"]}).then(function(){
                    res.redirect('/quizes');
                }).catch(function(error){
                    next(error);
                });
            }
        }
    );

   
};

// GET /quizes/:id
exports.show = function(req,res){
    res.render('quizes/show', {pregunta: req.quiz,errors:[]});   
};

// GET /quizes/:id/answer
exports.answer=function(req,res){
    var resultado='Incorrecto';
    if(req.query.respuesta===req.quiz.respuesta){
        resultado='Correcto';
    }
    res.render('quizes/answer', {pregunta: req.quiz, respuesta: resultado,errors:[]});    
};