import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';


import {URL} from '../constants';
import {Evento} from '../model/evento.model';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class EventoService {

    constructor(private http: HttpClient) {
    }

    list(): Observable<Evento[]> {
        return this.http.get<Evento[]>(URL.EVENTI);
    }

    findById(eventoId: number): Observable<Evento> {
        const apiURL = `${URL.EVENTI}/${eventoId}`;
        return this.http.get<Evento>(apiURL);
    }

}
