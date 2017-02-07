"use strict";

var _hapi = require("hapi");

var _hapi2 = _interopRequireDefault(_hapi);

var _inert = require("inert");

var _inert2 = _interopRequireDefault(_inert);

var _NetworkRoutes = require("./routes/NetworkRoutes");

var _PlatformRoutes = require("./routes/PlatformRoutes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = new _hapi2.default.Server();

server.connection({
    port: 4343
});
server.register(_inert2.default, function (err) {

    if (err) throw err;

    server.route(_PlatformRoutes.StatusRoute);
    server.route(_NetworkRoutes.PostImageData);

    // Start the server
    server.start(function (err) {

        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
});
//# sourceMappingURL=index.js.map