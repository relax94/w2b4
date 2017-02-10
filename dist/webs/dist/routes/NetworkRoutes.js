'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TrainNetwork = exports.PostImageData = undefined;

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
    cycles: 10,
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
var numConverter = [[255, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 255, 0, 0, 0, 0, 0, 0, 0, 0][(0, 0, 1, 0, 0, 0, 0, 0, 0, 0)], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]];

N.trainNetwork([[128, 122, 122, 157, 0, 173, 255, 0, 235, 1, 0, 0, 0, 95, 0], [0, 179, 200, 101, 0, 204, 0, 0, 54, 0, 0, 51, 0, 0, 33], [1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1], //2
[1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], //3
[1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1], // 4
[1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1], // 5
[1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1], //6
[1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0], // 7
[1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1], // 8
[1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1] // 9*/
], numConverter, function () {
    console.log('TRAIN SUCCESS');
    //  N.serializeToFile();
    N.run([0, 179, 200, 101, 0, 204, 0, 0, 54, 0, 0, 51, 0, 0, 33], function (output) {
        console.log('OOOO ', output);
    });
});

var trainSet = [];

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

var TrainNetwork = exports.TrainNetwork = {
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
        /*         payload: {
                    output: 'data',
                    parse: true,
                    allow: 'application/json'
                 }*/
    },
    method: 'POST',
    path: '/network/games/train',
    handler: function handler(req, reply) {
        trainSet = req.payload.set;
        console.log('train payload');

        N.trainNetwork(JSON.parse(trainSet), numConverter, function () {
            console.log('TRAIN SUCCESS');
            //  N.serializeToFile();
            /* N.run([0, 179, 200, 101, 0, 204, 0, 0, 54, 0, 0, 51, 0, 0, 33], function (output) {
                 console.log('OOOO ', output);
             });*/
        });

        reply();
    }
};
//# sourceMappingURL=NetworkRoutes.js.map