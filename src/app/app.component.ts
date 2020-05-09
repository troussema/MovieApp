import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {GamesService} from './games/games.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'GamesApp';
  constructor(public auth: AuthService , public gamesService: GamesService, public router: Router) {}

  public ngOnInit(): void {
  }

  goBack() {
    window.history.back();
  }
}
