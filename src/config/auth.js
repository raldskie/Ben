'use strict';

var internals = {},
	config = require('../config');


internals.setAuthStrategy = async function (server) {
	await server.register(require('@hapi/cookie'));

	server.auth.strategy('standard', 'cookie', {
		cookie: {
			name: 'auth-cookie',
			password: 'pangiiittkaaayoangnagbasaaaaaaaaaaaaathankstoyou',
			isSecure: false,
			ttl: (1000 * 60 * 60 * 24) / 24,
		},
		redirectTo: '/?alert=expired',
		appendNext: true,
	});

	server.auth.default('standard');
};

module.exports = {
	setStrategy: internals.setAuthStrategy,
};
