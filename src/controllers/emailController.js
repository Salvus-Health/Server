var mongoose = require('mongoose');
var response = require('../helpers/response');
var request = require('../helpers/request');

const Email = mongoose.model('Email');

exports.create = function (req, res) {
    // console.log("hello World this is my body _>" + JSON.stringify(req.body));
    const newEmail = new Email(req.body);

    if (req.body.zipcode == null) {
        return response.sendBadRequest(res, "the parameter 'zipcode' is needed for this request, check" +
            "spelling of the json sent or make sure you sent it ");
    }
    newEmail.save(function (err, email) {
        if (err) {
            // console.log("hello World this is my body _>" + req.body);
            return response.sendBadRequest(res, err);
        }
        response.sendCreated(res, email);
    });





};