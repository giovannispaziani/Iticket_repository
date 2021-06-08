import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PubblicazioneAnnuncioPage } from './pubblicazione-annuncio.page';

const routes: Routes = [
  {
    path: '',
    component: PubblicazioneAnnuncioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PubblicazioneAnnuncioPageRoutingModule {}
