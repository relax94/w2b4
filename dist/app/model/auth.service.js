"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var rxjs_1 = require("rxjs");
var auth_1 = require("../reducers/auth");
var AuthService = (function () {
    function AuthService(_store, api) {
        this._store = _store;
        this.api = api;
        this.actions$ = new rxjs_1.BehaviorSubject({ type: auth_1.INIT, payload: null });
        var store$ = this._store.select('auth');
        this.error$ = store$.map(function (data) { return data['error']; });
        this.token$ = store$.map(function (data) { return data['token']; });
        this.current$ = store$.map(function (data) { return data['current']; });
        var logins = this.actions$
            .filter(function (action) { return action.type === auth_1.LOGIN_USER; })
            .do(function () { return _store.dispatch({ type: auth_1.LOGIN_IN_PROGRESS }); })
            .mergeMap(function (action) { return api.loginUser(action.payload); }).share();
        var loginSuccess$ = logins.filter(function (payload) { return payload.token !== null; })
            .map(function (payload) { return ({ type: auth_1.USER_AUTHENTICATED, payload: payload }); });
        var loginFailure$ = logins.filter(function (payload) { return payload.token === null; })
            .map(function (payload) { return ({ type: auth_1.LOGIN_FAILURE, payload: payload }); });
        Observable_1.Observable
            .merge(loginSuccess$, loginFailure$)
            .subscribe(function (action) { return _store.dispatch(action); });
    }
    AuthService.prototype.login = function (email, password) {
        this.actions$.next({ type: auth_1.LOGIN_USER, payload: { email: email, password: password } });
    };
    AuthService.prototype.logout = function () {
        this.actions$.next({ type: auth_1.LOGOUT_USER });
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map