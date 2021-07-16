import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import {Carrello} from '../model/carrello.model';
import {CarrelloService} from '../services/carrello.service';
import {Observable,BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/internal/operators/tap';
import {Utente} from '../model/utente.model';
import {Evento} from '../model/evento.model';

import {NavController} from '@ionic/angular';
import {UtenteService} from '../services/utente.service';
import {EventoService} from '../services/evento.service';
import {CheckoutService} from '../services/checkout.service';


import {ActivatedRoute, ParamMap} from '@angular/router';
import {Storage} from '@ionic/storage';
import {UTENTE_STORAGE} from '../constants';



import { filter, map} from 'rxjs/operators';

import { stringify } from '@angular/compiler/src/util';
import { CheckoutPage } from '../checkout/checkout.page';



@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.page.html',
  styleUrls: ['./carrello.page.scss'],
})
export class CarrelloPage implements OnInit {
  public carrello$: Observable<Carrello[]>;
  private utente: Utente;
  private aggiuntaCarrello$: Observable<Carrello>;
  private evento$ : Observable<Evento>;
  private carrelloItem$ : BehaviorSubject<Carrello>  = new BehaviorSubject<Carrello>({} as Carrello);
  private carrello : Carrello;
  private prezzoTotale : number;
  // Mi sa che prima utente$ era un semplice Observable Utente, se da problemi risettarlo così...
  private utente$: BehaviorSubject<Utente> = new BehaviorSubject<Utente>({} as Utente);
  checkoutPage: CheckoutPage;


  quantita: number[];

  someData: {
    label: string;
    value: number;
}[];
selected: number;


  constructor(private carrelloService: CarrelloService, private storage: Storage,
    private utenteService: UtenteService, private eventoService: EventoService,
    private navController: NavController, private checkoutService : CheckoutService, 
    private route: ActivatedRoute) {

      this.someData = [{
        label: 'Hello',
        value: 1
    }, {
        label: 'World',
        value: 2
    }];
    this.selected = this.someData[0].value;   


      /*route.params.subscribe(val => {
        this.ngOnInit();
      });*/
     }


    titolo : string;
    evento : Evento;
    private vecchiaQuantita : number;

  ngOnInit() {
    
    this.route.paramMap.subscribe((params: ParamMap) => {
      if(params.get('id') == null) {
        console.log("NULLOOOOOO!!!!");
        this.carrello$ = this.carrelloService.list();
        var prezzoTotalee  : number; 
                    prezzoTotalee = 0;
                    this./*carrelloService.list()*/carrello$.subscribe((carrelloItems) => {
                      carrelloItems.forEach(function (carrelloItem) {
                        console.log("prezzo itemCarrello = " + carrelloItem.prezzo);
                        prezzoTotalee = prezzoTotalee + carrelloItem.prezzo;
                        console.log("prezzo totale : " + prezzoTotalee);
                      })
                      this.prezzoTotale = prezzoTotalee;
                    });
      }
      else {
      //this.aggiuntaCarrello$ = this.carrelloService.findById(parseInt(params.get('id'), 0));
      console.log("id evento su cui hai cliccato : " + params.get('id'));
      // A QUESTO PUNTO DEVO VEDERE SE L'UTENTE HA GIA QUELL EVENTO NEL CARRELLO 
      // ED IN TAL CASO DEVO FARE UNA UPDATE NEL CARRELLO, INCREMENTANDO DI UNO LA QUANTITA'
      // CHIAMANDO DAL SERVER, IL METODO UpdateCarrello
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
                // find all di carrello
                // vedo se ce gia quell utente+evento
                console.log("Titolo carrello : " + this.carrello.titolo);


            
            /*    this.carrelloService.aggiungi(this.carrello).subscribe((nuovoCarrello: Carrello) => {
                  console.log("subscribe di nuovo carrello response");
                }); */

                this.carrelloService.aggiungi(this.carrello).pipe(
                  map(res => {
                    console.log("sto facendo la list che deve essere fatta per ultima...");
                    this.carrello$ = this.carrelloService.list();
                    var prezzoTotalee  : number; 
                    prezzoTotalee = 0;
                    this./*carrelloService.list()*/carrello$.subscribe((carrelloItems) => {
                      carrelloItems.forEach(function (carrelloItem) {
                        console.log("prezzo itemCarrello = " + carrelloItem.prezzo);
                        prezzoTotalee = prezzoTotalee + carrelloItem.prezzo;
                        console.log("prezzo totale : " + prezzoTotalee);
                      })
                      this.prezzoTotale = prezzoTotalee;
                    });

                  })).subscribe(() => {
                });

            //
     
        }
      })
      
    }});

    /*console.log("sto facendo la list che deve essere fatta per ultima...");
      this.carrello$ = this.carrelloService.list();
      var prezzoTotalee  : number; 
      prezzoTotalee = 0;
      this.carrelloService.list().subscribe((carrelloItems) => {
        carrelloItems.forEach(function (carrelloItem) {
          console.log("prezzo itemCarrello = " + carrelloItem.prezzo);
          prezzoTotalee = prezzoTotalee + carrelloItem.prezzo;
          console.log("prezzo totale : " + prezzoTotalee);
        })
        this.prezzoTotale = prezzoTotalee;
      });*/
  // var num2= ((document.getElementById("wave0") as HTMLInputElement).value);
           // console.log("ecco il valore " + num2);
    
          }


 doRefresh(event) {
    this.carrello$ = this.carrelloService.list()
        .pipe(tap(() => {
          event.target.complete();
        }));
  }

  /*aggiornaCarrello() {
    console.log("SONO IN AGGIONA CARRELLO");
    var copiaCarrelloService = this.carrelloService;
    var copiaNavController = this.navController;
    var i : number;
    i=0;
    this.carrelloService.list().pipe(
      map(carrelloItems => {
        console.log("sono dentro map");

        carrelloItems.forEach(function (carrelloItem) {
          console.log("prezzo itemCarrello = " + carrelloItem.prezzo);
          var quantita = ((document.getElementById("quantita"+i) as HTMLInputElement).value);
              console.log("ecco il valore " + quantita);
          carrelloItem.quantita = parseInt(quantita);
          copiaCarrelloService.aggiornaQuantita(carrelloItem).subscribe((nuovoCarrello: Carrello) => {
            console.log("subscribe di nuovo carrello response");
          });        //prezzoTotalee = prezzoTotalee + carrelloItem.prezzo;
          //console.log("prezzo totale : " + prezzoTotalee);
          
          i++;
          console.log(i);
          console.log(carrelloItems.length);
          if(i==carrelloItems.length)
          console.log("ARRIVATO");
          copiaNavController.navigateRoot('tabs/checkout'); 
        });
      }),
      
      ).subscribe();
         // this.navController.navigateRoot('tabs/checkout'); 
      


      /*.subscribe((carrelloItems) => {
      carrelloItems.forEach(function (carrelloItem) {
        console.log("prezzo itemCarrello = " + carrelloItem.prezzo);
        var quantita = ((document.getElementById("quantita"+i) as HTMLInputElement).value);
            console.log("ecco il valore " + quantita);
        carrelloItem.quantita = parseInt(quantita);
        copiaCarrelloService.aggiornaQuantita(carrelloItem).subscribe((nuovoCarrello: Carrello) => {
          console.log("subscribe di nuovo carrello response");
        });        //prezzoTotalee = prezzoTotalee + carrelloItem.prezzo;
        //console.log("prezzo totale : " + prezzoTotalee);
        i++;
      })
      //this.prezzoTotale = prezzoTotalee;
    });*/
    //this.navController.navigateRoot('tabs/checkout');


  //}

  /*vaiAlCheckout() {
    console.log("VaiAlCheckout");
    this.checkoutPage = new CheckoutPage(this.eventoService,this.carrelloService,this.checkoutService,this.route);
    this.checkoutPage.checkout(this.carrello$,this.eventoService);
  }*/

  /*onSearchChange(searchValue: string,vecchiaQuantita : number, prezzo : number): void {
    console.log(searchValue);
    console.log("prezzo " + prezzo);
    console.log("vecchia quantita " + vecchiaQuantita);

    if(this.vecchiaQuantita!=vecchiaQuantita) {
      this.vecchiaQuantita = vecchiaQuantita;
      var prezzoSingolo = prezzo/this.vecchiaQuantita;
      this.prezzoTotale = this.prezzoTotale - prezzoSingolo*vecchiaQuantita + parseInt(searchValue)*prezzoSingolo;
    }
    else {
      var prezzoSingolo = prezzo/this.vecchiaQuantita;
      this.prezzoTotale = this.prezzoTotale - prezzoSingolo*vecchiaQuantita + parseInt(searchValue)*prezzoSingolo;
      this.vecchiaQuantita = parseInt(searchValue);
    }

  }


  private oldValue = 0;
onModelChange(event,quantita : number) {
  if(this.oldValue == 0) {
    this.oldValue = quantita;
    console.log("VECCHIO VALUE " + this.oldValue);
  }
  else if(this.oldValue != parseInt(event.target.value)) {
    console.log("VECCHIO VALUE " + this.oldValue);
    this.oldValue = parseInt(event.target.value);
  }
}

  vaiAlCheckout() {
    this.navController.navigateRoot('tabs/checkout'); 
  }



*/


  aggiornaCarrello(event,carrello) {
    console.log(event.target.value);
    console.log(carrello.docenteCorrelato.id + " " + carrello.eventoCorrelato.id);
    var prezzoSingolo = carrello.prezzo/carrello.quantita;
    this.prezzoTotale = this.prezzoTotale - prezzoSingolo*carrello.quantita;
    carrello.quantita = event.target.value;
    this.prezzoTotale = this.prezzoTotale + prezzoSingolo*carrello.quantita;
    this.carrelloService.aggiornaQuantita(carrello).pipe(map(event=> {
      this.carrello$ = this.carrelloService.list();
    })).subscribe();
  }

  eliminaCarrelloItem(carrello:Carrello) {
    console.log("id eventocarrrello : " + carrello.eventoCorrelato.id);
    var eventoId = carrello.eventoCorrelato.id;
    var prezzoSingolo = carrello.prezzo/carrello.quantita;
    this.prezzoTotale = this.prezzoTotale - prezzoSingolo*carrello.quantita;
    this.carrelloService.deleteByIdEvento(eventoId).pipe(map(event => {
      this.carrello$ = this.carrelloService.list();
    })).subscribe();
  }

}
