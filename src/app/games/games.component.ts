import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {GamesService} from './games.service';
import {Games} from './games';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {first, map} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})




export class GamesComponent implements AfterViewInit, OnInit {

  games: any;
  firstGame: Games = new Games();
  displayedColumns = ['title', 'rating', 'details', 'edit', 'delete'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(public auth: AuthService, public gamesService: GamesService, private toastr: ToastrService, private  router: Router) {
  }

  ngAfterViewInit() {

    // this.gamesService.getGamesList().valueChanges().subscribe(res => {
    //   console.log(res);
    //   this.dataSource = new MatTableDataSource(res);
    //   this.dataSource.paginator = this.paginator;
    // });

  }


  ngOnInit(): void {
    // this.auth.user$.subscribe(res => console.log(res));
    this.dataSource = new MatTableDataSource(this.games);
    this.getGamesList();
  }

  getGamesList() {
    this.gamesService.getGamesList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(games => {
      this.games = games;
      this.dataSource = new MatTableDataSource(games);
      this.dataSource.paginator = this.paginator;
      this.gamesService.loading = false;
    });
  }


  deleteGame(game) {
    // Check if the user have permission to delete
    this.auth.user$.subscribe(user => {
    if (user.uid === game.keyCreator) {
      this.gamesService
        .deleteGame(game.key)
        .then( res => {
          console.log('success!');
          this.showSuccess();
        })
        .catch(err => {
          console.log(err);
          this.showFailed();
        });
    } else {
      this.showInfo();
    }
    });

  }

  updateGame(game) {
    this.auth.user$.subscribe(user => {
      console.log(this.router.url);
      if (user.uid === game.keyCreator) {
        this.router.navigate(['games/edit/' + game.key]);
      } else {
        this.showInfo();
      }
    });
  }



  showSuccess() {
    this.toastr.success('Success!', 'Operation accomplished successfully!');
  }

  showInfo() {
    this.toastr.info('You dont have permission!', 'This Game is created by another user!');
  }

  showFailed() {
    this.toastr.info('Deletion Error!', 'an error has been occured!');
  }

}

