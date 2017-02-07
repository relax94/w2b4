"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var NetworkActions = NetworkActions_1 = function () {
    function NetworkActions() {}
    NetworkActions.prototype.createNetwork = function () {
        return {
            type: NetworkActions_1.CREATE_NETWORK
        };
    };
    return NetworkActions;
}();
NetworkActions.CREATE_NETWORK = "CREATE_NETWORK";
NetworkActions = NetworkActions_1 = __decorate([core_1.Injectable()], NetworkActions);
exports.NetworkActions = NetworkActions;
var NetworkActions_1;
//# sourceMappingURL=network.actions.js.map
//# sourceMappingURL=network.actions.js.map