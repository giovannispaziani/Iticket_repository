import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { PubblicazioneAnnuncioPageRoutingModule } from './pubblicazione-annuncio-routing.module';

import { PubblicazioneAnnuncioPage } from './pubblicazione-annuncio.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    PubblicazioneAnnuncioPageRoutingModule
  ],
  declarations: [PubblicazioneAnnuncioPage]
})
export class PubblicazioneAnnuncioPageModule {}
