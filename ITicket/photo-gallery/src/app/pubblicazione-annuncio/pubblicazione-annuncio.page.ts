import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {BigliettoService} from '../services/biglietto.service';
import { filter, map} from 'rxjs/operators';
import {Observable,BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-pubblicazione-annuncio',
  templateUrl: './pubblicazione-annuncio.page.html',
  styleUrls: ['./pubblicazione-annuncio.page.scss'],
})
export class PubblicazioneAnnuncioPage implements OnInit {

  options: number[] = [];

  constructor(private route: ActivatedRoute, private bigliettoService : BigliettoService) { }

  ngOnInit() {
    

  }

  vendi() {
  console.log("avvio metodo vendi");
  this.route.paramMap.subscribe((params: ParamMap) => {
    console.log(params.get('selectedOptionsStringify'));
    this.options =JSON.parse(params.get('selectedOptionsStringify'));
    this.options.forEach(idEvento => {
      console.log("valore : " + idEvento);
      this.bigliettoService.deleteByIdEvento(idEvento).pipe(map(event => {
      })).subscribe();
    });
    });
  }

}
