var express = require('express')
    , urlHelper = require("./routes.js")
  , http = require('http')
  , fs = require('fs')
 , config = require("./config")
 , mysql = require('mysql')
 , methodOverride = require('method-override')
 , logger = require('morgan')
 , bodyParser = require('body-parser')
  , path = require('path');

var app = express();

app.engine('html', require('ejs').renderFile);


app.set('port', config.port);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser());
app.use(methodOverride());
//app.use(app.router);
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');



urlHelper.setRequestUrl(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
