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
exports.index=function(req,res){

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
        res.render('quizes/index', {quizes:quizes,filtro:filtro});
    }).catch(
        function(error){next(error);}
    );    
   
    
}

// GET /quizes/:id
exports.show = function(req,res){
    res.render('quizes/show', {pregunta: req.quiz});   
};

// GET /quizes/:id/answer
exports.answer=function(req,res){
    var resultado='Incorrecto';
    if(req.query.respuesta===req.quiz.respuesta){
        resultado='Correcto';
    }
    res.render('quizes/answer', {pregunta: req.quiz, respuesta: resultado});    
};