import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestMethod, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


import { Store } from '@ngrx/store';

import { User, Auth } from '../model/models';


@Injectable()
export class ApiService {
    private token$: Observable<string>;

    constructor(private http: Http, private _store: Store<any>) {
    }

}