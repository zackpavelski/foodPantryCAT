
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
    
    app.post('/auth', function(request, response) {
        var connection = mysql.createConnection({
            host: 'pantry.cluster-cvskfciqfnj6.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'pantryAdmin',
            password: 'Pantry21!',
            database: 'pantry'
        });
        var username = request.body.username;
        var password = request.body.password;
        if (username && password) {
            connection.query('SELECT * FROM pantryUsers WHERE email = ? AND password = ?', [username, password], function(error, results, fields) {
                if (results.length > 0) {
                    request.session.loggedin = true;
                    request.session.username = username;
                    response.redirect('/');
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
