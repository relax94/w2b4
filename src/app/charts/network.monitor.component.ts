import { Component } from '@angular/core';
import { Store } from '@ngrx/store'
import { Network } from '../model/models'
import { NetworkActions } from '../model/network.actions'

@Component({
  selector: 'network-monitor-component',
  templateUrl: './network.monitor.component.html'
})
export class NetworkMonitorComponent {
  // lineChart
  public lineChartData: Array<any> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType: string = 'line';
  public pieChartType: string = 'pie';

  // Pie
  public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];

  public randomizeType(): void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor(private networkActions: NetworkActions, private store: Store<Network>) {
    var el$ = this.store.select(state => state.name);
    this.store.dispatch(this.networkActions.createNetwork());

    console.log('el ', el$);
  }

}