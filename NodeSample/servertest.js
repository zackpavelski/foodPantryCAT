var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'pantrydb.cvskfciqfnj6.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'pantryAdmin',
    password: 'Pantry21!',
    database: 'pantrydb'
});
connection.connect(function(err){
    if(err){
        console.error('Db connection failed: ' + err.stack);
        return;
    }
    console.log('Connected!');
    var quer = "create table pantryUsers(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  email VARCHAR(30) NOT NULL, fullName varchar(30) NOT NULL, password varchar(50) NOT NULL, username varchar(20) NOT NULL, numPeople varchar(3) NOT NULL, numMinors varchar(3) NOT NULL);"
    connection.query(quer, function(err, result){
        if(err) throw err;
        console.log("Datebase Created");
    })
});
