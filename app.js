var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon'),
    path = require('path'),
    config = require('./config'),
    router = require('./routes/router');

var app = express();
var static_path = path.join(__dirname,'public/views');

app.use(morgan('dev'));
app.use(favicon(path.join(__dirname,'public/favicon.jpg')));

app.set('views',static_path);

app.use(express.static(static_path));




app.use('/api',router);



app.listen(config.port,function(err){

    if(err)
    {
        console.log(err);
    }
    else{
        console.log('Data Seeder Running On Port : ' + config.port);
    }

});