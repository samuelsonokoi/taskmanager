import { Component } from "@angular/core";
import {
  FirebaseUISignInSuccessWithAuthResult,
  FirebaseUISignInFailure
} from "firebaseui-angular";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  year = new Date().getFullYear();

  constructor(private _auth: AuthService) {}

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    this._auth.saveUser(signInSuccessData.authResult.user);
  }

  errorCallback(errorData: FirebaseUISignInFailure) {
    console.log("An error occurred");
    console.log(errorData);
  }
}
