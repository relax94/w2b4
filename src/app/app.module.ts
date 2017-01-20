import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import {auth} from './reducers/auth'

/*
 * Platform and Environment providers/directives/pipes
 */

import { ROUTES } from './app.routes';
import { AppComponent } from './appcom'
import { HomeComponent } from './home';


@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        HomeComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
        StoreModule.provideStore({auth: auth})
    ],
    providers: [
    ]
})
export class AppModule {

    constructor() { }
}