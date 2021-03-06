'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TrainNetwork = exports.PostImageData = undefined;

var _nn = require('./nn');

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _jsonfile = require('jsonfile');

var jsonfile = _interopRequireWildcard(_jsonfile);

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }
        newObj.default = obj;
        return newObj;
    }
}

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


Object.values = function (obj) {
    var vals = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            vals.push(+obj[key] > 100 ? 1 : 0);
        }
    }
    return vals;
}; // import { NetworkManager } from '../db/managers/NetworkManager'


var numConverter = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]];

var trainQ = []; // import { NetworkManager } from '../db/managers/NetworkManager'

var trainA = [];

var trainDictionary = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: []
};

var obj;
fs.readFile('../converted.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = obj[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            /*        trainA.push(numConverter[+item['label']]);*/
            var label = +item['label'];
            delete item['label'];
            trainDictionary[label].push(Object.values(item));
            /*        }
             delete item['label'];
             trainQ.push(Object.values(item));*/
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

     for (var trainItemKey in Object.keys(trainDictionary)) {
     trainQ.push(trainDictionary[trainItemKey][0]);
     trainA.push(numConverter[trainItemKey]);
     }

/*    trainQ.push(
        [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],// 0
        [0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1], //
        [1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1], //2
        [1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], //3
        [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1], // 4
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1],// 5
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1], //6
        [1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0],// 7
        [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],// 8
        [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1]// 9*!/
    );*/

    N.trainNetwork(trainQ, numConverter, function () {
        console.log('TRAIN SUCCESS');
        //  N.serializeToFile();
        N.run(trainQ[0], function (output) {
            console.log('OOOO ', output);
        });
        console.log();
        N.run(trainQ[1], function (output) {
            console.log('OOOO ', output);
        });
        console.log();
        N.run(trainQ[2], function (output) {
            console.log('OOOO ', output);
        });
        console.log();
        N.run(trainQ[3], function (output) {
            console.log('OOOO ', output);
        });
    });
});

var N = new _nn.NN({
    cycles: 1000,
    layers: [{
        type: _nn.NeuronType.INPUT,
        size: 784
    }, {
        type: _nn.NeuronType.HIDDEN,
        size: 30
    }, {
        type: _nn.NeuronType.OUTPUT,
        size: 10
    }]
});

//N.deserializeFromFile("d://network.txt");


/*
 N.trainNetwork([
 [128, 122, 122, 157, 0, 173, 255, 0, 235, 1, 0, 0, 0, 95, 0],// 0
 [0, 179, 200, 101, 0, 204, 0, 0, 54, 0, 0, 51, 0, 0, 33] //1
 /!*    [1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1], //2
 [1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], //3
 [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1], // 4
 [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1],// 5
 [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1], //6
 [1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0],// 7
 [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],// 8
 [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1]// 9*!/
 ], numConverter, () => {
 console.log('TRAIN SUCCESS');
 //  N.serializeToFile();
 N.run([128, 122, 122, 157, 0, 173, 255, 0, 235, 1, 0, 0, 0, 95, 0], function (output) {
 console.log('OOOO ', output);
 });
 });
 */

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