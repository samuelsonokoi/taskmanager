import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IUser } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  sub: Subscription;
  user: IUser;

  constructor(
    private _auth: AuthService,
    private _spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this._spinner.show();
    this.sub = this._auth.user.subscribe((user: IUser) => {
      this.user = user;
      this._spinner.hide();
    });
  }
}
