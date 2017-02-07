'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PostImageData = undefined;

var _nn = require('./nn');

// const NM = new NetworkManager();

// export let CreateNetworkRoute = {
//     method: 'POST',
//     path: '/network/create',
//     handler: (req, reply) => {
//         NM.createNetwork(req.payload, (response) => {
//             return reply(response);
//         });
//         return reply({ success: false });
//     }
// };


var N = new _nn.NN({
    cycles: 10000,
    layers: [{
        type: _nn.NeuronType.INPUT,
        size: 15
    }, {
        type: _nn.NeuronType.HIDDEN,
        size: 15
    }, {
        type: _nn.NeuronType.OUTPUT,
        size: 10
    }]
});

//N.deserializeFromFile("d://network.txt");

// import { NetworkManager } from '../db/managers/NetworkManager'
N.trainNetwork([[1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1], // 0
[0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1], //1
[1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1], //2
[1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], //3
[1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1], // 4
[1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1], // 5
[1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1], //6
[1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0], // 7
[1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1], // 8
[1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1] // 9
], [[1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]], function () {
    console.log('TRAIN SUCCESS');
    N.serializeToFile();
    // N.run([1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1]);
});

var PostImageData = exports.PostImageData = {
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    method: 'POST',
    path: '/network/games/image',
    handler: function handler(req, reply) {
        for (var k in req.payload) {
            N.run(req.payload[k], function (output) {
                return reply(output);
            });
        }
    }
};
//# sourceMappingURL=NetworkRoutes.js.map