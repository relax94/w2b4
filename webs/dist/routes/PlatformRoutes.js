'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var StatusRoute = exports.StatusRoute = {
    path: '/platform/status',
    method: 'GET',
    handler: function handler(req, reply) {
        reply({ success: true, message: 'All platforms worked' });
    }
};