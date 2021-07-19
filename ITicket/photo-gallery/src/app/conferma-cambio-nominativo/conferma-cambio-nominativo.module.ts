import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfermaCambioNominativoPageRoutingModule } from './conferma-cambio-nominativo-routing.module';

import { ConfermaCambioNominativoPage } from './conferma-cambio-nominativo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfermaCambioNominativoPageRoutingModule
  ],
  declarations: [ConfermaCambioNominativoPage]
})
export class ConfermaCambioNominativoPageModule {}
