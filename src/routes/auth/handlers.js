'use strict';

var internals = {};
var User = require('../../database/models/User');
var Crypto = require('../../lib/Crypto')

internals.log_in = (req, reply) => {
    return reply.view('auth/log-in.html', {
        messageTitle: req.query.messageTitle,
        message: req.query.message,
        alertType: req.query.alertType
    });
}

internals.authenticate = (req, reply) => {
    return User.findOne({ email: req.payload.email })
        .then(user => {
            if (req.payload.password != Crypto.decrypt(user.password)) {
                return reply.redirect('/?message=Not found try again. &messageTitle=Failed &alertType=danger');
            }
            req.cookieAuth.set(user);
            return reply.redirect('/home');
        }).catch(() => {
            return reply.redirect('/?message=Fill all fields. &messageTitle=Failed &alertType=danger');
        })
}

internals.sign_up = (req, reply) => {
    return reply.view('auth/sign-up.html', {
        messageTitle: req.query.messageTitle,
        message: req.query.message,
        alertType: req.query.alertType
    });
}

internals.save_user = (req, reply) => {

    console.log(req.payload.name)
    const newUser = User({
        name: req.payload.name,
        email: req.payload.email,
        password: Crypto.encrypt(req.payload.password)
    });

    return User.findOne({ email: req.payload.email }).then(user => {

        if (user)
            return reply.redirect('/sign-up?message=Email already used. &messageTitle=Failed &alertType=danger');

        return newUser.save()
            .then(() => {
                return reply.redirect('/?message=User successfully added. &messageTitle=Success &alertType=success');
            })
            .catch(err => {
                console.log(err);
                return reply.redirect('/sign-up?message=Please fill all fields. &messageTitle=Failed &alertType=danger');
            });
    })


}

internals.sign_out = (req, reply) => {
    req.cookieAuth.clear();
    return reply.redirect('/?message=Sign Out Successful. &messageTitle=Success &alertType=success');
}

module.exports = internals;