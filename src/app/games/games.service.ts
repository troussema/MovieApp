import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Games} from './games';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  loading = true;

  private dbPath = '/games';
  gamesRef: AngularFireList<Games> = null;
  constructor(private db: AngularFireDatabase) {
    this.gamesRef = db.list(this.dbPath);
  }

  createGame(game: Games): void {
    this.gamesRef.push(game);
  }

  updateGame(key: string, value: any): Promise<void> {
    return this.gamesRef.update(key, value);
  }

  deleteGame(key: string): Promise<void> {
    return this.gamesRef.remove(key);
  }

  getGamesList(): AngularFireList<Games> {
    return this.gamesRef;
  }


  getGamesById(key) {

    return this.db
      .object('games/' + key)
      .snapshotChanges()
      .pipe(map(res => res.payload.val()));

  }

}
