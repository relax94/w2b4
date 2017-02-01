'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Network = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NetworkSchema = new _mongoose2.default.Schema({
    _id: _mongoose2.default.Schema.Types.ObjectId,
    public_id: _mongoose2.default.Schema.Types.ObjectId,
    creator_id: _mongoose2.default.Schema.Types.ObjectId,
    name: String,
    description: String

}, { collection: 'Network' });

var Network = exports.Network = _mongoose2.default.model('Network', NetworkSchema);