"use strict";
var home_1 = require("./home");
var auth_1 = require("./auth");
exports.ROUTES = [
    { path: '', component: auth_1.AuthComponent },
    { path: 'home', component: home_1.HomeComponent },
];
//# sourceMappingURL=app.routes.js.map