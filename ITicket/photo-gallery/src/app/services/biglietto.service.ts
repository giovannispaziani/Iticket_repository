import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';


import {URL} from '../constants';
import {Carrello} from '../model/carrello.model';
import {Biglietto} from '../model/biglietto.model';
import {Evento} from '../model/evento.model';
import {Utente} from '../model/utente.model';
import {Observable, BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})

export class BigliettoService {
    private bigliettoAdd$: BehaviorSubject<Biglietto> = new BehaviorSubject<Biglietto>({} as Biglietto);


    constructor(private http: HttpClient) {
    }


    list(): Observable<Biglietto[]> {
        return this.http.get<Biglietto[]>(URL.BIGLIETTO);
    }

    findById(carrelloId: number): Observable<Carrello> {
        const apiURL = `${URL.CARRELLO}/${carrelloId}`;
        return this.http.get<Carrello>(apiURL);
    }

    salvaBiglietto(biglietto: Biglietto): Observable<Biglietto> {
        console.log("avvio salvaBiglietto");
        console.log("Docente correlato : " + biglietto.docenteCorrelato.id + ", evento correlato : " + biglietto.eventoCorrelato.id);
        return this.http.post<Biglietto>(URL.BIGLIETTO, biglietto, {observe: 'response'}).pipe(
            map((resp: HttpResponse<Biglietto>) => {
                console.log("Sono in MAP");
                 // Aggiornamento dell'utente nello storage.
                 // Utente memorizzato nello storage per evitare chiamata REST quando si vuole modificare il profilo
                 // e se l'utente chiude la app e la riapre i dati sono gia' presenti
                 
                 // update dell'observable dell'utente
                 this.bigliettoAdd$.next(resp.body);
                 return resp.body;
             }));
    } 

    deleteByIdEvento(eventoId: number) : Observable<Biglietto>{
        const apiURL = `${URL.BIGLIETTO}/${eventoId}`;
        return this.http.delete<Biglietto>(apiURL);
    }
d
} 
