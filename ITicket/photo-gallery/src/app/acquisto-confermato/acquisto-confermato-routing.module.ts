import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcquistoConfermatoPage } from './acquisto-confermato.page';

const routes: Routes = [
  {
    path: '',
    component: AcquistoConfermatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcquistoConfermatoPageRoutingModule {}
