import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {GamesComponent} from './games/games.component';
import {LoginComponent} from './login/login.component';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {AddCommand} from '@angular/cli/commands/add-impl';
import {EditComponent} from './games/edit/edit.component';
import {AddComponent} from './games/add/add.component';
import {DetailsComponent} from './games/details/details.component';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatListModule} from '@angular/material/list';
import {AuthGuardService} from './services/auth-guard.service';


@NgModule({
  declarations: [LoginComponent, GamesComponent, AddComponent, EditComponent, DetailsComponent],
  imports: [
    RouterModule.forRoot([
      {path: '', component: LoginComponent},
      {path: 'login', component: LoginComponent},
      {path: 'games', component: GamesComponent, canActivate: [AuthGuardService]},
      {path: 'games/add', component: AddComponent, canActivate: [AuthGuardService]},
      {path: 'games/edit/:key', component: EditComponent, canActivate: [AuthGuardService]},
      {path: 'games/details/:key', component: DetailsComponent, canActivate: [AuthGuardService]},
      {path: '**', redirectTo: 'login'}
    ]),
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
    MatListModule,
  ],
  exports: [
    RouterModule
  ],
  providers: [],

})
export class AppRoutingModule {}
