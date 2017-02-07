"use strict";
exports.LOGIN_USER = 'LOGIN_USER';
exports.LOGIN_IN_PROGRESS = 'LOGIN_IN_PROGRESS';
exports.SIGNUP_USER = 'SIGNUP_USER';
exports.SIGNUP_IN_PROGRESS = 'SIGNUP_IN_PROGRESS';
exports.USER_AUTHENTICATED = 'USER_AUTHENTICATED';
exports.AUTH_TOKEN_EXPIRED = 'AUTH_TOKEN_EXPIRED';
exports.LOGIN_FAILURE = 'LOGIN_FAILURE';
exports.SIGNUP_FAILURE = 'SIGNUP_FAILURE';
exports.LOGOUT_USER = 'LOGOUT_USER';
exports.LOGOUT_IN_PROGRESS = 'LOGOUT_IN_PROGRESS';
exports.LOGOUT_RECEIVED = 'LOGOUT_RECEIVED';
exports.INIT = 'INIT';
var initialState = {
    error: null,
    token: null,
    current: null
};
exports.auth = function (state, action) {
    if (state === void 0) { state = initialState; }
    if (action === void 0) { action = { type: exports.INIT }; }
    switch (action.type) {
        case exports.USER_AUTHENTICATED:
            return Object.assign({}, state, { token: action.payload.token, current: action.payload.user, error: null });
        case exports.LOGOUT_RECEIVED:
            return Object.assign({}, initialState);
        case exports.LOGIN_FAILURE:
        case exports.SIGNUP_FAILURE:
        case exports.AUTH_TOKEN_EXPIRED:
            return Object.assign({}, state, { error: action.payload.error, token: null, current: null });
        default:
            return state;
    }
};
//# sourceMappingURL=auth.js.map