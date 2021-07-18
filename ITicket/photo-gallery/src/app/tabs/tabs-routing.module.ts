import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {AuthGuard} from '../guard/auth.guard';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'profilo-utente',
        loadChildren: () => import('../profilo-utente/profilo-utente.module').then(m => m.ProfiloUtentePageModule),
        canActivateChild: [AuthGuard]
      },
      {
      path: 'notizie',
      loadChildren: () => import('../notizie/notizie.module').then(m => m.NotiziePageModule)
    },
    {
      path: 'registrazione',
      loadChildren: () => import('../registrazione/registrazione.module').then(m => m.RegistrazionePageModule)
    },
    {
      path: 'carrello',
      loadChildren: () => import('../carrello/carrello.module').then(m => m.CarrelloPageModule),
      canActivateChild: [AuthGuard]
    },
    {
      path: 'carrello/:id',
      loadChildren: () => import('../carrello/carrello.module').then(m => m.CarrelloPageModule),
      canActivateChild: [AuthGuard]
    },
    {
      path: 'checkout',
      loadChildren: () => import('../checkout/checkout.module').then(m => m.CheckoutPageModule),
    },
    {
      path: 'calendarioEventi',
      loadChildren: () => import('../calendarioEventi/calendarioEventi.module').then(m => m.CalendarioEventiPageModule),
    },
    {
      path: 'pagamento',
      loadChildren: () => import('../pagamento/pagamento.module').then(m => m.PagamentoPageModule),
    },
    {
    path: 'acquisto-confermato',
    loadChildren: () => import('../acquisto-confermato/acquisto-confermato.module').then(m => m.AcquistoConfermatoPageModule),
    },
    {
      path: 'rivendita-biglietto',
      loadChildren: () => import('../rivendita-biglietto/rivendita-biglietto.module').then(m => m.RivenditaBigliettoPageModule),
      canActivateChild: [AuthGuard]  
    },
    {
      path: 'pubblicazione-annuncio/:selectedOptionsStringify',
      loadChildren: () => import('../pubblicazione-annuncio/pubblicazione-annuncio.module').then(m => m.PubblicazioneAnnuncioPageModule),
      canActivateChild: [AuthGuard]  
    },
    {
      path: 'assistenza',
      loadChildren: () => import('../assistenza/assistenza.module').then(m => m.AssistenzaPageModule),
      canActivateChild: [AuthGuard]  
    },
    {
      path: 'cambio-nominativo-biglietto',
      loadChildren: () => import('../cambio-nominativo-biglietto/cambio-nominativo-biglietto.module').then(m => m.CambioNominativoBigliettoPageModule),
      canActivateChild: [AuthGuard]  
    },

      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      },

    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
