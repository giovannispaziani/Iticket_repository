import {HttpClient,HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {URL} from '../constants';
import {Evento} from '../model/evento.model';
import {Observable,BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})

export class EventoService {

    private evento$: BehaviorSubject<Evento> = new BehaviorSubject<Evento>({} as Evento);


    constructor(private http: HttpClient) {
    }

    list(): Observable<Evento[]> {
        return this.http.get<Evento[]>(URL.EVENTI);
    }

    findById(eventoId: number): Observable<Evento> {
        const apiURL = `${URL.EVENTI}/${eventoId}`;
        return this.http.get<Evento>(apiURL);
    }

    update(nuovoEvento : Evento): Observable<Evento> {
        console.log("Avvio updateEvento, posti disponibili : " + nuovoEvento.postiDisponibili);
        return this.http.post<Evento>(URL.EVENTI, nuovoEvento, {observe: 'response'}).pipe(
           map((resp: HttpResponse<Evento>) => {
            console.log("dentro map, nuovi posti disponibili : " + nuovoEvento.postiDisponibili);
                // Aggiornamento dell'utente nello storage.
                // Utente memorizzato nello storage per evitare chiamata REST quando si vuole modificare il profilo
                // e se l'utente chiude la app e la riapre i dati sono gia' presenti
                // update dell'observable dell'utente
                this.evento$.next(resp.body);
                return resp.body;
            }));
    } 

    create(nuovoEvento: Evento): Observable<Evento> {
        console.log("Avvio createEvento");
        return this.http.post<Evento>(URL.EVENTOCREATE, nuovoEvento, {observe: 'response'}).pipe(
           map((resp: HttpResponse<Evento>) => {
            console.log("dentro map");
                // Aggiornamento dell'utente nello storage.
                // Utente memorizzato nello storage per evitare chiamata REST quando si vuole modificare il profilo
                // e se l'utente chiude la app e la riapre i dati sono gia' presenti
                // update dell'observable dell'utente
                this.evento$.next(resp.body);
                return resp.body;
            }));
    } 

}
