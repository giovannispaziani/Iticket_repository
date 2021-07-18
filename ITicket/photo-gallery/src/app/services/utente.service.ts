import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

import {AUTH_TOKEN, URL, UTENTE_STORAGE, X_AUTH} from '../constants';
import {Utente} from '../model/utente.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


export interface Account {
    username: string;
    password: string;

}

@Injectable({
    providedIn: 'root'
})
export class UtenteService {
    private authToken: string;
    private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private utente$: BehaviorSubject<Utente> = new BehaviorSubject<Utente>({} as Utente);
    private utente : Utente;

    constructor(private http: HttpClient, private storage: Storage) {

        this.storage.get(AUTH_TOKEN).then((token) => {
            console.log("startando utenteservice..." + " isLogged " + this.loggedIn$.value);
            console.log(token);
            this.authToken = token;
            if (token !== null && token !== undefined && token !== '') {
                this.loggedIn$.next(true);
            }
        });
        this.storage.get(UTENTE_STORAGE).then((utente) => {
            this.utente$.next(utente);
        });

    }

    login(account: Account): Observable<Utente> {
        console.log("chiamata ad UtenteService");
        this.http.get("http://localhost:8080/iticket").pipe(map((res: Response) =>{
            var data = res.json();
            console.log(data);
            }));
        return this.http.post<Utente>(URL.LOGIN, account, {observe: 'response'}).pipe(
            map((resp: HttpResponse<Utente>) => {
                const token = resp.headers.get(X_AUTH);
                this.storage.set(AUTH_TOKEN, token);
                this.authToken = token;
                // Utente memorizzato nello storage in modo tale che se si vuole cambiare il
                // profilo dell'utente stesso non si fa una chiamata REST.
                this.storage.set(UTENTE_STORAGE, resp.body);

                /*this.storage.get(UTENTE_STORAGE).then((utente) => {
                    this.utente$.next(utente);
                    this.utente$.subscribe({
                      next: utente =>{
                        this.utente=utente;
                        console.log("ECCOMI NEL METODO LOGIN; STO INSERENDO NELLO STORAGE : Nome dell'utente loggato: "  + this.utente.nome + " id dell'utente loggato : " + this.utente.id + "email utente " + this.utente.email + " telefono " + this.utente.telefono);
                      }
                    }); 
                });*/

                // update dell'observable dell'utente
                this.utente$.next(resp.body);
                this.loggedIn$.next(true);
                console.log("Metodo risolto");
                return resp.body;
            }));
    }

    logout() {
        this.authToken = null;
        this.loggedIn$.next(false);
        this.storage.remove(AUTH_TOKEN);
        this.storage.remove(UTENTE_STORAGE);

        // Nessuna chiamata al server perche' JWT e' stateless quindi non prevede alcun logout.
        // Per gestirlo si dovrebbe fare lato server una blacklist.
    }

    getUtente(): BehaviorSubject<Utente> {
        return this.utente$;
    }

    getAuthToken(): string {
        return this.authToken;
    }

    isLogged(): Observable<boolean> {
        console.log("Avvio is logged");
        console.log(this.loggedIn$.value);
        return this.loggedIn$.asObservable();
    }

    updateProfilo(nuovoUtente: Utente): Observable<Utente> {
        return this.http.post<Utente>(URL.UPDATE_PROFILO, nuovoUtente, {observe: 'response'}).pipe(
            map((resp: HttpResponse<Utente>) => {
                // Aggiornamento dell'utente nello storage.
                // Utente memorizzato nello storage per evitare chiamata REST quando si vuole modificare il profilo
                // e se l'utente chiude la app e la riapre i dati sono gia' presenti
                this.storage.set(UTENTE_STORAGE, resp.body);
                // update dell'observable dell'utente
                this.utente$.next(resp.body);
                return resp.body;
            }));
    }

    registrazione(nuovoUtente: Utente): Observable<Utente> {
        console.log("Avvio registrazione, password utente : " + nuovoUtente.password);
        return this.http.post<Utente>(URL.REGISTRAZIONE, nuovoUtente, {observe: 'response'}).pipe(
           map((resp: HttpResponse<Utente>) => {
            console.log("dentro map, password utente : " + nuovoUtente.password);
                // Aggiornamento dell'utente nello storage.
                // Utente memorizzato nello storage per evitare chiamata REST quando si vuole modificare il profilo
                // e se l'utente chiude la app e la riapre i dati sono gia' presenti
                this.storage.set(UTENTE_STORAGE, resp.body);
                // update dell'observable dell'utente
                this.utente$.next(resp.body);
                return resp.body;
            }));
    } 

    findByCodiceFiscale(codiceFiscale: string) {
        const apiURL = `${URL.UTENTE}/${codiceFiscale}`;
        return this.http.get<Utente>(apiURL).pipe(
            catchError((err) => {
              console.log('error caught in service')
              console.error(err);
              return throwError(err);
            })
          )
    }


}
