import { NetworkManager } from '../db/managers/NetworkManager'

const NM = new NetworkManager();

export let CreateNetworkRoute = {
    method: 'POST',
    path: '/network/create',
    handler: (req, reply) => {
        NM.createNetwork(req.payload, (response) => {
            return reply(response);
        });
        return reply({ success: false });
    }
};
