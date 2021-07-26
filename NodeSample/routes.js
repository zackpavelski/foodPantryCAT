var mysql = require('mysql');
var crpyto = require('crypto');
var jsdom = require('jsdom');
$ = require('jquery')(new jsdom.JSDOM().window);;
var bcrypt = require('bcrypt');
var LocalStorage = require('node-localstorage').LocalStorage;
const { Console } = require('console');
localStorage = new LocalStorage('./scratch');


exports.setRequestUrl=function(app){
    var user = require('./controllers/user')
        ,indexObj = require('./controllers/index');

    app.get('/', user.login);
    app.get('/dashboard', user.dashboard);
    app.get('/studentDash', user.studentDash);
    app.get('/inventory', user.inventory);
    app.get('/additem', user.additem);
    app.get('/scanner', user.scanner);
    app.get('/account', user.account);
    app.get('/signup', user.signup);
    app.get('/users', user.users);
    app.get('/history', user.history);
    app.get('/switch', user.switch);
    app.get('/forgotPass', user.forgotPass);
    app.get('/thank', user.thank);
    

    app.post('/insertInventory', function(req, response){
        var connection = mysql.createConnection({
            host: 'pantrydb.cvskfciqfnj6.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'pantryAdmin',
            password: 'Pantry21!',
            database: 'pantrydb'
        });
        connection.query(`INSERT INTO inventory (item_name, item_quantity) VALUES (${request.body.itemName}, ${request.body.itemQuantity});`, function(err, result){
            if(err) throw err;
            Console.log('1 row inserted');
        })
    });
    app.post('/loadOrders', function(req,response)
    {   
        var connection = mysql.createConnection({
            host: 'pantrydb.cvskfciqfnj6.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'pantryAdmin',
            password: 'Pantry21!',
            database: 'pantrydb'
        });
        connection.query('SELECT * FROM orders', function(err, result){
            if (err) throw err;
            console.log(result);
            var arr = '';
            var rows = JSON.parse(JSON.stringify(result[0]));
            //console.log(rows.RowDataPacket[0].attributes_id);
            for (var i = 0; i < result.length; i++) {
                var row = result[i];
                //var add = "CREATE TABLE orders (id int(11) NOT NULL AUTO_INCREMENT, name VARCHAR(100), items VARCHAR(255), date VARCHAR(255), PRIMARY KEY(id))"

                arr += ('<tr> <td>'+row.name +'</td> <td>'+ row.date + ' </td> <td>'+ row.items +' </td> <td>'+ row.id +'</td> </tr>');
            }
            /*Object.keys(rows).forEach(function(key){
                const row = result[key];
                arr += (' <tr> <td> ' + row.attributes_id + '</td> <td>'+ row.item_name + ' </td> '+ row.item_quantity +'</tr>');
            })*/
    
            response.send({success: true, message: arr});


        })
    });
    app.post('/loadInventory', function(req,response)
    {   
        var connection = mysql.createConnection({
            host: 'pantrydb.cvskfciqfnj6.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'pantryAdmin',
            password: 'Pantry21!',
            database: 'pantrydb'
        });
        console.log('CLICK CLACKLY CLICK');
        connection.query('SELECT * FROM inventory', function(err, result){
            if (err) throw err;
            console.log(result);
            var arr = '';
            var rows = JSON.parse(JSON.stringify(result[0]));
            //console.log(rows.RowDataPacket[0].attributes_id);
            for (var i = 0; i < result.length; i++) {
                var row = result[i];
                arr += (' <tr> <td> ' + row.attributes_id + '</td> <td>'+ row.item_name + ' </td> <td>'+ row.item_quantity +' </td></tr>');
            }
            /*Object.keys(rows).forEach(function(key){
                const row = result[key];
                arr += (' <tr> <td> ' + row.attributes_id + '</td> <td>'+ row.item_name + ' </td> '+ row.item_quantity +'</tr>');
            })*/
    
            response.send({success: true, message: arr});


        })
    });
    app.post('/updateUser', function(req, response){
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
            
            var username = req.body.username;
            var fullName = req.body.firstName + req.body.lastName;
            var password;
            var saltRounds = 4;
            bcrypt.hash(req.body.new_password, saltRounds, function(err, hash) {
                console.log(hash);
                password = hash;
              });

            var sql = `UDPATE pantryUsers SET fullName = '${firstName + lastName}', username = '${username}', password = '${password}' WHERE username = '$username'`;
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });  
            response.redirect('/');
        });
    });
    app.post('/createUser', function(req, response) {
    

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
            
            var username = req.body.username;
            var fullName = req.body.fullName;
           
            var password;
            var saltRounds = 4;
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                console.log(hash);
                password = hash;
              });
            var zipCode = req.body.zipCode;
            var numPeople = req.body.numPeople;
            var undereighteen = req.body.numMinors;

            var sql = `INSERT INTO pantryUsers (fullName, username, numPeople, numMinors, zipCode, password) VALUES ('${fullName}', '${username}', '${numPeople}', '${undereighteen}',  '${zipCode}', '${password}');`;   
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });  
            response.redirect('/');
        });
        
        
    });


    app.post('/auth', function(req, response) {
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
        });
        
        var username = req.body.username;
        var password;
        var saltRounds = 4;
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            password = hash;
          });

        //'SELECT * FROM pantryUsers WHERE username="zack88690" AND password="goldhouse9"'
        var querstring = `SELECT * FROM pantryUsers WHERE username="${username}" AND password="${password}"`;
        connection.query(querstring, function(error, results) {
            console.log(results + ' results');
            if (results.length > 0) {
                //REDIRECT TO DASHBOARD
                localStorage.setItem('name', username);
                response.redirect('/dashboard');

            } else {
                response.redirect('/');
            }			
            response.end();
        });
    
    });

    

  

  


}
