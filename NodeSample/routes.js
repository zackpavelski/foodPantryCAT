var mysql = require('mysql');
var crpyto = require('crypto');
var jsdom = require('jsdom');
$ = require('jquery')(new jsdom.JSDOM().window);;


function hashPassword(password) {
    var salt = crypto.randomBytes(128).toString('base64');
    var iterations = 10000;
    var hash = pbkdf2(password, salt, iterations);

    return {
        salt: salt,
        hash: hash,
        iterations: iterations
    };
}

function isPasswordCorrect(savedHash, savedSalt, savedIterations, passwordAttempt) {
    return savedHash == pbkdf2(passwordAttempt, savedSalt, savedIterations);
}


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
    
    app.get('/createUser', function(request, response) {
        
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
            var username = $('#username').text();
            var fullName = $('#fullName').text();
            var password = $('password').text();
            var email = $('email').text();
            var zipCode = $('zipCode').text();
            var numPeople = $('numPeople').text();
            var minors = $('minors').text();
            
            console.log(username + '--------------'+ fullName, password, email, zipCode, numPeople, minors);

            //var sql = `INSERT INTO scoutingDataTab (compId, teleop_cargoTot, teleop_hatchTot) VALUES (${compId}, ${teleop_noOfCargo}, ${teleop_noOfHatch})`;
            var sql = `INSERT INTO pantryUsers (email, fullName, password, username, zipcode, numPeople, numMinors) VALUES (${email}, ${fullName}, ${password}, ${username}, ${zipCode}, ${numPeople}, ${minors})`;   
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console("1 record inserted");
            });   
            user.dashboard;
        });
        
        
    });


    app.get('/auth', function(request, response) {
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
        });
        
        var username = request.query.username;
        var password = hashPassword(request.query.password);
        if (username && password) {
            connection.query('SELECT * FROM pantryUsers WHERE email = ? AND password = ?', [username, password], function(error, results, fields) {
                if (results.length > 0) {
                   //REDIRECT TO DASHBOARD
                   localStorage.setItem("name", "username");
                   //localStorage.getItem("name");
                   user.dashboard;
                } else {
                    response.send('Incorrect Username and/or Password!');
                }			
                response.end();
            });
        } else {
            response.send('Please enter Username and Password!');
            response.end();
        }
    });

  

  


}
