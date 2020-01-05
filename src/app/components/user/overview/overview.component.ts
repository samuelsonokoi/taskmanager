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
  users: IUser[] = [];
  all_pending_tasks: ITask[] = [];
  all_completed_tasks: ITask[] = [];
  all_overdue_tasks: ITask[] = [];
  all_tasks: ITask[] = [];

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

      this._task
        .get_all_users()
        .subscribe((users: IUser[]) => (this.users = users));

      this._task
        .get_all_tasks()
        .subscribe((tasks: ITask[]) => (this.all_tasks = tasks));

      this._task
        .get_all_completed_tasks()
        .subscribe((tasks: ITask[]) => (this.all_completed_tasks = tasks));

      this._task
        .get_all_pending_tasks()
        .subscribe((tasks: ITask[]) => (this.all_pending_tasks = tasks));

      this._task
        .get_all_overdue_tasks()
        .subscribe((tasks: ITask[]) => (this.all_overdue_tasks = tasks));
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
