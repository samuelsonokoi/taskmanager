import { Component, OnInit, OnDestroy } from "@angular/core";
import { ITask } from "src/app/models/task.model";
import { Subscription } from "rxjs";
import { TaskService } from "src/app/services/task.service";
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from "moment";

@Component({
  selector: "app-all-tasks",
  templateUrl: "./all-tasks.component.html",
  styleUrls: ["./all-tasks.component.css"]
})
export class AllTasksComponent implements OnInit, OnDestroy {
  sub: Subscription;
  tasks: ITask[] = [];
  p: number = 1;

  constructor(
    private _task: TaskService,
    private _spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this._spinner.show();

    this.sub = this._task.get_all_tasks().subscribe((tasks: ITask[]) => {
      this.tasks = tasks;

      this._spinner.hide();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  date = (date: string) => {
    return moment(date).fromNow();
  };

  mask_email = (email: string) => {
    return "***@***.com";
  };

  check_overdue = date => {
    if (moment().isAfter(date)) {
      return true;
    } else {
      return false;
    }
  };
}
