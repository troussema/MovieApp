import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {AuthGuardService} from './services/auth-guard.service';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    RouterModule.forRoot([]),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    ToastrModule.forRoot({}),
    MatIconModule,
    MatButtonModule,
    MatToolbarModule

  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR'},
    AuthGuardService],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
