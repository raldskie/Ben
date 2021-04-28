'use strict';
var Handlers = require('./handlers'), internals = {};

internals.endpoints = [
    {
        method: ['GET'],
        path: '/home',
        handler: Handlers.home,
        config: {
            auth: {
                strategy: 'standard',
            }
        }
    },

    {
        method: ['POST'],
        path: '/add-classmate',
        handler: Handlers.add_classmate,
        config: {
            auth: {
                strategy: 'standard',
            }
        }
    },

    {
        method: ['GET'],
        path: '/edit-classmate/{id}',
        handler: Handlers.edit_classmate,
        config: {
            auth: {
                strategy: 'standard',
            }
        }
    },

    {
        method: ['POST'],
        path: '/save-edit/{id}',
        handler: Handlers.save_edit,
        config: {
            auth: {
                strategy: 'standard',
            }
        }
    },

    {
        method: ['GET'],
        path: '/delete-name/{id}',
        handler: Handlers.delete_name,
        config: {
            auth: {
                strategy: 'standard',
            }
        }
    },

];

module.exports = internals;