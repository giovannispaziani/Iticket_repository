import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfiloPage } from './profilo-utente.page';

const routes: Routes = [
  {
    path: '',
    component: ProfiloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfiloUtentePageRoutingModule {}
