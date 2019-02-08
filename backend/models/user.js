'use strict'
var mongoose = require('mongoose');
const { Schema } = mongoose;

var UserSchema = Schema({
    title: { type: String , required: false},
    story_title: { type: String , required: false},
    author:  { type: String , required: false},
    created_at: { type: String , required: false},
    story_url: { type: String , required: false},
    story_id: { type: Number , required: false}

});

module.exports = mongoose.model('User', UserSchema);
