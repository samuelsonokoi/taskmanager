import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { IUser } from "src/app/models/user.model";
import { TaskService } from "src/app/services/task.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-all-users",
  templateUrl: "./all-users.component.html",
  styleUrls: ["./all-users.component.css"]
})
export class AllUsersComponent implements OnInit, OnDestroy {
  sub: Subscription;
  all_users: IUser[] = [];
  p: number = 1;

  constructor(
    private _task: TaskService,
    private _spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this._spinner.show();
    this.sub = this._task.get_all_users().subscribe((users: IUser[]) => {
      this.all_users = users;
      this._spinner.hide();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  mask_email = (email: string) => {
    return "email visible to admin only";
  };
}
