import { Component, OnInit } from '@angular/core';
import { CarrelloService } from '../services/carrello.service';
import {Observable,BehaviorSubject} from 'rxjs';
import {Utente} from '../model/utente.model';
import {Biglietto} from '../model/biglietto.model';
import {BigliettoService} from '../services/biglietto.service';
import {ActivatedRoute} from '@angular/router';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {UtenteService} from '../services/utente.service';




@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})
export class PagamentoPage implements OnInit {
  private utente: Utente;




  constructor(private route: ActivatedRoute,private utenteService: UtenteService) { }

  ngOnInit() {
    this.utenteService.getUtente().subscribe((utente) => {
      this.utente = utente;
    });
  }
  
}
