import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {httpInterceptorProviders} from './interceptors';
import {IonicStorageModule} from '@ionic/storage';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
      HttpClientModule,
      IonicModule.forRoot(),
      /*
      TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: (createTranslateLoader),
              deps: [HttpClient]
          }
      }), */
      IonicStorageModule.forRoot({
          name: 'ITicket',
          driverOrder: ['indexeddb', 'sqlite', 'websql']
      }),
      AppRoutingModule],
  providers: [
      StatusBar,
      SplashScreen,
      {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
      httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
