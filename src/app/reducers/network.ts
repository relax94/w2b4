import { Action, ActionReducer, Reducer } from '@ngrx/store'

import { Network } from '../model/models'
import { NetworkActions } from '../model/network.actions'

export const INIT_NETWORK = 'INIT_NETWORK';
const initialState: Network = {
    creatorId: 0,
    description: '',
    id: '',
    name: ''
};



export function networkReducer(state = initialState, action: Action = { type: INIT_NETWORK }) {
    switch (action.type) {

        case NetworkActions.CREATE_NETWORK:
            return Object.assign({}, state, { status: true });

        default:
            return state
    }
}