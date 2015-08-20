// Controlador de sesiones
'use strict';

var sesiones = {};

// MW de autologout
exports.autologout = function(req, res, next){
	console.log('Entrando en autologout');
	if(req.session.user){		
		if(sesiones[req.session.user]){
			console.log('Sesión preexistente');
			var datosSesion=sesiones[req.session.user];
			var ahora = new Date();
			
			var timeDiff = Math.abs(ahora.getTime() - datosSesion.lastRequest.getTime());
			var diffMins = Math.ceil(timeDiff / (1000 * 60 ));
			
			console.log('=> última petición hace '+diffMins+' minutos.');
			if(Math.abs(diffMins)>=2){				
				cerrarSesionYRedireccionar(req,res);
			}
		}else{
			console.log('Sesión nueva');
			// Se almacena la sesión
			sesiones[req.session.user]={
				lastRequest: new Date()			
			}
		}
	}
	console.log('Lista de sesiones resultante: ');
	console.log(sesiones);
	next();
}

// MW de autorización
exports.loginRequired = function(req, res, next){
	if(req.session.user) {
		next();
	} else {
		res.redirect('/login');
	}
};

// GET /login -> Formulario de login
exports.new = function(req, res) {
	var errors = req.session.errors || {};
	req.session.errors = {};
	res.render('sessions/new', {errors: errors});	
};

// POST /login -> Crear sesión
exports.create = function(req, res) {
	var login = req.body.login;
	var password = req.body.password;
	
	var userController = require('./user_controller');
	userController.autenticar(login, password, function(error, user){
		if(error){
			// Si hay error retornamos mensajes de error de sesión
			req.session.errors = [{'message': 'Se ha producido un error: ' + error}];
			res.redirect('/login');
			return;
		}
		
		// Crear req.session.user y guardar campos id y username
		// La sesión se define por la existencia de: req.session.user
		req.session.user = {id: user.id, username: user.username};
		
		res.redirect(req.session.redir.toString()); // redirección al path anterior al login
	});	
};

// DELETE /logout -> Destruir la sesión
exports.destroy = function(req, res){
	cerrarSesionYRedireccionar(req,res);
};

function cerrarSesionYRedireccionar(req,res){
	if(sesiones[req.session.user]){
		delete sesiones[req.session.user];
	}
	delete req.session.user;
	res.redirect(req.session.redir.toString()); // Redirecciona de vuelta al paso anterior	
}