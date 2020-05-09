import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Comment} from './comment.model';
import {Games} from '../games/games';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private dbPath = '/comments';
  gamesRef: AngularFireList<Comment> = null;

  constructor(private db: AngularFireDatabase) {
    this.gamesRef = db.list(this.dbPath);
  }

  addComment(comment: Comment): void {
    this.gamesRef.push(comment);
  }

  getAllCommentsList(): AngularFireList<Comment> {
    return this.gamesRef;
  }

  getCommentsList(key): AngularFireList<Comment> {
    return this.db.list(this.dbPath, ref => ref.orderByChild('gameKey').equalTo(key));
  }

}
