var mysql = require('mysql');
var crpyto = require('crypto');
var jsdom = require('jsdom');
$ = require('jquery')(new jsdom.JSDOM().window);;
var bcrypt = require('bcrypt');
var LocalStorage = require('node-localstorage').LocalStorage;
const { Console } = require('console');
localStorage = new LocalStorage('./scratch');


function foo (array) {
    let a = [],
        b = [],
        arr = [...array], // clone array so we don't change the original when using .sort()
        prev;

    arr.sort();
    for (let element of arr) {
        if (element !== prev) {
        a.push(element);
        b.push(1);
        }
        else ++b[b.length - 1];
        prev = element;
    }

    return [a, b];
    }
    
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
        var arr = '';
        var connection = mysql.createConnection({
            host: 'pantrydb.cvskfciqfnj6.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'pantryAdmin',
            password: 'Pantry21!',
            database: 'pantrydb'
        });
        connection.query('SELECT * FROM lhsOrders', function(err, result){
            if (err) throw err;
            console.log(result);
            var rows = JSON.parse(JSON.stringify(result[0]));
            for (var i = 0; i < result.length; i++) {
                var row = result[i];
                arr += ('<tr> <td>'+row.name +'</td> <td>'+ row.items + ' </td> <td>'+ row.date +' </td> <td>'+ row.id +'</td> <td> '+row.school+'</td> </tr>');
            }
            
            //response.send({success: true, message: arr});
        })
        connection.query('SELECT * FROM hollinsOrders', function(err, result){
            if (err) throw err;
            console.log(result);
            var rows = JSON.parse(JSON.stringify(result[0]));
            for (var i = 0; i < result.length; i++) {
                var row = result[i];
                arr += ('<tr> <td>'+row.name +'</td> <td>'+ row.items + ' </td> <td>'+ row.date +' </td> <td>'+ row.id +'</td> <td> '+row.school+'</td> </tr>');
            }
            //response.send({success: true, message: arr});
        })
        connection.query('SELECT * FROM gibsOrders', function(err, result){
            if (err) throw err;
            console.log(result);
            var rows = JSON.parse(JSON.stringify(result[0]));
            for (var i = 0; i < result.length; i++) {
                var row = result[i];
                arr += ('<tr> <td>'+row.name +'</td> <td>'+ row.items + ' </td> <td>'+ row.date +' </td> <td>'+ row.id +'</td> <td> '+row.school+'</td> </tr>');
            }
            response.send({success: true, message: arr});

        })
        
    });
    app.post('/loadFavorites', function(req, response){
        var arr = '';
        var connection = mysql.createConnection({
            host: 'pantrydb.cvskfciqfnj6.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'pantryAdmin',
            password: 'Pantry21!',
            database: 'pantrydb'
        });
        connection.query('SELECT * FROM lhsOrders', function(err, result){
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                var row = result[i];
                var results  = foo(row.items.split(','));
                var splits = row.items.split(',');
                for(var i = 0; i < results[0].length; i++){
                    arr += '<tr><td>'+splits[i]+':'+results[1][i]+'</td><td>'+row.school+'</td></tr>'

                }
            }
        })
        connection.query('SELECT * FROM hollinsOrders', function(err, result){
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                var row = result[i];
                var results  = foo(row.items.split(','));
                var splits = row.items.split(',');
                for(var i = 0; i < results[0].length; i++){
                    arr += '<tr><td>'+splits[i]+':'+results[1][i]+'</td><td>'+row.school+'</td></tr>'

                }
            }
        })
        connection.query('SELECT * FROM gibsOrders', function(err, result){
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                var row = result[i];
                var results  = foo(row.items.split(','));
                var splits = row.items.split(',');
                for(var i = 0; i < results[0].length; i++){
                    arr += '<tr><td>'+splits[i]+':'+results[1][i]+'</td><td>'+row.school+'</td></tr>'

                }
            }
            response.send({success: true, message: arr});

        })
    });
    app.post('/loadInventory', function(req,response)
    {   
        var arr = '';

        var connection = mysql.createConnection({
            host: 'pantrydb.cvskfciqfnj6.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'pantryAdmin',
            password: 'Pantry21!',
            database: 'pantrydb'
        });
        connection.query('SELECT * FROM lhsInventory', function(err, result){
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                var row = result[i];
                arr += (' <tr> <td> ' + String(row.id) + '</td> <td>'+ row.item_name + ' </td> <td>'+ row.item_quantity +' </td><td>'+row.school+'</td></tr>');
            }
        })
        connection.query('SELECT * FROM hollinsInventory', function(err, result){
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                var row = result[i];
                arr += (' <tr> <td> ' + String(row.id) + '</td> <td>'+ row.item_name + ' </td> <td>'+ row.item_quantity +' </td><td>'+row.school+'</td></tr>');
            }
        })
        connection.query('SELECT * FROM gibsInventory', function(err, result){
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                var row = result[i];
                arr += (' <tr> <td> ' + String(row.id) + '</td> <td>'+ row.item_name + ' </td> <td>'+ row.item_quantity +' </td><td>'+row.school+'</td></tr>');
            }
            response.send({success: true, message: arr});

        })
    });
    app.post('/changeSchool', function(req, response){
        var connection = mysql.createConnection({
            host: 'pantrydb.cvskfciqfnj6.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'pantryAdmin',
            password: 'Pantry21!',
            database: 'pantrydb'
        });
        var sql = `UPDATE pantryUsers SET school = '${req.body.school}' WHERE username = '${localStorage.getItem('name')}' `
        connection.query(sql, function(err, result){
            if(err) throw err;
            console.log("Updated.");
        })
    })
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

            var sql = `UDPATE pantryUsers SET fullName = '${firstName + lastName}', username = '${username}', password = '${password}' WHERE username = '${username}'`;
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
            var school = req.body.school;

            var sql = `INSERT INTO pantryUsers (fullName, username, numPeople, numMinors, zipCode, password, school) VALUES ('${fullName}', '${username}', '${numPeople}', '${undereighteen}',  '${zipCode}', '${password}', '${school}');`;   
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });  
            response.redirect('/');
        });
        
        
    });
    app.post('/postOrder', function(req, response, items){
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
        var name = localStorage.getItem('name');
        var itemList = items;
        var school = localStorage.getItem('school');
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        switch (school) {
            case school == 'Gibbs':
                var sql = `INSERT INTO gibsOrders (name, items, date, school) VALUES ('${name}', '${itemList}', '${today}', '${school}')`;
                break;
            case school == 'Hollins':
                var sql = `INSERT INTO hollinsOrders (name, items, date, school) VALUES ('${name}', '${itemList}', '${today}', '${school}')`;
                break;
            case school = 'Lakewood':
                var sql = `INSERT INTO lhsOrders (name, items, date, school) VALUES ('${name}', '${itemList}', '${today}', '${school}')`;
                break;
            default:
                break;
        }
        connection.query(sql, function(error, results){
            if(err) throw err;
            console.log("Success");
            response.send({success: true});

        });

        //get data
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
                localStorage.setItem('name', req.body.username);
                localStorage.setItem('school', results[0].school);
                response.redirect('/dashboard');

            } else {
                response.redirect('/');
            }			
            response.end();
        });
    
    });

    

  

  


}
