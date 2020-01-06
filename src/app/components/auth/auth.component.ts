import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import {
  FirebaseUISignInSuccessWithAuthResult,
  FirebaseUISignInFailure
} from "firebaseui-angular";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  year = new Date().getFullYear();

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this._afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this._router.navigate(["/user"]);
      } else {
        this._router.navigate([""]);
      }
    });
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    this._auth.saveUser(signInSuccessData.authResult.user);
  }

  errorCallback(errorData: FirebaseUISignInFailure) {
    console.log("An error occurred");
    console.log(errorData);
  }
}
