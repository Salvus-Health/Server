'use strict';

var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const EmailSchema = new Schema({
    email:{
        type:String, 
        index: {unique:true}
    },
    zipcode: {
        type:Number,
        required: true,
    }
});


module.exports = mongoose.model('Email', EmailSchema);

