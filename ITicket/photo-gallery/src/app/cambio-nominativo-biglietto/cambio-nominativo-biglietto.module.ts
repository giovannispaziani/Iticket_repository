import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';



import { IonicModule } from '@ionic/angular';

import { CambioNominativoBigliettoPageRoutingModule } from './cambio-nominativo-biglietto-routing.module';

import { CambioNominativoBigliettoPage } from './cambio-nominativo-biglietto.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    CambioNominativoBigliettoPageRoutingModule
  ],
  declarations: [CambioNominativoBigliettoPage]
})
export class CambioNominativoBigliettoPageModule {}
