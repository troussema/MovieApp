import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
    ToastrModule.forRoot({})

  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
