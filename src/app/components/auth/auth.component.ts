import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import {
  FirebaseUISignInSuccessWithAuthResult,
  FirebaseUISignInFailure
} from "firebaseui-angular";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  year = new Date().getFullYear();

  constructor(private _auth: AuthService) {}

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    this._auth.saveUser(signInSuccessData.authResult.user);
  }

  errorCallback(errorData: FirebaseUISignInFailure) {
    console.log("An error occurred");
    console.log(errorData);
  }

  ngOnInit() {}
}
