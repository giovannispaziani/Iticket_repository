import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfiloUtentePageRoutingModule } from './profilo-utente-routing.module';

import { ProfiloUtentePage } from './profilo-utente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfiloUtentePageRoutingModule
  ],
  declarations: [ProfiloUtentePage]
})
export class ProfiloUtentePageModule {}
