var mongoose = require('mongoose');
var response = require('../helpers/response');
var request = require('../helpers/request');

const Email = mongoose.model('Email');

exports.create = function (req, res) {
    // console.log("hello World this is my body _>" + JSON.stringify(req.body));
    const newEmail = new Email(req.body);

    if (req.body.email == null) {
        return response.sendBadRequest(res, "the parameter 'email' is needed for this request, check" +
            "spelling of the json sent or make sure you sent it ");
    }

    Email.find({ email: req.body.email }, function (err, email) {
        if (err) response.sendBadRequest(res, err);

        if (email.length === 0) {
            newEmail.save(function (err, email) {
                if (err) {
                    // console.log("hello World this is my body _>" + req.body);
                    return response.sendBadRequest(res, err);
                }
                response.sendCreated(res, email);
            });
        } else {
            if (req.body.zipcode !== undefined) {
                email[0].zipcode = req.body.zipcode;
                email[0].save(function (err) {
                    if (err) response.sendBadRequest(req, err);

                    response.sendCreated(res, email);
                });
            }else{
                response.sendCreated(res, {message: "nothing should have changed", email});
            }
        }
    })



};