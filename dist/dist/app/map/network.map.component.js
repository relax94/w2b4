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
var NetworkMapComponent = function () {
    function NetworkMapComponent() {
        this.lat = 51.678418;
        this.lng = 7.809007;
    }
    return NetworkMapComponent;
}();
NetworkMapComponent = __decorate([core_1.Component({
    selector: 'network-map-component',
    templateUrl: './network.map.component.html',
    styleUrls: ['./network.map.component.css']
})], NetworkMapComponent);
exports.NetworkMapComponent = NetworkMapComponent;
//# sourceMappingURL=network.map.component.js.map
//# sourceMappingURL=network.map.component.js.map