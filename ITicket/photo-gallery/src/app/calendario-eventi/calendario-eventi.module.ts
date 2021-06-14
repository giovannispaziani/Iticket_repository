import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarioEventiPageRoutingModule } from './calendario-eventi-routing.module';

import { CalendarioEventiPage } from './calendario-eventi.page';

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
