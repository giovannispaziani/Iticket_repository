import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';


import {URL} from '../constants';
import {Notizia} from '../model/notizia.model';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class NotiziaService {

    constructor(private http: HttpClient) {
    }

    list(): Observable<Notizia[]> {
        return this.http.get<Notizia[]>(URL.NOTIZIE);
    }

    findById(notiziaId: number): Observable<Notizia> {
        const apiURL = `${URL.NOTIZIE}/${notiziaId}`;
        return this.http.get<Notizia>(apiURL);
    }

}
