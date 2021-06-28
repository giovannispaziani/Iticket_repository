import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder,
              //private translateService: TranslateService,
              //private linguaService: LinguaService,
              private utenteService: UtenteService,
              private navController: NavController) { }

  ngOnInit() {
    //this.lingue = this.linguaService.getLingue();
    this.profiloFormModel = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required
      ])],
      telefono: [''],
      linguaPreferita: ['', Validators.compose([
        Validators.required
      ])]
    });

    //this.linguaService.getLinguaAttuale().subscribe((lingua) => {
    //  this.profiloFormModel.patchValue({linguaPreferita: lingua});
    //});
    this.utenteService.getUtente().subscribe((utente) => {
      this.profiloFormModel.patchValue({email: utente.email, telefono: utente.telefono});
      this.utente = utente;
    });
  }

  onSubmit(): void {
    //this.translateService.use(this.profiloFormModel.value.linguaPreferita);
    //this.linguaService.updateLingua(this.profiloFormModel.value.linguaPreferita);
    this.utente.email = this.profiloFormModel.value.email;
    this.utente.telefono = this.profiloFormModel.value.telefono;
    this.utente.cognome = "Giggio";
    this.utente.matricola = "212131";
    this.utente.nome = "Alfredo";
    this.utente.password ="1234";
    this.utente.ruolo ="Spazzino";
    this.utente.username ="Gabriele";
    this.utenteService.registrazione(this.utente).subscribe((nuovoUtente: Utente) => {
      this.navController.back();
    });
  }

}
