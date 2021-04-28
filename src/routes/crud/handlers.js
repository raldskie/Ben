'use strict';

var internals = {};
const Classmates = require('../../database/models/Classmates');

internals.home = async (req, reply) => {

    return Classmates.find({ userID: req.auth.credentials._id })
        .then(res => {
            return reply.view('home/home.html', {
                namesList: res.map(data => {
                    return {
                        _id: data._id,
                        fullName: data.fullName,
                    }
                }),
                user: req.auth.credentials.name,
                messageTitle: req.query.messageTitle,
                message: req.query.message,
                alertType: req.query.alertType
            });
        });
}

internals.add_classmate = (req, reply) => {
    const newName = Classmates({
        userID: req.auth.credentials._id,
        fullName: req.payload.name,
    });

    return newName.save()
        .then(() => {
            return reply.redirect('/home?message=Name successfully added. &messageTitle=Success &alertType=success');
        })
        .catch(err => {
            console.log(err);
            return reply.redirect('/home?message=Please fill all fields. &messageTitle=Failed &alertType=danger');
        });
}


internals.edit_classmate = (req, reply) => {

    return Classmates.findOne({ _id: req.params.id }).then(user => {
        return reply.view('home/edit.html', {
            user: req.auth.credentials.name,
            name: user.fullName,
            id: user._id,
            message: req.query.message,
        });
    });
}


internals.save_edit = (req, reply) => {
    return Classmates.findOneAndUpdate({ _id: req.params.id }, req.payload, { useFindAndModify: false })
        .then(res => {
            return reply.redirect('/home?message=Name successfully edited. &messageTitle=Success &alertType=success');
        })
        .catch(err => {
            return reply.redirect('/edit-classmate?message=Please fill all fields. &messageTitle=Failed &alertType=danger');
        });
}

internals.delete_name = (req, reply) => {
    return Classmates.findByIdAndDelete({ _id: req.params.id })
        .then(() => {
            return reply.redirect('/home?message=Name successfully deleted. &messageTitle=Success &alertType=success');
        });

}

module.exports = internals;