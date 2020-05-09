import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Games} from '../games';
import {GamesService} from '../games.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {UploadService} from '../../services/upload.service';
import {Fileupload} from '../../services/fileupload';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  formGroup: FormGroup;
  uid: string;
  selectedFiles: FileList;
  currentFileUpload: Fileupload;
  progress: { percentage: number } = { percentage: 0 };
  // tslint:disable-next-line:max-line-length
  url = 'https://firebasestorage.googleapis.com/v0/b/movieapp-a6564.appspot.com/o/uploads%2Funkown.png?alt=media&token=ac7fe43f-aaca-4a85-9dd3-299cbf217fcd';

  constructor(private formBuilder: FormBuilder, public gamesService: GamesService, public auth: AuthService, private router: Router,
              private uploadService: UploadService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe( res => this.uid = res.uid);
    this.createForm();
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
    console.log(data);
    console.log(this.url);
    data.keyCreator = this.uid;
    data.imageUrl = this.url;
    this.gamesService.createGame(data);
    this.router.navigate(['/games']);
  }

}
