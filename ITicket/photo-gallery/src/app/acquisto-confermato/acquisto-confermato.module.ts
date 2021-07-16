import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcquistoConfermatoPageRoutingModule } from './acquisto-confermato-routing.module';

import { AcquistoConfermatoPage } from './acquisto-confermato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcquistoConfermatoPageRoutingModule
  ],
  declarations: [AcquistoConfermatoPage]
})
export class AcquistoConfermatoPageModule {}
