
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
    
    app.post('/createUser', function(request, response) {
        var connection = mysql.createConnection({
            host: 'pantry.cluster-cvskfciqfnj6.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'pantryAdmin',
            password: 'Pantry21!',
            database: 'pantry'
        });
        var username = document.getElementById('username').value;
        var password = hashPassword(document.getElementById('password').value);
        var email = document.getElementById('email').value;
        var zipCode = document.getElementById('zipCode').value;
        var numPeople = document.getElementById('numPeople').value;
        /*
        
        if (username && password) {
            connection.query('SELECT * FROM pantryUsers WHERE email = ? AND password = ?', [username, password], function(error, results, fields) {
                if (results.length > 0) {
                   //REDIRECT TO DASHBOARD
                   localStorage.setItem("name", "username");
                   //localStorage.getItem("name");
                   user.dashboard();
                } else {
                    response.send('Incorrect Username and/or Password!');
                }			
                response.end();
            });
        } else {
            response.send('Please enter Username and Password!');
            response.end();
        }*/
    });


    app.post('/auth', function(request, response) {
        var connection = mysql.createConnection({
            host: 'pantry.cluster-cvskfciqfnj6.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'pantryAdmin',
            password: 'Pantry21!',
            database: 'pantry'
        });
        var username = document.getElementById('username').value;
        var password = hashPassword(document.getElementById('password').value);
        if (username && password) {
            connection.query('SELECT * FROM pantryUsers WHERE email = ? AND password = ?', [username, password], function(error, results, fields) {
                if (results.length > 0) {
                   //REDIRECT TO DASHBOARD
                   localStorage.setItem("name", "username");
                   //localStorage.getItem("name");
                   user.dashboard();
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
