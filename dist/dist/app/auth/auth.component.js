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
var AuthComponent = function () {
    function AuthComponent(sanitizer, auth, router) {
        this.sanitizer = sanitizer;
        this.auth = auth;
        this.router = router;
        this.isProgressActivated = false;
        this.fullBackVideo = sanitizer.bypassSecurityTrustUrl('http://thenewcode.com/assets/videos/polina.mp4');
        this.subscription = this.auth.current$.subscribe(this.handleCurrentSubscription.bind(this));
        this.errorSubscription = this.auth.error$.subscribe(this.handleErrorSubscription.bind(this));
    }
    AuthComponent.prototype.loginMember = function () {
        this.activateAuthenticationProgress();
        this.auth.login('basket.pavlenko@gmail.com', '1111');
    };
    AuthComponent.prototype.activateAuthenticationProgress = function () {
        this.error = "";
        this.isProgressActivated = true;
    };
    AuthComponent.prototype.deactivateAuthenticationProgress = function () {
        this.isProgressActivated = false;
    };
    AuthComponent.prototype.handleCurrentSubscription = function (token) {
        if (token) {
            this.router.navigateByUrl('/home');
        }
    };
    AuthComponent.prototype.handleErrorSubscription = function (error) {
        this.error = error;
        this.deactivateAuthenticationProgress();
    };
    return AuthComponent;
}();
AuthComponent = __decorate([core_1.Component({
    selector: "auth",
    styleUrls: ['./auth.component.css'],
    templateUrl: './auth.component.html'
})], AuthComponent);
exports.AuthComponent = AuthComponent;
//# sourceMappingURL=auth.component.js.map
//# sourceMappingURL=auth.component.js.map