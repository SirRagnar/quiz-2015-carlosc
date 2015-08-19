// Controlador de comentariosd
'use strict';

// Importamos el modelo
var models=require('../models/models.js');

// GET /comments/new
exports.new = function(req,res){    
    res.render('comments/new', {quizId: req.params.quizId, errors:[]});   
};

// POST /comments/create => Primitiva sin vista asociada
exports.create = function(req,res,next){   
    var comment = models.Comment.build({texto: req.body.comment.texto, QuizId: req.params.quizId});

    console.log( 'Recibida petición para crear un comentario con texto ' + comment.texto);
    console.log( 'El comentario se creará en el quiz: ' + req.params.quizId);
    // Validación de quiz
    comment.validate().then(
        function(err){
            if(err){
                res.render('comments/new', {comment: comment, quizId: req.params.quizId, errors: err.errors});
            }else{
                 // guarda en BBDD los campos de comentario
                comment.save().then(function(){
                    res.redirect('/quizes/' + req.params.quizId);
                }).catch(function(error){
                    next(error);
                });
            }
        }
    );   
};