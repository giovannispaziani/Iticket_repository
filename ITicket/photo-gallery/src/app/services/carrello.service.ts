import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';


import {URL} from '../constants';
import {Carrello} from '../model/carrello.model';
import {Evento} from '../model/evento.model';
import {Utente} from '../model/utente.model';
import {Observable, BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})

export class CarrelloService {
    private carrelloAdd$: BehaviorSubject<Carrello> = new BehaviorSubject<Carrello>({} as Carrello);


    constructor(private http: HttpClient) {
    }


    list(): Observable<Carrello[]> {
        return this.http.get<Carrello[]>(URL.CARRELLO);
    }

    /*findById(carrelloId: number): Observable<Carrello> {
        const apiURL = `${URL.CARRELLO}/${carrelloId}`;
        return this.http.get<Carrello>(apiURL);
    }*/

    aggiungi(nuovoCarrello: Carrello): Observable<Carrello> {
        console.log("avvio aggiungi");
        return this.http.post<Carrello>(URL.CARRELLO, nuovoCarrello, {observe: 'response'}).pipe(
            map((resp: HttpResponse<Carrello>) => {
                console.log("Sono in MAP");
                 // Aggiornamento dell'utente nello storage.
                 // Utente memorizzato nello storage per evitare chiamata REST quando si vuole modificare il profilo
                 // e se l'utente chiude la app e la riapre i dati sono gia' presenti
                 
                 // update dell'observable dell'utente
                 this.carrelloAdd$.next(resp.body);
                 return resp.body;
             }));
    } 

    aggiornaQuantita(nuovoCarrello: Carrello): Observable<Carrello> {
        console.log("avvio update");
        return this.http.post<Carrello>(URL.CARRELLOAGGIORNAQUANTITA, nuovoCarrello, {observe: 'response'}).pipe(
            map((resp: HttpResponse<Carrello>) => {
                console.log("Sono in MAP aggiorna QUANTITA");
                 // Aggiornamento dell'utente nello storage.
                 // Utente memorizzato nello storage per evitare chiamata REST quando si vuole modificare il profilo
                 // e se l'utente chiude la app e la riapre i dati sono gia' presenti
                 
                 // update dell'observable dell'utente
                 this.carrelloAdd$.next(resp.body);
                 return resp.body;
             }));
    } 

    findById(carrello : Carrello) : Observable<Carrello> {
        return this.http.get<Carrello>(URL.CARRELLOFIND);
    } 

    exists(nuovoCarrello: Carrello) : Observable<boolean> {
        console.log("avvio exists");
        return this.http.get<boolean>(URL.CARRELLOEXISTS);
    }

    delete() {
        this.http.delete(URL.CARRELLO).subscribe(()=> console.log("delete effettuata"));
    }

    deleteByIdEventod(carrello) {
        console.log("DENTRO AL SERVICE : ID CARRELLO DA ELIMINARE : " + carrello.eventoCorrelato.id);
        this.http.request<Carrello>('delete', URL.CARRELLODELETEBYEVENTO,carrello).subscribe(()=> console.log("delete effettuata"));
    }

    deleteByIdEvento(eventoId: number) : Observable<Carrello>{
        const apiURL = `${URL.CARRELLO}/${eventoId}`;
        return this.http.delete<Carrello>(apiURL);
    }

} 
