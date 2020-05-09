import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import {GamesService} from '../games.service';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UploadService} from '../../services/upload.service';
import {Games} from '../games';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommentsService} from '../../services/comments.service';
import {DatePipe} from '@angular/common';
import {pipe} from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  uid: string;
  displayName: string;
  key: any;
  game: Games;
  fileUploads: any[];
  gameImage: string;
  ratingStars = '';
  formGroup: FormGroup;
  comments: any;
  pipe = new DatePipe('fr-FR'); // Use your own locale

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, public gamesService: GamesService,
              public auth: AuthService, private router: Router, private uploadService: UploadService,
              private commentService: CommentsService ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe( res => {
      this.uid = res.uid;
      this.displayName = res.displayName;
    });
    this.key = this.route.snapshot.paramMap.get('key');
    this.createForm();
    this.getImage();
    this.getGame();
    this.getComments();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      comment: [null, Validators.required],
      keyCreator: [null],
    });
  }

  getImage() {

    this.uploadService.getFileUploads(6).snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    })).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });

  }

  getGame() {
    this.gamesService.getGamesById(this.key).subscribe(game => {
      this.game = game;
      this.gameImage = this.game.imageUrl;
      for (let i = 0 ; i < this.game.ratingGame; i++) {
      this.ratingStars = this.ratingStars + ' ★';
      }
      this.gamesService.loading = false;
    });
  }

  getComments() {
    this.commentService.getCommentsList(this.key).valueChanges().subscribe(res => {
      this.comments = res;
    });
  }

  onSubmitComment(data) {
    data.keyCreator = this.uid;
    data.displayName = this.displayName;
    const now = Date.now();
    const myFormattedDate = this.pipe.transform(now, 'short');
    data.date = myFormattedDate.toString();
    data.gameKey = this.key;
    this.commentService.addComment(data);
    this.formGroup.reset();
  }

}
