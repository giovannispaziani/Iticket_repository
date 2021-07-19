import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
//import {Lingua, LinguaService} from '../../services/lingua.service';
import {UtenteService} from '../services/utente.service';
import {BehaviorSubject} from 'rxjs';
import {Utente} from '../model/utente.model';
import {NavController} from '@ionic/angular';
//import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.page.html',
  styleUrls: ['./registrazione.page.scss'],
})
export class RegistrazionePage implements OnInit {

  //private lingue: Lingua[];
  private profiloFormModel: FormGroup;
  private utente: Utente;
  private utente$: BehaviorSubject<Utente> = new BehaviorSubject<Utente>({} as Utente);


  constructor(private formBuilder: FormBuilder,
              //private translateService: TranslateService,
              //private linguaService: LinguaService,
              private utenteService: UtenteService,
              private navController: NavController) { }

  ngOnInit() {
    //this.lingue = this.linguaService.getLingue();
    this.profiloFormModel = this.formBuilder.group({
      nome: new FormControl('',  { validators : [Validators.required] }),
      cognome: new FormControl('',  { validators : [Validators.required] }),
      email: new FormControl('',  { validators : [Validators.required] }),
      indirizzoSpedizione: new FormControl('',  { validators : [Validators.required] }),
      indirizzoFatturazione: new FormControl('',  { validators : [Validators.required] }),
      telefono: new FormControl('',  { validators : [Validators.required] }),
      password: new FormControl('',  { validators : [Validators.required] }),
      confermaPassword: new FormControl('',  { validators : [Validators.required] }),
    });

    //this.linguaService.getLinguaAttuale().subscribe((lingua) => {
    //  this.profiloFormModel.patchValue({linguaPreferita: lingua});
    //});
    /*this.utenteService.getUtente().subscribe((utente) => {
      this.profiloFormModel.patchValue({email: utente.email, telefono: utente.telefono});
      this.utente = utente;
    });*/
  }

  onSubmit(): void {
    //this.translateService.use(this.profiloFormModel.value.linguaPreferita);
    //this.linguaService.updateLingua(this.profiloFormModel.value.linguaPreferita);
    this.utente$.subscribe((utente) => {
      this.utente = utente;
      this.utente.email = this.profiloFormModel.value.email;
      this.utente.telefono =  this.profiloFormModel.value.telefono;
      this.utente.cognome = this.profiloFormModel.value.cognome;
      this.utente.matricola = "212131";
      this.utente.nome = this.profiloFormModel.value.nome;
      this.utente.password = this.profiloFormModel.value.password;
      this.utente.ruolo ="Spazzino2";
      this.utente.username =this.profiloFormModel.value.email;
      this.utente.indirizzoSpedizione =  this.profiloFormModel.value.indirizzoSpedizione;
      this.utente.indirizzoFatturazione = this.profiloFormModel.value.indirizzoFatturazione;
    });
    
    console.log("Stampo la password dell'utente creato : " + this.utente.password);
    this.utenteService.registrazione(this.utente).subscribe((nuovoUtente: Utente) => {
      //this.navController.navigateRoot('tabs');
      //this.navController.navigateRoot('/tabs/login');
      this.navController.back();
    });
  }

}
