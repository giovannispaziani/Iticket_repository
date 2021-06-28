import { Component, OnInit } from '@angular/core';
import {Carrello} from '../model/carrello.model';
import {CarrelloService} from '../services/carrello.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators/tap';
import {Utente} from '../model/utente.model';
import {NavController} from '@ionic/angular';
import {UtenteService} from '../services/utente.service';



@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.page.html',
  styleUrls: ['./carrello.page.scss'],
})
export class CarrelloPage implements OnInit {
  private carrello$: Observable<Carrello[]>;
  private utente: Utente;



  constructor(private carrelloService: CarrelloService,
    private utenteService: UtenteService) { }

  ngOnInit() {
    this.carrello$ = this.carrelloService.list();
  }

  doRefresh(event) {
    this.carrello$ = this.carrelloService.list()
        .pipe(tap(() => {
          event.target.complete();
        }));
  }

}
