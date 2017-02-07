"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var constants_1 = require("./constants");
require("rxjs/add/operator/map");
var ApiService = (function () {
    function ApiService(http, _store) {
        this.http = http;
        this._store = _store;
    }
    ApiService.prototype.loginUser = function (user) {
        return this.request({
            body: user,
            method: http_1.RequestMethod.Post,
            url: constants_1.API_LOGIN_URL
        });
    };
    ApiService.prototype.request = function (options) {
        if (options.body) {
            if (typeof options.body !== 'string') {
                options.body = JSON.stringify(options.body);
            }
            options.headers = new http_1.Headers({
                'Content-Type': 'application/json'
            });
        }
        return this.http.request(new http_1.Request(options))
            .map(function (res) { return res.json(); })
            .catch(function (err) {
            return Observable_1.Observable.of({ token: null, error: "Network error" });
        });
    };
    return ApiService;
}());
ApiService = __decorate([
    core_1.Injectable()
], ApiService);
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map