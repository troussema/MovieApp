import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {GamesService} from '../games/games.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService, public gamesService: GamesService) { }

  ngOnInit(): void {
    this.gamesService.loading = false;
  }

}
