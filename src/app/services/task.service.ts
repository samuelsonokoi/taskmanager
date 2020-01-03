import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { ITask } from "../models/task.model";
import { PnotifyService } from "./pnotify.service";
import { IUser } from "../models/user.model";
import { INotification } from "../models/notification.model";
import * as moment from "moment";

@Injectable({
  providedIn: "root"
})
export class TaskService {
  constructor(
    private _afs: AngularFirestore,
    private _notify: PnotifyService,
    private _spinner: NgxSpinnerService,
    private _router: Router,
    private _afstorage: AngularFireStorage
  ) {}

  // ========== user management
  get_all_users = () => {
    return this._afs
      .collection<IUser>("users", ref => ref.orderBy("displayName", "asc"))
      .valueChanges();
  };

  get_user = (uid: string) => {
    return this._afs.doc<IUser>(`users/${uid}`).valueChanges();
  };
  // ========== end user management

  // ========== task management
  add_task = (task: ITask) => {
    this._spinner.show();
    const id = this._afs.createId();
    task.uid = id;
    this._afs
      .collection<ITask>("tasks")
      .doc(id)
      .set(task)
      .then(_ => {
        this._notify.notify(
          "Success",
          `task has been successfully assigned to ${task.assigned_to}`,
          "success"
        );

        this._router.navigate([`/user/task/${id}`]);
      })
      .catch(e => {
        this.handleError(e);
      });

    const notification: INotification = {
      title: "New Task",
      message: `"${task.task}" - has been assigned to you from ${task.assigned_by}`,
      user: task.assigned_to,
      link: task.uid,
      date: Date.now()
    };

    this.add_notification(notification);

    this._spinner.hide();
  };

  get_task = (uid: string) => {
    return this._afs.doc<ITask>(`tasks/${uid}`).valueChanges();
  };

  get_user_tasks = (email: string) => {
    return this._afs
      .collection<ITask>("tasks", ref =>
        ref.where("assigned_to", "==", email).orderBy("start_date", "desc")
      )
      .valueChanges();
  };

  get_user_completed_tasks = (email: string) => {
    return this._afs
      .collection<ITask>("tasks", ref =>
        ref
          .where("assigned_to", "==", email)
          .where("completed", "==", true)
          .orderBy("start_date", "desc")
      )
      .valueChanges();
  };

  get_user_pending_tasks = (email: string) => {
    return this._afs
      .collection<ITask>("tasks", ref =>
        ref
          .where("assigned_to", "==", email)
          .where("end_date", ">", moment(Date.now()).format())
          .where("completed", "==", false)
          .orderBy("end_date", "desc")
      )
      .valueChanges();
  };

  get_user_overdue_tasks = (email: string) => {
    return this._afs
      .collection<ITask>("tasks", ref =>
        ref
          .where("assigned_to", "==", email)
          .where("end_date", "<", moment(Date.now()).format())
          .where("completed", "==", false)
          .orderBy("end_date", "desc")
      )
      .valueChanges();
  };

  mark_task_as_complete = (uid: string) => {
    this._spinner.show();
    this._afs
      .collection<ITask>("tasks")
      .doc(uid)
      .get()
      .subscribe(doc => {
        doc.ref.set({ completed: true }, { merge: true }).then(_ => {
          this._notify.notify(
            "Success",
            "You have completed this task",
            "success"
          );

          const notification: INotification = {
            title: "Task completed",
            message: `${doc.data().assigned_to} completed a task`,
            user: `${doc.data().assigned_by}`,
            link: `${doc.data().uid}`,
            date: Date.now()
          };

          const notification1: INotification = {
            title: "Task completed",
            message: `You completed a task`,
            user: `${doc.data().assigned_to}`,
            link: `${doc.data().uid}`,
            date: Date.now()
          };

          this.add_notification(notification);
          this.add_notification(notification1);

          this._spinner.hide();
        });
      });
  };
  // =========== end task management

  // =========== notification management
  add_notification = (data: INotification) => {
    this._afs
      .collection<INotification>("notifications")
      .add(data)
      .then(_ => {
        this._notify.notify(
          "Success!",
          `user has been notified of this action.`,
          "success"
        );
      });
  };

  get_user_notifications = (email: string) => {
    return this._afs
      .collection<INotification>("notifications", ref =>
        ref.where("user", "==", email).orderBy("date", "desc")
      )
      .valueChanges();
  };
  // =========== end notification management

  // if error, console log and notify user
  private handleError(error) {
    this._notify.notify("Error!", `${error.message}`, "error");
  }
}
