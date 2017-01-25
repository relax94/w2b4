import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestMethod, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_LOGIN_URL } from './constants'

import { Store } from '@ngrx/store';

import { User, Auth } from '../model/models';

import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
    private token$: Observable<string>;

    constructor(private http: Http, private _store: Store<any>) {
    }

    loginUser(user: any): Observable<Auth> {
        return this.request({
            body: user,
            method: RequestMethod.Post,
            url: API_LOGIN_URL
        });
    }


    request(options: any): Observable<any> {
        if (options.body) {
            if (typeof options.body !== 'string') {
                options.body = JSON.stringify(options.body);
            }

            options.headers = new Headers({
                'Content-Type': 'application/json'
            });
        }

        return this.http.request(new Request(options))
            .map((res: Response) => res.json());
    }

}