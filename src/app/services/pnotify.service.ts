import { Injectable } from "@angular/core";
import PNotify from "pnotify/dist/es/PNotify";
import PNotifyButtons from "pnotify/dist/es/PNotifyButtons";

@Injectable({
  providedIn: "root"
})
export class PnotifyService {
  pnotify = undefined;

  constructor() {
    this.pnotify = this.getPNotify();
  }

  getPNotify = () => {
    PNotifyButtons;
    return PNotify;
  };

  notify = (title: string, text: string, type: string): any => {
    this.pnotify = this.getPNotify();
    this.pnotify.alert({
      title: `${title}`,
      text: `${text}`,
      cornerclass: "ui-pnotify-sharp",
      styling: "bootstrap4",
      icons: "fontawesome4",
      type: `${type}`
    });
  };
}
