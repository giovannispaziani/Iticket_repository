import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';


import {URL} from '../constants';
import {Checkout} from '../model/checkout.model';

import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class CheckoutService {

    constructor(private http: HttpClient) {
    }

    list(): Observable<Checkout[]> {
        return this.http.get<Checkout[]>(URL.CARRELLOCHECKOUT);
    }


}
