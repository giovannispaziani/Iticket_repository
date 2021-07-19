import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'impostazioni',
    loadChildren: () => import('./impostazioni/impostazioni.module').then( m => m.ImpostazioniPageModule)
  },
  {
    path: 'carrello',
    loadChildren: () => import('./carrello/carrello.module').then( m => m.CarrelloPageModule)
  },
  {
    path: 'profilo-utente',
    loadChildren: () => import('./profilo-utente/profilo-utente.module').then( m => m.ProfiloUtentePageModule)
  },
  {
    path: 'rivendita-biglietto',
    loadChildren: () => import('./rivendita-biglietto/rivendita-biglietto.module').then( m => m.RivenditaBigliettoPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'pubblicazione-annuncio',
    loadChildren: () => import('./pubblicazione-annuncio/pubblicazione-annuncio.module').then( m => m.PubblicazioneAnnuncioPageModule)
  },
  {
    path: 'pagamento',
    loadChildren: () => import('./pagamento/pagamento.module').then( m => m.PagamentoPageModule)
  },
  {
    path: 'assistenza',
    loadChildren: () => import('./assistenza/assistenza.module').then( m => m.AssistenzaPageModule)
  },
  {
    path: 'cambio-nominativo-biglietto',
    loadChildren: () => import('./cambio-nominativo-biglietto/cambio-nominativo-biglietto.module').then( m => m.CambioNominativoBigliettoPageModule)
  },
  {
    path: 'calendarioEventi',
    loadChildren: () => import('./calendarioEventi/calendarioEventi.module').then( m => m.CalendarioEventiPageModule)
  },
  {
    path: 'notizie',
    loadChildren: () => import('./notizie/notizie.module').then( m => m.NotiziePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrazione',
    loadChildren: () => import('./registrazione/registrazione.module').then( m => m.RegistrazionePageModule)
  },
  {
    path: 'acquisto-confermato',
    loadChildren: () => import('./acquisto-confermato/acquisto-confermato.module').then( m => m.AcquistoConfermatoPageModule)
  },  {
    path: 'vendita-confermata',
    loadChildren: () => import('./vendita-confermata/vendita-confermata.module').then( m => m.VenditaConfermataPageModule)
  },




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
