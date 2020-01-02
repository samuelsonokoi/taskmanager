import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { IUser } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.css"]
})
export class OverviewComponent implements OnInit, OnDestroy {
  sub: Subscription;
  user: IUser;

  constructor(
    private _auth: AuthService,
    private _spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.sub = this._auth.user.subscribe((user: IUser) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
