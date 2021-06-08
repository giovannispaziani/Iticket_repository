import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RivenditaBigliettoPageRoutingModule } from './rivendita-biglietto-routing.module';

import { RivenditaBigliettoPage } from './rivendita-biglietto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RivenditaBigliettoPageRoutingModule
  ],
  declarations: [RivenditaBigliettoPage]
})
export class RivenditaBigliettoPageModule {}
