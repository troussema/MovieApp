import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GamesService} from '../games.service';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {Games} from '../games';
import {ToastrService} from 'ngx-toastr';
import {UploadService} from '../../services/upload.service';
import {Fileupload} from '../../services/fileupload';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  formGroup: FormGroup;
  uid: string;
  key: any;
  game: Games;
  fileUploads: any[];
  gameImage: string;
  selectedFiles: FileList;
  currentFileUpload: Fileupload;
  progress: { percentage: number } = { percentage: 0 };
  // tslint:disable-next-line:max-line-length
  url = 'https://firebasestorage.googleapis.com/v0/b/movieapp-a6564.appspot.com/o/uploads%2Funkown.png?alt=media&token=ac7fe43f-aaca-4a85-9dd3-299cbf217fcd';



  constructor(private formBuilder: FormBuilder, public gamesService: GamesService, public auth: AuthService, private router: Router,
              private route: ActivatedRoute,  private toastr: ToastrService, private uploadService: UploadService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe( res => this.uid = res.uid);
    this.createForm();
    this.key = this.route.snapshot.paramMap.get('key');
    this.getImage();
    this.getGame();
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
        this.url = this.game.imageUrl;
        this.gameImage = this.game.imageUrl;
        this.formGroup.setValue({
          titleGame: this.game.titleGame,
          descriptionGame: this.game.descriptionGame,
          ratingGame:  this.game.ratingGame.toString(),
          keyCreator: this.game.keyCreator,
        });
        this.gamesService.loading = false;
      });
    }

  createForm() {
    this.formGroup = this.formBuilder.group({
      titleGame: [null, Validators.required],
      descriptionGame: [null, Validators.required],
      ratingGame: [null, Validators.required],
      keyCreator: [null],

    });
  }

  selectFile(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new Fileupload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress).then( res => {
      console.log(res);
      this.url = res.toString();
    });

  }


  onSubmit(data) {
   if (this.uid === data.keyCreator) {
      data.imageUrl = this.url;
      this.gamesService.updateGame(this.key, data);
      this.router.navigate(['/games']);
    } else {
      this.showFailed();
    }
  }

  showFailed() {
    this.toastr.error('ERROR!', 'You are not authorised to edit this content!');
  }

}
