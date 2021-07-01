import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarioEventiPageRoutingModule } from './calendarioEventi-routing.module';

import { CalendarioEventiPage } from './calendarioEventi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarioEventiPageRoutingModule
  ],
  declarations: [CalendarioEventiPage]
})
export class CalendarioEventiPageModule {}
