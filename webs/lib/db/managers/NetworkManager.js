import { Network } from '../models/Network'
import { Store } from './Store'


export class NetworkManager {
    constructor() {
        this.Store = new Store();
    }

    createNetwork(network, fn) {
        this.Store.saveInstance(network, fn);
    }

}