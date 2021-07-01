import { Component,OnInit } from '@angular/core';
import {UtenteService} from '../services/utente.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  private notLoggato : boolean;

  constructor(private utenteService: UtenteService,) {}

  ngOnInit() {
    if(this.utenteService.isLogged()) this.notLoggato = true;
  }
}
