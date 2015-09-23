module.exports=function(sequelize, DataTypes){
	return sequelize.define('Quiz',
		{tema:
			{ 	type: DataTypes.STRING,
				validate: {
					notEmpty: {msg: "-> Falta el tema"}
				}
			},
		 pregunta:
		 	{
		 		type: DataTypes.STRING,
		 		validate:
		 			{
		 				notEmpty: {msg: "-> Falta la pregunta"}
		 			}
		 	},
		 respuesta:
		 	{
		 		type: DataTypes.STRING,
		 		validate:
		 			{
		 				notEmpty: {msg: "-> Falta la respuesta"}
		 			}
		 	}
		});
}
