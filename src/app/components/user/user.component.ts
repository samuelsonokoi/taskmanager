import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { IUser } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";
import { NgxSpinnerService } from "ngx-spinner";
import { TaskService } from "src/app/services/task.service";
import { ITask } from "src/app/models/task.model";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit, OnDestroy {
  sub: Subscription;
  user: IUser;
  completed_tasks: ITask[] = [];
  pending_tasks: ITask[] = [];
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
        .get_user_completed_tasks(user.email)
        .subscribe((ct: ITask[]) => {
          this.completed_tasks = ct;
        });

      this._task.get_user_pending_tasks(user.email).subscribe((pt: ITask[]) => {
        this.pending_tasks = pt;
      });

      this._task.get_user_overdue_tasks(user.email).subscribe((ot: ITask[]) => {
        this.overdue_tasks = ot;
      });

      this._spinner.hide();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  sign_out = () => {
    this._auth.signOut();
  };
}
