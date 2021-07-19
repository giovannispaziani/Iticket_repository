import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {BigliettoService} from '../services/biglietto.service';
import {UtenteService} from '../services/utente.service';
import {EventoService} from '../services/evento.service';
import { filter, map, throwIfEmpty} from 'rxjs/operators';
import {Observable,BehaviorSubject} from 'rxjs';
import {Utente} from '../model/utente.model';
import {Evento} from '../model/evento.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'app-pubblicazione-annuncio',
  templateUrl: './pubblicazione-annuncio.page.html',
  styleUrls: ['./pubblicazione-annuncio.page.scss'],
})
export class PubblicazioneAnnuncioPage implements OnInit {

  options: number[] = [];
  private utente: Utente;

  private evento$: BehaviorSubject<Evento> = new BehaviorSubject<Evento>({} as Evento);
  private evento: Evento;
  private annuncioFormModel: FormGroup;



  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private bigliettoService : BigliettoService,  private utenteService: UtenteService, private eventoService : EventoService) { }

  ngOnInit() {
    this.utenteService.getUtente().subscribe((utente) => {
      this.utente = utente;
    });

    this.annuncioFormModel = this.formBuilder.group({
      prezzo: new FormControl('',  { validators : [Validators.required] }),
      causaRivendita: new FormControl('',  { validators : [Validators.required] }),
    });


  }

  vendi() {
  console.log("avvio metodo vendi");
  this.route.paramMap.subscribe((params: ParamMap) => {
    console.log(params.get('selectedOptionsStringify'));
    this.options =JSON.parse(params.get('selectedOptionsStringify'));
    this.options.forEach(idEvento => {
      console.log("valore : " + idEvento);

      // CREO NUOVO EVENTO CON I DATI DELLA PUBBLICAZIONE DELL'ANNUNCIO
      this.evento$.subscribe((evento) => {
        this.evento = evento;
        this.evento.prezzo = this.annuncioFormModel.value.prezzo;
        this.evento.postiDisponibili = 1;
        this.eventoService.findById(idEvento).pipe(map(evento => {
          this.evento.titolo = evento.titolo;
          this.evento.orarioApertura = evento.orarioApertura;
          this.evento.dataEvento = evento.dataEvento;
          this.evento.descrizione = "Biglietto rivenduto da : " + this.utente.email + ", causa rivendita : " + this.annuncioFormModel.value.causaRivendita + ", " + evento.descrizione;
          this.eventoService.create(this.evento).subscribe((nuovoEvento: Evento) => {
          });
        })).subscribe();
      });

      

      // CANCELLO IL BIGLIETTO DELL'UTENTE CHE L'HA VENDUTO
      this.bigliettoService.deleteByIdEvento(idEvento).pipe(map(event => {
      })).subscribe();
    });
    });
  }

}
