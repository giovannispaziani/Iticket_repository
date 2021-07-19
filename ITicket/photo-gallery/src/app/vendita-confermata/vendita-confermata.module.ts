import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VenditaConfermataPageRoutingModule } from './vendita-confermata-routing.module';

import { VenditaConfermataPage } from './vendita-confermata.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VenditaConfermataPageRoutingModule
  ],
  declarations: [VenditaConfermataPage]
})
export class VenditaConfermataPageModule {}
