"use strict";
var network_actions_1 = require("../model/network.actions");
exports.INIT_NETWORK = 'INIT_NETWORK';
var initialState = {
    creatorId: 0,
    description: '',
    id: '',
    name: ''
};
function networkReducer(state, action) {
    if (state === void 0) { state = initialState; }
    if (action === void 0) { action = { type: exports.INIT_NETWORK }; }
    switch (action.type) {
        case network_actions_1.NetworkActions.CREATE_NETWORK:
            return Object.assign({}, state, { status: true });
        default:
            return state;
    }
}
exports.networkReducer = networkReducer;
//# sourceMappingURL=network.js.map