import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';


import {URL} from '../constants';
import {Carrello} from '../model/carrello.model';
import {Utente} from '../model/utente.model';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class CarrelloService {


    constructor(private http: HttpClient) {
    }


    list(): Observable<Carrello[]> {
        return this.http.get<Carrello[]>(URL.CARRELLO);
    }

    findById(carrelloId: number): Observable<Carrello> {
        const apiURL = `${URL.CARRELLO}/${carrelloId}`;
        return this.http.get<Carrello>(apiURL);
    }

}
