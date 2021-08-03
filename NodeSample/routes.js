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
    app.get('/feedback', user.feedback);
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

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

        var school = req.body.school;
        var sqlquery;
        switch (school) {
            case school=='Gibbs':
                sqlquery = `INSERT INTO gibsInventory (name, items, date, school) VALUES (${request.body.itemName}, ${request.body.itemQuantity}, ${today}, ${school});`;
                break;
            case school=='Lakewood':
                sqlquery = `INSERT INTO lhsInventory (name, items, date, school) VALUES (${request.body.itemName}, ${request.body.itemQuantity}, ${today}, ${school});`;
                break;
            case school=='Hollins':
                sqlquery = `INSERT INTO hollinsInventory (name, items, date, school) VALUES (${request.body.itemName}, ${request.body.itemQuantity}, ${today}, ${school});`
                break;
            default:
                break;
        }
        connection.query(sqlquery, function(err, result){
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
            for (var i = 0; i < result.length; i++) {
                var row = result[i];
                arr += ('<tr> <td>'+row.name +'</td> <td>'+ row.items + ' </td> <td>'+ row.date +' </td> <td>'+ row.id +'</td> <td> '+row.school+'</td> </tr>');
            }
            
            //response.send({success: true, message: arr});
        })
        connection.query('SELECT * FROM hollinsOrders', function(err, result){
            if (err) throw err;
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                var row = result[i];
                arr += ('<tr> <td>'+row.name +'</td> <td>'+ row.items + ' </td> <td>'+ row.date +' </td> <td>'+ row.id +'</td> <td> '+row.school+'</td> </tr>');
            }
            //response.send({success: true, message: arr});
        })
        connection.query('SELECT * FROM gibsOrders', function(err, result){
            if (err) throw err;
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                var row = result[i];
                arr += ('<tr> <td>'+row.name +'</td> <td>'+ row.items + ' </td> <td>'+ row.date +' </td> <td>'+ row.id +'</td> <td> '+row.school+'</td> </tr>');
            }
            response.send({success: true, message: arr, message2: localStorage.getItem('name')});

        })
        
    });
    app.post('/loadUsers', function(req, response){
        var arr = '';
        var connection = mysql.createConnection({
            host: 'pantrydb.cvskfciqfnj6.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'pantryAdmin',
            password: 'Pantry21!',
            database: 'pantrydb'
        });
        connection.query('SELECT * FROM pantryUsers', function(err, result){
            if(err) throw err;
            console.log(result);
            for(var i = 0; i<= result.length; i++){
                try{
                    var row = result[i];
                    console.log('name: ' + row.fullName);
                    if(row.fullName == undefined || row.fullName == '' || row.username == undefined || row.username == '') {
                        result.splice(i, 1);
                        continue;
                    }
                    arr += '<tr><td>'+row.fullName+'</td><td>'+row.username+'</td><td>'+row.numPeople+'</td><td>'+row.numMinors+'</td><td>'+row.zipCode+'</td><td>'+row.school+'</td></tr>';
                }catch(e){
                    console.log('Empty User');
                    continue;
            
                }
                
                //fullName, username, numPeople, numMinors, zipCode, school
            }
            console.log(arr);
            response.send({success: true, message: arr});
        })
    });;
    app.post('/loadSpecificUser', function(req, response){
        var arr = '';
        var connection = mysql.createConnection({
            host: 'pantrydb.cvskfciqfnj6.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'pantryAdmin',
            password: 'Pantry21!',
            database: 'pantrydb'
        });
        var name = localStorage.getItem('name');
        var school = localStorage.getItem('school');
        var sql;
        switch (school) {
            case school == 'Lakewood':
                sql = `SELECT * FROM lhsOrders WHERE name = ${name}`;
                break;
            case school == 'Gibbs':
                sql = `SELECT * FROM gibsOrders WHERE name = ${name}`;
                break;
            case school == 'Hollins':
                sql = `SELECT * FROM hollinsOrders WHERE name = ${name}`;
                break;
            default:
                break;
        };
        try{
            connection.query(sql, function(err, result){
                if(err) {
                    //pass
                  } else if (!row.length) {
                    //pass 
                    response.send({success: true, message: arr});
                    return;
                  } else if (!row[0].something) {
                    //pass
                    response.send({success: true, message: arr});
                    return;
                  }else{
                    for(var i = 0; i<= result.length; i++){
                        try{
                            var row = result[i];
                            console.log('name: ' + row.fullName);
                            if(row.fullName == undefined || row.fullName == '' || row.username == undefined || row.username == '') {
                                result.splice(i, 1);
                                continue;
                            }
                            arr+=`<tr><td>${row.name}</td><td>${row.date}</td></td>${row.items}</td><td>${row.id}<td></tr>`;
                        }catch(e){
                            console.log('Empty User');
                            continue;
                        }
                        //fullName, username, numPeople, numMinors, zipCode, school
                    }
                    console.log(arr);
                    response.send({success: true, message: arr});
                  }                
            })
        }catch(e){
            console.log('Empty Query');
            response.send({success: true, message: arr});
        }
    });;
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
            var fullName = req.body.firstName + ' ' + req.body.lastName;
            var password;
            var saltRounds = 4;
            bcrypt.hash(req.body.new_password, saltRounds, function(err, hash) {
                console.log(hash);
                password = hash;
              });

            var sql = `UPDATE pantryUsers SET fullName = '${fullName}', username = '${username}', password = '${password}' WHERE username = '${username}'`;
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
    app.post('/postOrder', function(req, response){
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
        var itemList = req.body.items;
        if(itemList == ' ' || itemList == ''){
            itemList = 'empty order';
        }
        console.log(itemList);
        var name = localStorage.getItem('name');
        console.log("Items: " + itemList);
        var school = localStorage.getItem('school');
        console.log('School: ' +school);
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        var sql;
        var sql2;
        switch (school) {
            case school == 'Gibbs':
                sql = `INSERT INTO gibsOrders (name, items, date, school) VALUES ('${name}', '${itemList}', '${today}', '${school}')`;
                //NEED TO UPDATE INVENTORY
                //item_name item_quantity school
                for(var elem in itemList.split(',')){
                    sql2 = `UPDATE gibsInventory SET item_quantity = item_quantity - 1 WHERE item_name = ${elem}`; 
                    connection.query(sql2, function(error, result){
                        if(error) throw error;
                    })
                }
                break;
            case school == 'Hollins':
                sql = `INSERT INTO hollinsOrders (name, items, date, school) VALUES ('${name}', '${itemList}', '${today}', '${school}')`;
                //NEED TO UPDATE INVENTORY
                for(var elem in itemList.split(',')){
                    sql2 = `UPDATE hollinsInventory SET item_quantity = item_quantity - 1 WHERE item_name = ${elem}`; 
                    connection.query(sql2, function(error, result){
                        if(error) throw error;
                    })
                }
                break;
            case school = 'Lakewood':
                sql = `INSERT INTO lhsOrders (name, items, date, school) VALUES ('${name}', '${itemList}', '${today}', '${school}')`;
                //NEED TO UPDATE INVENTORY
                for(var elem in itemList.split(',')){
                    sql2 = `UPDATE lhsInventory SET item_quantity = item_quantity - 1 WHERE item_name = ${elem}`; 
                    connection.query(sql2, function(error, result){
                        if(error) throw error;
                    })
                }
                break;
            default:
                break;
        }
        connection.query(sql, function(error, results){
            if(error) throw error;
            console.log("Success");

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
                localStorage.setItem('name', req.body.username);
                localStorage.setItem('school', results[0].school);
                if(!(req.body.username == 'admin' &&((req.body.username.includes('adm'))))){
                    response.redirect('/studentDash');
                }
                if(req.body.username == 'admin' || req.body.username.includes('adm')){
                    response.redirect('/dashboard');    
                }

            } else {
                response.redirect('/');
            }			
            response.end();
        });
    
    });

    

  

  


}
