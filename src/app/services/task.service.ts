import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class TaskService {
  constructor(
    private _afs: AngularFirestore,
    private _spinner: NgxSpinnerService,
    private _router: Router,
    private _afstorage: AngularFireStorage
  ) {}

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
}
