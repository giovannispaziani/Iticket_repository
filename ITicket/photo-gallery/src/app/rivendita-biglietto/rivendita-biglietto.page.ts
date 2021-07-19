import { Component, OnInit } from '@angular/core';
import {Biglietto} from '../model/biglietto.model';
import {BigliettoService} from '../services/biglietto.service';
import {Evento} from '../model/evento.model';
import {Utente} from '../model/utente.model';
import {EventoService} from '../services/evento.service';
import {UtenteService} from '../services/utente.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';




@Component({
  selector: 'app-rivendita-biglietto',
  templateUrl: './rivendita-biglietto.page.html',
  styleUrls: ['./rivendita-biglietto.page.scss'],
})
export class RivenditaBigliettoPage implements OnInit {

  public biglietto$: Observable<Biglietto[]>;
  public eventi$: Observable<Evento[]>;
  options: number[] = [];
  nomiEventi: string[] = [];
  selectedOptions: number[] = [];
  selectedOptionsStringify : string;
  private utente: Utente;

  //public evento : Observable<Evento>;

  constructor(private bigliettoService : BigliettoService, private utenteService: UtenteService,
    private eventoService : EventoService, private route: ActivatedRoute) {
    /*route.params.subscribe(val => {
      this.ngOnInit();
    });*/
   }

  ngOnInit() {
    this.route.params.subscribe(val => {
      console.log("NG ON INIT RIVENDITA...");
      this.options = [];
      this.nomiEventi = [];
      this.selectedOptions = [];
      this.biglietto$ = this.bigliettoService.list();
      var copiaEventi : Observable<Evento[]> = this.eventi$;
      var copiaEventoService : EventoService = this.eventoService;
      var eventoObservable : Observable<Evento>;
      var copiaOptions = this.options;
      var copiaNomiEventi = this.nomiEventi;
      this.biglietto$.subscribe((bigliettoItems) => {
        bigliettoItems.forEach(function (bigliettoItem) {
          console.log("eventoCorrelato per itemBiglietto = " + bigliettoItem.eventoCorrelato.id);
          eventoObservable = copiaEventoService.findById(bigliettoItem.eventoCorrelato.id);
          eventoObservable.subscribe(evento => { 
            console.log("titolo eventoCorrelato : " +  evento.titolo);
            copiaOptions.push(evento.id);
            copiaNomiEventi.push(evento.titolo);
           // copiaEventi.pipe(tap(listaEventi => {
           //   listaEventi.push(evento);
           // }));

          });
        })
      });
      this.eventi$ = copiaEventi;
      this.nomiEventi = copiaNomiEventi;
    });
    this.utenteService.getUtente().subscribe((utente) => {
      this.utente = utente;
    });
  }

  printVal(){
    console.log("printVal");
    this.selectedOptions.forEach(option => {
      console.log("opzione selezionata : " + option);
    });
    this.selectedOptionsStringify=JSON.stringify(this.selectedOptions);
  }

}
