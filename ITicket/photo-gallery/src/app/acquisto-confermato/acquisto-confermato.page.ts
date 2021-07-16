import { Component, OnInit } from '@angular/core';
import { CarrelloService } from '../services/carrello.service';
import {Observable,BehaviorSubject} from 'rxjs';
import {Carrello} from '../model/carrello.model';
import {Biglietto} from '../model/biglietto.model';
import {Evento} from '../model/evento.model';
import {BigliettoService} from '../services/biglietto.service';
import {EventoService} from '../services/evento.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-acquisto-confermato',
  templateUrl: './acquisto-confermato.page.html',
  styleUrls: ['./acquisto-confermato.page.scss'],
})
export class AcquistoConfermatoPage implements OnInit {

  public carrello$: Observable<Carrello[]>;
  private prezzoTotale : number;
  private carrello : Carrello;
  private bigliettoItem$ : BehaviorSubject<Biglietto>  = new BehaviorSubject<Biglietto>({} as Biglietto);
  private biglietto : Biglietto;

  constructor(private carrelloService : CarrelloService, private bigliettoService : BigliettoService,
     private eventoService : EventoService, private route: ActivatedRoute)  {
      /*route.params.subscribe(val => {
        this.ngOnInit();
      });*/
      }

  ngOnInit() {
    this.route.params.subscribe(val => {
      console.log("pagamento...");
      var copiaBigliettoService = this.bigliettoService;
      var copiaEventoService = this.eventoService;
      this.carrello$ = this.carrelloService.list();
      var prezzoTotalee  : number; 
      prezzoTotalee = 0;
      this.carrelloService.list().subscribe((carrelloItems) => {
        carrelloItems.forEach(function (carrelloItem) {
          console.log("prezzo itemCarrello = " + carrelloItem.prezzo);
          prezzoTotalee = prezzoTotalee + carrelloItem.prezzo;
          console.log("prezzo totale : " + prezzoTotalee);
          //creo il biglietto da salvare
          var bigliettoItem$ : BehaviorSubject<Biglietto>  = new BehaviorSubject<Biglietto>({} as Biglietto);
          var biglietto : Biglietto;

          bigliettoItem$.subscribe((biglietto) => {
            biglietto = biglietto;
            biglietto.titolo = carrelloItem.eventoCorrelato.titolo;
            console.log("titolo biglietto : " + biglietto.titolo);
            biglietto.eventoCorrelato = carrelloItem.eventoCorrelato;
            biglietto.docenteCorrelato = carrelloItem.docenteCorrelato;
            biglietto.quantita = carrelloItem.quantita;
            biglietto.prezzo = carrelloItem.prezzo/carrelloItem.quantita;
            copiaBigliettoService.salvaBiglietto(biglietto).subscribe((nuovoBiglietto: Biglietto) => {
              console.log("subscribe di nuovo biglietto response");
            });
            // aggiorno i posti disponibili dell'evento correlato
            var eventoItem$ : Observable<Evento>;
            var evento : Evento;

            eventoItem$ = copiaEventoService.findById(biglietto.eventoCorrelato.id);
            eventoItem$.subscribe((evento) => {
              evento = evento;
              evento.postiDisponibili = evento.postiDisponibili - biglietto.quantita;
              copiaEventoService.update(evento).subscribe((nuovoEvento: Evento) => {
                //this.navController.navigateRoot('tabs');
                //this.navController.navigateRoot('/tabs/login');
                
              });;
            });

          });
        })
        this.prezzoTotale = prezzoTotalee;
        this.carrelloService.delete();
      });
    });
  }

}
