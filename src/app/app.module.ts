import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { auth } from './reducers/auth'
import { ChartsModule } from 'ng2-charts';

/*
 * Platform and Environment providers/directives/pipes
 */

import { ROUTES } from './app.routes';
import { AppComponent } from './appcom'
import { HomeComponent } from './home';
import { AuthComponent } from './auth';
import { NetworkMonitorComponent } from './charts'


@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        AuthComponent,
        HomeComponent,
        NetworkMonitorComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
        StoreModule.provideStore({ auth: auth }),
        ChartsModule
    ],
    providers: [
    ]
})
export class AppModule {

    constructor() { }
}