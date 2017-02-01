'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NetworkManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Network = require('../models/Network');

var _Store = require('./Store');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NetworkManager = exports.NetworkManager = function () {
    function NetworkManager() {
        _classCallCheck(this, NetworkManager);

        this.Store = new _Store.Store();
    }

    _createClass(NetworkManager, [{
        key: 'createNetwork',
        value: function createNetwork(network, fn) {
            this.Store.saveInstance(network, fn);
        }
    }]);

    return NetworkManager;
}();