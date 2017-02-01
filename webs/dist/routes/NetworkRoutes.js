'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PostImageData = exports.CreateNetworkRoute = undefined;

var _NetworkManager = require('../db/managers/NetworkManager');

var NM = new _NetworkManager.NetworkManager();

var CreateNetworkRoute = exports.CreateNetworkRoute = {
    method: 'POST',
    path: '/network/create',
    handler: function handler(req, reply) {
        NM.createNetwork(req.payload, function (response) {
            return reply(response);
        });
        return reply({ success: false });
    }
};

var PostImageData = exports.PostImageData = {
    method: 'POST',
    path: '/network/games/image',
    handler: function handler(req, reply) {
        console.log('payload ', req.payload);
        return reply({ success: false });
    }
};