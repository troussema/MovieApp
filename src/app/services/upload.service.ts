import { Injectable } from '@angular/core';
import { Fileupload} from './fileupload';
import * as firebase from 'firebase';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import Value = firebase.remoteConfig.Value;

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private basePath = '/uploads';

  constructor(private db: AngularFireDatabase) { }


  pushFileToStorage(fileUpload: Fileupload, progress: { percentage: number }) {
    const promise = new Promise ((res, rej) => {
      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);
      // tslint:disable-next-line:max-line-length
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          // in progress
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
          progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        },
        (error) => {
          console.log(error);
          rej(error);
        },
        () => {
          // success
          uploadTask.snapshot.ref.getDownloadURL().then(img => {
              fileUpload.url = img;
              res(img);
            }
          );
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
    });
    return promise;
  }

  private saveFileData(fileUpload: Fileupload) {
    this.db.list(`${this.basePath}/`).push(fileUpload);
  }

  getFileUploads(numberItems): AngularFireList<Fileupload> {
    return this.db.list(this.basePath);
  }

  deleteFileUpload(fileUpload: Fileupload) {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }

}
