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
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var store_devtools_1 = require("@ngrx/store-devtools");
var store_1 = require("@ngrx/store");
var auth_1 = require("./reducers/auth");
var network_1 = require("./reducers/network");
var ng2_charts_1 = require("ng2-charts");
var core_2 = require("angular2-google-maps/core");
var api_1 = require("./services/api");
/*
 * Platform and Environment providers/directives/pipes
 */
var app_routes_1 = require("./app.routes");
var appcom_1 = require("./appcom");
var home_1 = require("./home");
var auth_2 = require("./auth");
var charts_1 = require("./charts");
var map_1 = require("./map");
var auth_service_1 = require("./model/auth.service");
var network_actions_1 = require("./model/network.actions");
var AppModule = function () {
    function AppModule() {}
    return AppModule;
}();
AppModule = __decorate([core_1.NgModule({
    bootstrap: [appcom_1.AppComponent],
    declarations: [appcom_1.AppComponent, auth_2.AuthComponent, home_1.HomeComponent, charts_1.NetworkMonitorComponent, map_1.NetworkMapComponent],
    imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, router_1.RouterModule.forRoot(app_routes_1.ROUTES, { useHash: true, preloadingStrategy: router_1.PreloadAllModules }), store_1.StoreModule.provideStore({ auth: auth_1.auth, networkReducer: network_1.networkReducer }), ng2_charts_1.ChartsModule, core_2.AgmCoreModule.forRoot({
        apiKey: 'AIzaSyCX0j5DYkIJKNQfI9zQJkNRYLA2d0y4hqY'
    }), store_devtools_1.StoreDevtoolsModule.instrumentOnlyWithExtension({
        maxAge: 5
    })],
    providers: [auth_service_1.AuthService, network_actions_1.NetworkActions, api_1.API_PROVIDERS]
})], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
//# sourceMappingURL=app.module.js.map