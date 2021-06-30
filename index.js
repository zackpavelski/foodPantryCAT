document.getElementById("test").onclick = connect();

function connect(){
var mysql = require('mysql');

	var connection = mysql.createConnection({
    		host: 'pantry.cluster-cvskfciqfnj6.us-east-1.rds.amazonaws.com',
    		port: '3306',
    		user: 'pantryAdmin',
    		password: 'Pantry21!',
    		database: 'pantry'
	});

	connection.connect(function(err){
    		if(err){
        			console.error('Db connection failed: ' + err.stack);
        			return;
    		}
    		console.log('Connected!');
});

}