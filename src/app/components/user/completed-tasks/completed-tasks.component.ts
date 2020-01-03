import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IUser } from "src/app/models/user.model";
import { ITask } from "src/app/models/task.model";
import { AuthService } from "src/app/services/auth.service";
import { NgxSpinnerService } from "ngx-spinner";
import { TaskService } from "src/app/services/task.service";
import * as moment from "moment";

@Component({
  selector: "app-completed-tasks",
  templateUrl: "./completed-tasks.component.html",
  styleUrls: ["./completed-tasks.component.css"]
})
export class CompletedTasksComponent implements OnInit {
  sub: Subscription;
  user: IUser;
  completed_tasks: ITask[] = [];

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
        .get_user_completed_tasks(user.email)
        .subscribe((ct: ITask[]) => (this.completed_tasks = ct));
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
