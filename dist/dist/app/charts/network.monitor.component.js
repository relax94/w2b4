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
var NetworkMonitorComponent = function () {
    function NetworkMonitorComponent(networkActions, store) {
        this.networkActions = networkActions;
        this.store = store;
        // lineChart
        this.lineChartData = [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]];
        this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChartType = 'line';
        this.pieChartType = 'pie';
        // Pie
        this.pieChartLabels = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
        this.pieChartData = [300, 500, 100];
        var el$ = this.store.select(function (state) {
            return state.name;
        });
        this.store.dispatch(this.networkActions.createNetwork());
        console.log('el ', el$);
    }
    NetworkMonitorComponent.prototype.randomizeType = function () {
        this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
        this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
    };
    NetworkMonitorComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    NetworkMonitorComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    return NetworkMonitorComponent;
}();
NetworkMonitorComponent = __decorate([core_1.Component({
    selector: 'network-monitor-component',
    templateUrl: './network.monitor.component.html'
})], NetworkMonitorComponent);
exports.NetworkMonitorComponent = NetworkMonitorComponent;
//# sourceMappingURL=network.monitor.component.js.map
//# sourceMappingURL=network.monitor.component.js.map