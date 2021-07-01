import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarioEventiPage } from './calendarioEventi.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarioEventiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarioEventiPageRoutingModule {}
