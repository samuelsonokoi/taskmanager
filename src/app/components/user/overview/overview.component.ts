import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { IUser } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";
import { NgxSpinnerService } from "ngx-spinner";
import { INotification } from "src/app/models/notification.model";
import { TaskService } from "src/app/services/task.service";
import { ITask } from "src/app/models/task.model";
import * as moment from "moment";

@Component({
  selector: "app-overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.css"]
})
export class OverviewComponent implements OnInit, OnDestroy {
  sub: Subscription;
  user: IUser;
  notifications: INotification[] = [];
  overdue_tasks: ITask[] = [];

  constructor(
    private _auth: AuthService,
    private _spinner: NgxSpinnerService,
    private _task: TaskService
  ) {}

  ngOnInit() {
    this._spinner.show();
    this.sub = this._auth.user.subscribe((user: IUser) => {
      this.user = user;

      this._task
        .get_user_notifications(user.email)
        .subscribe((not: INotification[]) => (this.notifications = not));

      this._task
        .get_user_overdue_tasks(user.email)
        .subscribe((ot: ITask[]) => (this.overdue_tasks = ot));
    });
    this._spinner.hide();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  date = (date: string) => {
    return moment(date).fromNow();
  };
}
