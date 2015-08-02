module.exports=function(sequelize, DataTypes){
	return sequelize.define('Quiz',
		{tema: DataTypes.STRING,
		 pregunta: DataTypes.STRING,			
		 respuesta: DataTypes.STRING
		});
}