import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ITask } from "src/app/models/task.model";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "src/app/services/auth.service";
import { TaskService } from "src/app/services/task.service";
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"]
})
export class TaskComponent implements OnInit {
  sub: Subscription;
  task: ITask;
  id: string;

  constructor(
    private _spinner: NgxSpinnerService,
    private _auth: AuthService,
    private _task: TaskService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._spinner.show();
    this.id = this._route.snapshot.paramMap.get("id");

    this._task.get_task(this.id).subscribe((task: ITask) => {
      this.task = task;
    });
    this._spinner.hide();
  }

  date = (date: string) => {
    return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
  };

  mark_complete = (id: string) => {
    let c = confirm("Are sure you want to mark this task as complete?");
    if (c) {
      this._task.mark_task_as_complete(id);
    }
  };
}
