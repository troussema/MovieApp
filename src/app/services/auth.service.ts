import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import {Observable, of } from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user$: Observable<User>;
  logged = false;
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          this.logged = true;
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user).then( res => this.router.navigate(['/games']));
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true });

  }

  async signOut() {
    this.logged = false;
    await this.afAuth.signOut().then( res => {
      this.router.navigate(['/']).then(() => {
       // window.location.reload();
      });
    });
  }

}
