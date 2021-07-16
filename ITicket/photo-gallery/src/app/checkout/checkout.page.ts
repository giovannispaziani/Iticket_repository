import { Component, OnInit } from '@angular/core';
import {Checkout} from '../model/checkout.model';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators/tap';
import {CheckoutService} from '../services/checkout.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  private checkoutItems$: Observable<Checkout[]>;
  private prezzoTotale : number;

  constructor(private checkoutService : CheckoutService, private route: ActivatedRoute) {
    //route.params.subscribe(val => {
    //  this.ngOnInit();
    //});
   }

  ngOnInit() {
    this.route.params.subscribe(val => {
      console.log("OnInit checkout");
      this.checkoutItems$ = this.checkoutService.list();
      var prezzoTotalee  : number; 
      prezzoTotalee = 0;
      this.checkoutService.list().subscribe((carrelloItems) => {  
        carrelloItems.forEach(function (carrelloItem) {
          console.log("prezzo itemCarrello = " + carrelloItem.prezzo);
          prezzoTotalee = prezzoTotalee + carrelloItem.prezzo;
          console.log("prezzo totale : " + prezzoTotalee);
        })
        this.prezzoTotale = prezzoTotalee;
      });
      });
}

  doRefresh(event) {
    this.checkoutItems$ = this.checkoutService.list()
        .pipe(tap(() => {
          event.target.complete();
        }));
  }
    
 /* checkout(carrello$ : Observable<Carrello[]>, eventoService : EventoService) {
    this.checkoutObservable = new Observable<Checkout>();

    console.log("CheckoutPage metodo checkout : ");
 carrello$.subscribe((carrellod) => {
     carrellod.forEach(function (value) {
       console.log("TITOLO : " + value.titolo);
       console.log("Evento ID : " + value.eventoCorrelato.id);
       console.log("Quantita' : " + value.quantita);
       console.log("findEventoById...");
       eventoService.findById(value.eventoCorrelato.id)
       .subscribe({next: eventoAlCheckout =>{
        console.log("Titolo evento checkout : " + eventoAlCheckout.titolo + ", data evento checkout : " + eventoAlCheckout.dataEvento);
      }
      // vedere come aggiungere un Checkout ad un array di observable Checkout
    })

    const checkoutModel = new Checkout();
    checkoutModel.quantita = value.quantita;
    const checkoutModel2 = new Checkout();
    checkoutModel2.quantita = value.quantita;
    console.log("checkoutModel quantita : " + checkoutModel.quantita);
    //aggiungere checkOutModel al subscriber
    let checkoutObservable = new Observable<Checkout>();
    checkoutObservable = of(checkoutModel,checkoutModel2);
    


    // Mock http
/*const http = {
  get: (url) => of(['article1']) 
}

const articles = new Subject<String>();


const list = () => {
  return http.get('aa').pipe(map((n=> articles.next(n))));
}

const add = (article) => {
  articles.take(1).subscribe(current => {
    current.push(article);
    articles.next(current);
  })
}

// Subscribe to 
articles.subscribe(console.log)

// Action
fetch().subscribe(
  add('article3')
)
*/





  //   }/*Fine forEach*/)
 //  }
    
 //  )
 //}

}
