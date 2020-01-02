import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { ITask } from "../models/task.model";
import { PnotifyService } from "./pnotify.service";

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
      .collection("users", ref => ref.orderBy("displayName", "asc"))
      .valueChanges();
  };
  // ========== end user management

  // ========== task management
  add_task = (task: ITask) => {
    const id = this._afs.createId();
    task.uid = id;
    this._afs
      .collection("tasks")
      .doc(id)
      .set(task)
      .then(_ => {
        this._notify.notify(
          "Success",
          `task has been successfully assigned to ${task.assigned_to}`,
          "success"
        );
      })
      .catch(e => {
        this.handleError(e);
      });
  };

  get_task = (uid: string) => {
    return this._afs.doc(`tasks/${uid}`).valueChanges();
  };

  get_user_tasks = (email: string) => {
    return this._afs
      .collection("tasks", ref =>
        ref.where("assigned_to", "==", email).orderBy("start_date", "desc")
      )
      .valueChanges();
  };

  get_user_completed_tasks = (email: string) => {
    return this._afs
      .collection("tasks", ref =>
        ref
          .where("assigned_to", "==", email)
          .where("completed", "==", true)
          .orderBy("start_date", "desc")
      )
      .valueChanges();
  };

  get_user_pending_tasks = (email: string) => {
    return this._afs
      .collection("tasks", ref =>
        ref
          .where("assigned_to", "==", email)
          // .where("start_date", ">=", Date.now())
          .where("end_date", "<", Date.now())
          .where("completed", "==", false)
          .orderBy("end_date", "desc")
      )
      .valueChanges();
  };

  get_user_overdue_tasks = (email: string) => {
    return this._afs
      .collection("tasks", ref =>
        ref
          .where("assigned_to", "==", email)
          .where("end_date", "<", Date.now())
          .where("completed", "==", false)
          .orderBy("end_date", "desc")
      )
      .valueChanges();
  };
  // =========== end task management

  // if error, console log and notify user
  private handleError(error) {
    this._notify.notify("Error!", `${error.message}`, "error");
  }
}
