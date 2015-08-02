// Controlador de autores

// GET /author
exports.profile = function(req,res){
	res.render('author', 
				{nombre: 'Carlos Castillo Alarc\u00F3n',
				 portraitURL: '/images/author/portrait.png',
				 errors:[]}
			);
};
