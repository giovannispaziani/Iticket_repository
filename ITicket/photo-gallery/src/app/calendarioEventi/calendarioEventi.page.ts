import {Component, OnInit} from '@angular/core';
import {Evento} from '../model/evento.model';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators/tap';
import {EventoService} from '../services/evento.service';
import {CarrelloService} from '../services/carrello.service';


import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-calendarioEventi',
  templateUrl: './calendarioEventi.page.html',
  styleUrls: ['./calendarioEventi.page.scss'],
})
export class CalendarioEventiPage implements OnInit {
  private eventi$: Observable<Evento[]>;

  constructor(private eventoService: EventoService, private carrelloService : CarrelloService) {
  }

  ngOnInit() {
    this.eventi$ = this.eventoService.list();
  }

  doRefresh(event) {
    this.eventi$ = this.eventoService.list()
        .pipe(tap(() => {
          event.target.complete();
        }));
  }

}
