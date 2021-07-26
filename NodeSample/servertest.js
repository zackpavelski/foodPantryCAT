var mysql = require('mysql');
var bcrypt = require('bcrypt');

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
    var username = 'zack88690';
    var fullName = 'Zachary Pavelski';
    var password = 'goldhouse3232';
    var email = 'zack88690@gmail.com';
    var zipCode = '33712';
    var numPeople = '7';
    var minors = '3';

    var username = 'zack88690';
    var password = 'goldgouse9';
    var saltRounds = 4;
    
    
    var selectquery = "SELECT `COLUMN_NAME` FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA`='pantrydb' AND `TABLE_NAME`='pantryUsers';";
    
    /*var sql = "CREATE TABLE orders (name VARCHAR(255), address VARCHAR(255))";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });*/

    

    /*connection.query('SELECT * FROM inventory', function(err, result){
        if (err) throw err
        Object.keys(result).forEach(function(key){
            var row = result[key];
            console.log(row.item_name);
        })
    })*/

    /*connection.query('SELECT * FROM pantryUsers', function(err, result){
        if (err) throw err
        console.log(result)
    });*/

    //Use to add colums

    /*var sql =  'ALTER table inventory add column (item_quantity varchar(255))';
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Collum Added");
  });*/

  /*var sql = "INSERT INTO inventory (attributes_id, item_name, item_quantity) VALUES ('1', 'Pasta', '37')";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });*/


  connection.query('SELECT * FROM inventory', function(err, result){
    if (err) throw err
    console.log(result);
  });
  

});
