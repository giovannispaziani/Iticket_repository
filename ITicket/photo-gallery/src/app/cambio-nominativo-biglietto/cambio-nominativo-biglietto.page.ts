import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { UtenteService } from '../services/utente.service';
import { BigliettoService } from '../services/biglietto.service';
import {Biglietto} from '../model/biglietto.model';
import {Evento} from '../model/evento.model';
import {EventoService} from '../services/evento.service';
import {Observable,BehaviorSubject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';



@Component({
  selector: 'app-cambio-nominativo-biglietto',
  templateUrl: './cambio-nominativo-biglietto.page.html',
  styleUrls: ['./cambio-nominativo-biglietto.page.scss'],
})
export class CambioNominativoBigliettoPage implements OnInit {

  private cambioNominativoFormModel: FormGroup;
  private loginFormModel: FormGroup;
  private biglietto$: BehaviorSubject<Biglietto> = new BehaviorSubject<Biglietto>({} as Biglietto);
  private biglietto: Biglietto;
  public bigliettoObservable$: Observable<Biglietto[]>;
  public eventi$: Observable<Evento[]>;
  selectedOptions: number[] = [];
  options: number[] = [];
  nomiEventi: string[] = [];


  constructor(private formBuilder: FormBuilder, private utenteService: UtenteService, private bigliettoService: BigliettoService, private eventoService : EventoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.cambioNominativoFormModel = this.formBuilder.group({
      codiceFiscale: new FormControl('',  { validators : [Validators.required] }),
    });
    this.route.params.subscribe(val => {
      console.log("NG ON INIT RIVENDITA...");
      this.options = [];
      this.nomiEventi = [];
      this.selectedOptions = [];
      this.bigliettoObservable$ = this.bigliettoService.list();
      var copiaEventi : Observable<Evento[]> = this.eventi$;
      var copiaEventoService : EventoService = this.eventoService;
      var eventoObservable : Observable<Evento>;
      var copiaOptions = this.options;
      var copiaNomiEventi = this.nomiEventi;
      this.bigliettoObservable$.subscribe((bigliettoItems) => {
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


  }

  cabiaNominativo() {

    const { codiceFiscale } = this.cambioNominativoFormModel.value;
    console.log(codiceFiscale);

    this.selectedOptions.forEach(idEvento => {  
      console.log("valore : " + idEvento);
      

      this.bigliettoService.getByIdEvento(idEvento).subscribe((biglietto2) => {
        console.log("MIO BIGLIETTO : " + biglietto2.titolo);

        this.biglietto$.subscribe((biglietto) => {
          this.biglietto = biglietto;
          this.biglietto.eventoCorrelato = biglietto2.eventoCorrelato;
          this.biglietto.titolo = biglietto2.titolo;
          this.biglietto.quantita = biglietto2.quantita;
          this.biglietto.prezzo = biglietto2.prezzo;
          console.log("codice fiscale : " + codiceFiscale);
          this.utenteService.findByCodiceFiscale(codiceFiscale).pipe(
            map(utente => {
            this.biglietto.docenteCorrelato = utente;
            this.bigliettoService.updateBiglietto(this.biglietto).subscribe();
          })).subscribe();
        });

      // var bigliettoNuovo : Biglietto = biglietto;
      // bigliettoNuovo.docenteCorrelato = codiceFiscale;
        //console.log("nuovo id utente " + bigliettoNuovo.docenteCorrelato);
        // this.bigliettoService.updateBiglietto(bigliettoNuovo).subscribe();
      });


    });
     

    //this.bigliettoService.getByIdEvento(codiceFiscale).subscribe((biglietto) => {console.log(biglietto.titolo)});
    //this.bigliettoService.updateBiglietto(this.bigliettoService.findById

   
    this.cambioNominativoFormModel.reset();
    
    

   /* this.utenteService.login(account).subscribe((utente: Utente) => {
          this.loginFormModel.reset();
          this.navController.navigateRoot('tabs');
        },
        (err: HttpErrorResponse) => {
          if (err.status === 401) {
            console.error('login request error: ' + err.status);
            this.showLoginError();
          }
        }); */
  }

  printVal(){
    console.log("printVal");
    this.selectedOptions.forEach(option => {
      console.log("opzione selezionata : " + option);
    });
    //this.selectedOptionsStringify=JSON.stringify(this.selectedOptions);
  }

}
