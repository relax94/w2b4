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
        size: 5
    }]
});


N.trainNetwork([
    [0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1], //1
    [1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1], //2
    [1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], //3
    [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1], // 4
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1] // 5
], [
        [1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1]
    ], () => {
        console.log('TRAIN SUCCESS');
        // N.run([1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1]);
    });



export let PostImageData = {
    method: 'POST',
    path: '/network/games/image',
    handler: (req, reply) => {
        for (let k in req.payload)
            N.run(req.payload[k]);

        console.log('');
        console.log('');
        console.log('');
        console.log('');

        return reply();
    }
};