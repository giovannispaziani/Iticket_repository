import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfermaCambioNominativoPage } from './conferma-cambio-nominativo.page';

const routes: Routes = [
  {
    path: '',
    component: ConfermaCambioNominativoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfermaCambioNominativoPageRoutingModule {}
