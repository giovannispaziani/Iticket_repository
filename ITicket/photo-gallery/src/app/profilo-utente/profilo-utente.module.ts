import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ProfiloUtentePage} from './profilo-utente.page';
import {HttpClient} from '@angular/common/http';
//import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
//import {createTranslateLoader} from '../../app.module';

const routes: Routes = [
    {
        path: '',
        component: ProfiloUtentePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        /*TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),*/
        RouterModule.forChild(routes)
    ],
    declarations: [ProfiloUtentePage]
})
export class ProfiloUtentePageModule {
}
