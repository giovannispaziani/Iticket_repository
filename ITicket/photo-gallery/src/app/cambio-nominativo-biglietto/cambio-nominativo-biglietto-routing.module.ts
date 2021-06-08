import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambioNominativoBigliettoPage } from './cambio-nominativo-biglietto.page';

const routes: Routes = [
  {
    path: '',
    component: CambioNominativoBigliettoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambioNominativoBigliettoPageRoutingModule {}
