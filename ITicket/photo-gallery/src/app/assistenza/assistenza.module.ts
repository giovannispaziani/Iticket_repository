import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssistenzaPageRoutingModule } from './assistenza-routing.module';

import { AssistenzaPage } from './assistenza.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssistenzaPageRoutingModule
  ],
  declarations: [AssistenzaPage]
})
export class AssistenzaPageModule {}
