// import { NetworkManager } from '../db/managers/NetworkManager'
import { NN, NeuronType } from './nn'

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


const N = new NN({
    layers: [{
        type: NeuronType.INPUT,
        size: 15
    },
    {
        type: NeuronType.HIDDEN,
        size: 15
    },
    {
        type: NeuronType.OUTPUT,
        size: 10
    }]
});

N.deserializeFromFile("d://network.txt");

/*N.trainNetwork([
    [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],// 0
    [0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1], //1
    [1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1], //2
    [1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], //3
    [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1], // 4
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1],// 5
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1], //6
    [1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0],// 7
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],// 8
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1]// 9
], [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
   ], () => {
        console.log('TRAIN SUCCESS');
        N.serializeToFile();
        // N.run([1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1]);
    });*/



export let PostImageData = {
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    method: 'POST',
    path: '/network/games/image',
    handler: (req, reply) => {
        for (let k in req.payload)
            N.run(req.payload[k], function (output) {
                return reply(output);
            });
    }
};