import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IUser } from "src/app/models/user.model";
import { ITask } from "src/app/models/task.model";
import { AuthService } from "src/app/services/auth.service";
import { NgxSpinnerService } from "ngx-spinner";
import { TaskService } from "src/app/services/task.service";
import * as moment from "moment";

@Component({
  selector: "app-pending-tasks",
  templateUrl: "./pending-tasks.component.html",
  styleUrls: ["./pending-tasks.component.css"]
})
export class PendingTasksComponent implements OnInit {
  sub: Subscription;
  user: IUser;
  pending_tasks: ITask[] = [];
  p: number = 1;

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
        .get_user_pending_tasks(user.email)
        .subscribe((pt: ITask[]) => (this.pending_tasks = pt));
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
