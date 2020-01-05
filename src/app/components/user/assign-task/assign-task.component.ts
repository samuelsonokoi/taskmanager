import { Component, OnInit } from "@angular/core";
import { TaskService } from "src/app/services/task.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IUser } from "src/app/models/user.model";
import { ITask } from "src/app/models/task.model";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import * as moment from "moment";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-assign-task",
  templateUrl: "./assign-task.component.html",
  styleUrls: ["./assign-task.component.css"]
})
export class AssignTaskComponent implements OnInit {
  taskForm: FormGroup;
  users: IUser[] = [];
  user: IUser;
  user_tasks: ITask[] = [];
  selected_user: IUser;
  sub: Subscription;
  calendarOptions = {
    isFromNow: true,
    toDate: moment().add(1, "M")
  };
  start_date = null;
  end_date = null;
  calendarEvents = [];
  end_date_in_past: boolean = true;
  start_date_in_past: boolean = true;
  end_date_today: boolean = true;
  start_date_today: boolean = true;

  constructor(
    private _task: TaskService,
    private _auth: AuthService,
    private _spinner: NgxSpinnerService
  ) {}

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

    this.sub = this._task.get_all_users().subscribe((users: IUser[]) => {
      this.users = users;
    });
  }

  ngOnDestroy = (): void => {
    this.sub.unsubscribe();
  };

  onChooseStartDate = (date: string) => {
    if (date !== null) {
      this.start_date = moment(date).format();
      this.taskForm.controls.start_date.setValue(this.start_date);
      this.check_date(this.start_date, "start_date");
    }
  };

  onChooseEndDate = (date: string) => {
    if (date !== null) {
      this.end_date = moment(date).format();
      this.taskForm.controls.end_date.setValue(this.end_date);
      this.check_date(this.end_date, "end_date");
    }
  };

  add_task = () => {
    const { task, description, start_date, end_date } = this.taskForm.value;

    const data = {
      task,
      description,
      start_date,
      end_date,
      assigned_to: this.selected_user.email,
      completed: false,
      status: "assigned",
      assigned_by: this.user.email,
      assigned_to_avatar: this.selected_user.photoURL,
      attachments: [],
      comments: []
    };

    // this._task.add_task(data);
    console.log(data);
    this.taskForm.reset();
  };

  check_date = (date: string, fc: string) => {
    if (moment().isAfter(date)) {
      this.taskForm.get(`${fc}`).setErrors({
        date_in_past: true
      });
      if (fc === "end_date") {
        if (moment(this.end_date).isBefore(this.start_date)) {
          this.taskForm.controls.end_date.setErrors({
            start_date_before_end_date: true
          });
          console.log("start_date_before_end_date");
        }
      }
      // } else if (fc === "end_date" && this.start_date != null) {
      //   if (moment(this.end_date).isBefore(this.start_date)) {
      //     this.taskForm.controls.end_date.setErrors({
      //       start_date_before_end_date: true
      //     });
      //     console.log("start_date_before_end_date");
      //   }
    } else {
      this.taskForm.get(`${fc}`).setErrors({});
    }
  };

  get_user_tasks = async (uid: string) => {
    if (uid !== "") {
      this._spinner.show();

      this._task.get_user(uid).subscribe((user: IUser) => {
        this.selected_user = user;

        this._task.get_user_tasks(user.email).subscribe((tasks: ITask[]) => {
          this.user_tasks = tasks;

          if (tasks.length > 0) {
            tasks.map((t: ITask) => {
              this.calendarEvents.push(moment(t.start_date));
            });
          }
        });

        this._spinner.hide();
      });
    }
  };
}
