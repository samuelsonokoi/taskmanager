import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ITask } from "src/app/models/task.model";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "src/app/services/auth.service";
import { TaskService } from "src/app/services/task.service";
import { ActivatedRoute } from "@angular/router";

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
    this.id = this._route.snapshot.paramMap.get("id");
    console.log(this.id);
  }
}
