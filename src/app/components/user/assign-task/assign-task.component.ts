import { Component, OnInit } from "@angular/core";
import { TaskService } from "src/app/services/task.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IUser } from "src/app/models/user.model";
import { ITask } from "src/app/models/task.model";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-assign-task",
  templateUrl: "./assign-task.component.html",
  styleUrls: ["./assign-task.component.css"]
})
export class AssignTaskComponent implements OnInit {
  taskForm: FormGroup;
  users: IUser[] = [];
  user: IUser;
  sub: Subscription;

  constructor(private _task: TaskService, private _auth: AuthService) {}

  ngOnInit() {
    this.taskForm = new FormGroup({
      task: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      start_date: new FormControl("", [Validators.required]),
      end_date: new FormControl("", [Validators.required]),
      assigned_to: new FormControl("", [Validators.required])
    });

    this.sub = this._auth.user.subscribe((user: IUser) => {
      this.user = user;
    });
  }

  add_task = (user: IUser) => {
    const {
      task,
      description,
      start_date,
      end_date,
      assigned_to
    } = this.taskForm.value;

    const data: ITask = {
      task,
      description,
      start_date,
      end_date,
      assigned_to,
      completed: false,
      status: "asigned",
      assigned_by: this.user.email,
      assigned_to_avatar: user.photoURL
    };
  };
}
