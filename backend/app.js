'use strict'

var express = require('express');

var bodyParser =  require('body-parser');
var app = express();
var path = require('path');

// rutas
var user_router = require('./routes/user');

//load view engine

app.set('view engine', 'pug');

app.set('views', path.resolve('./views'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


 const rootPath = path.resolve('./views');
 app.use(express.static(rootPath));

// configurar cabeceras y cors
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
    next();

});


// rutas
// app.use('/', contactRouter);
// app.use(express.static(path.join('vivancoBand')));
app.use('/', user_router);
// app.use('/', album_router);
// app.use('/', song_router);
// app.use('/', artist_route);
// app.use('/', contact);



module.exports = app;