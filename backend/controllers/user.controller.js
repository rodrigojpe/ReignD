'use strict'

var path = require('path');
var express = require('express');
var app = express(); 
const User = require('../models/user');
let moment2 = require("moment-timezone");

var moment = require('moment');
var express = require('express');
var api = express.Router();
var request = require('request');
const userCtrl = {};
var obj = [];


// metodo para conectar con API que carga la BD
userCtrl.pruebas = (req , res) =>{
    // request que se dirige a la api que devuelve el JSON
    request.get({url:'https://hn.algolia.com/api/v1/search_by_date?query=nodejs', json:true}, function(err, res, json){
        if (err) {
            throw err;
        }  else {
             this.obj = [];
            // guardo el JSON in array
             obj.push(json.hits);
        }
    });
     
    // Validamos que el objeto si exista 
    if (obj[0]) {
        for (let i of obj[0]){
            // creamos un modelo para guardar la informacion en la BD
           let user = new User({
            title: i.title,
            story_title: i.story_title,
            author: i.author,
            created_at: moment2.tz(i.created_at,'America/Santiago').format('HH:mm a'),
            story_url: i.story_url,
            story_id: i.story_id
            });
    
    
            // Busca y compara si el ide de los usuarios devueltos por la API ya estan en la BD
              User.findOne({story_id :  user.story_id }, (err, _user) =>{
                try{
                  if (!_user) {
                    // si el usuario no esta entonces lo guarda en la BD TEST
                    //console.log('no esta');
                    user.save();
                  }else{
                        if (_user) {
                           // console.log('ya esta');
                            }else{
                            //  console.log('sssya esta');
                            }
                  }
                }catch(error){
                  res.status(500).send({message: error + ''});
                }
                });
        }
    }
    }

    userCtrl.getUsers = (req, res) =>{
    }

module.exports =   userCtrl;