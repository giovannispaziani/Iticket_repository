import { Component, OnInit } from '@angular/core';
import {UtenteService} from '../services/utente.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Utente } from '../model/utente.model';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';





@Component({
  selector: 'app-impostazioni',
  templateUrl: './impostazioni.page.html',
  styleUrls: ['./impostazioni.page.scss'],
})
export class ImpostazioniPage implements OnInit {

  private profiloFormModel: FormGroup;
  private utente : Utente;
  private utente2 : Utente;
  private utente$: BehaviorSubject<Utente> = new BehaviorSubject<Utente>({} as Utente);


  constructor(private utenteService: UtenteService,private formBuilder: FormBuilder, private navController: NavController, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(val => {
    this.profiloFormModel = this.formBuilder.group({
      email: new FormControl('',  { validators : [Validators.required] }),
      indirizzoSpedizione: new FormControl('',  { validators : [Validators.required] }),
      indirizzoFatturazione: new FormControl('',  { validators : [Validators.required] }),
      telefono: new FormControl('',  { validators : [Validators.required] }),
      password: new FormControl('',  { validators : [Validators.nullValidator] }),
      confermaPassword: new FormControl('',  { validators : [Validators.nullValidator] }),
    });
    this.utenteService.getUtente().subscribe((utente) => {
      this.profiloFormModel.patchValue({email: utente.email, telefono: utente.telefono, indirizzoSpedizione: utente.indirizzoSpedizione, indirizzoFatturazione: utente.indirizzoFatturazione});
      this.utente = utente;
    });
  });

  }

  logout() {
    this.utenteService.logout();
    this.navController.navigateRoot("tabs/tab1");
  }

  aggiornaProfilo() {
    this.utente$.subscribe((utente) => {
      this.utente = utente;
      
      this.utente.email = this.profiloFormModel.value.email;
      this.utente.telefono =  this.profiloFormModel.value.telefono;
      if( this.profiloFormModel.value.password!="") {
        this.utente.password = this.profiloFormModel.value.password;
      }
      else console.log("la password da modificare è nulla");
      this.utenteService.getUtente().subscribe((utente) => {
        this.utente.username = utente.username;
      });
      this.utente.indirizzoSpedizione =  this.profiloFormModel.value.indirizzoSpedizione;
      this.utente.indirizzoFatturazione = this.profiloFormModel.value.indirizzoFatturazione;
    });
    
    console.log("Stampo la password dell'utente creato : " + this.utente.password);
    this.utenteService.updateProfilo(this.utente).subscribe((nuovoUtente: Utente) => {
      //this.navController.navigateRoot('tabs');
      //this.navController.navigateRoot('/tabs/login');
      this.utenteService.logout();
      this.navController.navigateRoot("tabs/login");
    });
  }

}
