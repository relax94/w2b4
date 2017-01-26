import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


import { StoreModule } from '@ngrx/store';
import { auth } from './reducers/auth'
import { ChartsModule } from 'ng2-charts';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { API_PROVIDERS } from './services/api';
/*
 * Platform and Environment providers/directives/pipes
 */

import { ROUTES } from './app.routes';
import { AppComponent } from './appcom'
import { HomeComponent } from './home';
import { AuthComponent } from './auth';
import { NetworkMonitorComponent } from './charts'
import { NetworkMapComponent } from './map'
import { AuthService } from './model/auth.service'

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        AuthComponent,
        HomeComponent,
        NetworkMonitorComponent,
        NetworkMapComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
        StoreModule.provideStore({ auth: auth }),
        ChartsModule, AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCX0j5DYkIJKNQfI9zQJkNRYLA2d0y4hqY'
        }),
        StoreDevtoolsModule.instrumentOnlyWithExtension({
            maxAge: 5
        })
    ],
    providers: [
        AuthService,
        API_PROVIDERS
    ]
})
export class AppModule {

    constructor() { }
}