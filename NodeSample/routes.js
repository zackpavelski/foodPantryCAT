var mysql = require('mysql');
var crpyto = require('crypto');
var jsdom = require('jsdom');
$ = require('jquery')(new jsdom.JSDOM().window);;
var bcrypt = require('bcrypt');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');


exports.setRequestUrl=function(app){
    var user = require('./controllers/user')
        ,indexObj = require('./controllers/index');

    app.get('/', user.login);
    app.get('/dashboard', user.dashboard);
    app.get('/inventory', user.inventory);
    app.get('/additem', user.additem);
    app.get('/scanner', user.scanner);
    app.get('/account', user.account);
    app.get('/signup', user.signup);
    app.get('/users', user.users);
    app.get('/switch', user.switch);
    app.get('/forgotPass', user.forgotPass);
    app.get('/thank', user.thank);
    
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
            var email = req.body.email;
            var zipCode = req.body.zipCode;
            var numPeople = req.body.numPeople;
            var undereighteen = '0';

            //var sql = `INSERT INTO scoutingDataTab (compId, teleop_cargoTot, teleop_hatchTot) VALUES (${compId}, ${teleop_noOfCargo}, ${teleop_noOfHatch})`;
            var sql = `INSERT INTO pantryUsers (email, fullName, username, numPeople, numMinors, zipCode, password) VALUES ('${email}', '${fullName}', '${username}', '${numPeople}', '${undereighteen}',  '${zipCode}', '${password}');`;   
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
        var password = req.body.password;
        var saltRounds = 4;
        /*bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            password = hash;
          });*/

        //'SELECT * FROM pantryUsers WHERE username="zack88690" AND password="goldhouse9"'
        var querstring = `SELECT * FROM pantryUsers WHERE username="${username}" AND password="${password}"`;
        connection.query(querstring, function(error, results) {
            console.log(results + ' results');
            if (results.length > 0) {
                //REDIRECT TO DASHBOARD
                localStorage.setItem('name', username);
                response.redirect('/dashboard');

            } else {
                console.log("Incorrect Login");
                response.redirect('/');
            }			
            response.end();
        });
    
    });

  

  


}
