import { Component, OnInit } from '@angular/core';
import {Carrello} from '../model/carrello.model';
import {CarrelloService} from '../services/carrello.service';
import {Observable,BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/internal/operators/tap';
import {Utente} from '../model/utente.model';
import {Evento} from '../model/evento.model';

import {NavController} from '@ionic/angular';
import {UtenteService} from '../services/utente.service';
import {EventoService} from '../services/evento.service';

import {ActivatedRoute, ParamMap} from '@angular/router';
import {Storage} from '@ionic/storage';
import {UTENTE_STORAGE} from '../constants';



import { filter, map} from 'rxjs/operators';

import { stringify } from '@angular/compiler/src/util';



@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.page.html',
  styleUrls: ['./carrello.page.scss'],
})
export class CarrelloPage implements OnInit {
  private carrello$: Observable<Carrello[]>;
  private utente: Utente;
  private aggiuntaCarrello$: Observable<Carrello>;
  private evento$ : Observable<Evento>;
  private carrelloItem$ : BehaviorSubject<Carrello>  = new BehaviorSubject<Carrello>({} as Carrello);
  private carrello : Carrello;
  // Mi sa che prima utente$ era un semplice Observable Utente, se da problemi risettarlo così...
  private utente$: BehaviorSubject<Utente> = new BehaviorSubject<Utente>({} as Utente);





  constructor(private carrelloService: CarrelloService, private storage: Storage,
    private utenteService: UtenteService, private eventoService: EventoService, private route: ActivatedRoute) { }
    titolo : string;
    evento : Evento;
    

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.aggiuntaCarrello$ = this.carrelloService.findById(parseInt(params.get('id'), 0));
      console.log("id evento su cui hai cliccato : " + params.get('id'));
      this.evento$ = this.eventoService.findById(parseInt(params.get('id')));
      this.evento$.subscribe({
        next: evento =>{
          this.evento=evento;
          console.log("Titolo evento : " + this.evento.titolo);
        this.utenteService.getUtente().subscribe((utente) => {
          this.utente = utente;
          console.log("PRIMO STREAM : utente id : " + this.utente.id + ", Nome : " + this.utente.nome);
        });
                console.log("Nome dell'utente loggato: "  + this.utente.nome + " id dell'utente loggato : " + this.utente.id);
                this.carrelloItem$.subscribe((carrello) => {
                  this.carrello = carrello;
                  this.carrello.titolo = this.evento.titolo;
                  this.carrello.eventoCorrelato = this.evento;
                  console.log("Creato oggetto carrello con titolo dell evento : " + this.carrello.titolo);
                });
                this.carrello.docenteCorrelato = this.utente;
                console.log("Titolo carrello : " + this.carrello.titolo);
                this.carrelloService.aggiungi(this.carrello).subscribe((nuovoCarrello: Carrello) => {
                  console.log("subscribe di nuovo carrello response");
                });
                console.log("sto facendo la list che deve essere fatta per ultima...");
    this.carrello$ = this.carrelloService.list();
        }
      })
    });
  }

 doRefresh(event) {
    this.carrello$ = this.carrelloService.list()
        .pipe(tap(() => {
          event.target.complete();
        }));
  }

}
