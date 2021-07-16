import { Component, OnInit } from '@angular/core';
import { CarrelloService } from '../services/carrello.service';
import {Observable,BehaviorSubject} from 'rxjs';
import {Carrello} from '../model/carrello.model';
import {Biglietto} from '../model/biglietto.model';
import {BigliettoService} from '../services/biglietto.service';
import {ActivatedRoute} from '@angular/router';
import {HttpClient, HttpHandler} from '@angular/common/http';



@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})
export class PagamentoPage implements OnInit {




  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }
  
}
