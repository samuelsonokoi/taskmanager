import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import PNotify from "pnotify/dist/es/PNotify";
import PNotifyButtons from "pnotify/dist/es/PNotifyButtons";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { first } from "rxjs/operators";
import { IUser } from "../models/user.model";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  pnotify = undefined;
  user;
  currentUser: firebase.User;
  signedIn = false;
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(
    private _afAuth: AngularFireAuth,
    private _afs: AngularFirestore,
    private _router: Router,
    private _spinner: NgxSpinnerService
  ) {
    // Pnotify
    this.pnotify = this.getPNotify();

    this.user = new Observable(obs => {
      this._afAuth.auth.onAuthStateChanged(user => {
        if (user) {
          this.signedIn = true;
          this.currentUser = user;
          this._afs
            .doc(`users/${user.uid}`)
            .valueChanges()
            .subscribe(usr => {
              obs.next(usr);
            });
          // Save user
          this.saveUser(user);
        } else {
          this.signedIn = false;
          this.currentUser = null;
        }
      });
    });
  }

  // Check if the document exist in firestore
  docExists(path: string) {
    return this._afs
      .doc(path)
      .valueChanges()
      .pipe(first())
      .toPromise();
  }

  // Returns true if user is logged in
  authenticated = (): boolean => {
    let authenticated: boolean;
    // setInterval(() => {
    this._afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        authenticated = true;
      } else {
        authenticated = false;
      }
    });
    return authenticated;
    // }, 3000);
    // if (this._afAuth.auth.currentUser) {
    //   return true;
    // } else {
    //   return false;
    // }
  };

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      var user = this._afAuth.auth.onAuthStateChanged(function(user) {
        if (user) {
          resolve(user);
        } else {
          reject("No user logged in");
        }
      });
    });
  }

  // Pnotify
  getPNotify() {
    PNotifyButtons; // Initiate the module. Important!
    return PNotify;
  }

  signOut() {
    this._afAuth.auth.signOut().then(() => {
      this.user = null;
      this.currentUser = null;
      this._router.navigate(["/"]);
    });
  }

  // if error, console log and notify user
  private handleError(error) {
    this.pnotify.error({
      text: `${error.message}`,
      cornerclass: "ui-pnotify-sharp",
      styling: "bootstrap3",
      icons: "fontawesome4"
    });
  }

  // Check if the document exist if not then create it
  async saveUser(user) {
    this._spinner.show();
    const doc = await this.docExists(`users/${user.uid}`);

    if (doc) {
      console.log("---- user found");
    } else {
      console.log("---- user not found");
      this.saveUserData(user);
    }
    this._spinner.hide();
  }

  // Sets intial user data to firestore after successful sign up
  private saveUserData(user: firebase.User) {
    this._spinner.show();
    // Sets user data to firestore on login or signup
    const userRef: AngularFirestoreDocument<any> = this._afs.doc(
      `users/${user.uid}`
    );

    const data: IUser = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL
        ? user.photoURL
        : "https://firebasestorage.googleapis.com/v0/b/taskmanager-f2d3b.appspot.com/o/default_image.png?alt=media&token=ad88e388-b832-42ff-8160-9d3f3bc8f858",
      displayName: user.displayName,
      admin: false
    };

    userRef
      .set(data, { merge: true })
      .then(_ => {
        this._router.navigate(["/user"]);
      })
      .catch(e => {
        this.handleError(e);
      });

    this._spinner.hide();
  }
}
