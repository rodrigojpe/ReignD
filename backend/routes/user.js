'use strict'
var moment = require('moment');
var express = require('express');
var UserController = require('../controllers/user.controller');
var request = require('request');
const User = require('../models/user');
let moment2 = require("moment-timezone");


var api = express.Router();
// api.get('/pruebas-del-controlador', UserController.pruebas);

var obj = [];
var time;
api.get('/', (req, res) => {

  // descomentar una vez para realizar la carga a la BD, luego comentar
  //UserController.pruebas(req,res);

  //#region 
  // ejecuta la carga cada 1 hora, par poder cargar comentar toda esta regio 
  setInterval(function () {
    UserController.pruebas(req, res);
  }, 1000 * 60 * 60);
  //#endregion  

  User.find().sort('created_at').exec((err, users) => {
    if (err) {
      //   res.status(404).send({message: 'Error en la perticion'});
    } else {
      if (!users) {
        res.status(404).render('index', {
          message: 'No hay user'
        });
        console.log('no hay usuarios')
      } else {
        // let tim = moment2(i.created_at);
        // obj = new Array;
        // console.log(tim.tz('America/Santiago').format('HH:mm a'))
        //  res.setHeader("Content-Type", "text/html");

        res.render('index', {
          json: JSON.stringify(users)

        });

        obj = users;
        // console.log(obj.length);
      }
    }
  });
});
// Definimos una ruta para la eliminacion de los usuarios po su ID
api.get('/delete/:id', (req, res) => {
  const {
    id
  } = req.params;
  console.log(req.headers.host);

  // Metodo para eliminar el user seleccionado
  User.findByIdAndRemove(id, (err, userRemove) => {
    if (err) {
      // res.status(500).send({message: 'error en la peticion'});
    } else {
      if (!userRemove) {
        // res.status(404).send({message: 'animal no eliminado'});
      } else {
        // res.status(200).send({message: animalRemove});
        // Redireccionamos a la ruta principal una vez eliminado el User
        res.redirect('/');
      }
    }
  });
})




module.exports = api;