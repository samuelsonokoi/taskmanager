import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FirebaseUIModule, firebase, firebaseui } from "firebaseui-angular";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthGuardModule } from "@angular/fire/auth-guard";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxCalendarModule } from "ss-ngx-calendar";
import { NgxPaginationModule } from "ngx-pagination";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { environment } from "src/environments/environment";
import { PnotifyService } from "./services/pnotify.service";
import { UserComponent } from "./components/user/user.component";
import { AuthComponent } from "./components/auth/auth.component";
import { CompletedTasksComponent } from "./components/user/completed-tasks/completed-tasks.component";
import { PendingTasksComponent } from "./components/user/pending-tasks/pending-tasks.component";
import { OverdueTasksComponent } from "./components/user/overdue-tasks/overdue-tasks.component";
import { OverviewComponent } from "./components/user/overview/overview.component";
import { AuthService } from "./services/auth.service";
import { TaskService } from "./services/task.service";
import { AssignTaskComponent } from "./components/user/assign-task/assign-task.component";
import { TaskComponent } from "./components/user/task/task.component";
import { AllUsersComponent } from './components/user/all-users/all-users.component';

// Firebase config
const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: "popup",
  signInOptions: [
    {
      requireDisplayName: true,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    },
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      requireDisplayName: true,
      recaptchaParameters: {
        size: "normal",
        badge: "bottomright",
        type: "image"
      }
    }
  ],
  signInSuccessUrl: "/user",
  tosUrl: "",
  privacyPolicyUrl: "",
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AuthComponent,
    CompletedTasksComponent,
    PendingTasksComponent,
    OverdueTasksComponent,
    OverviewComponent,
    AssignTaskComponent,
    TaskComponent,
    AllUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    NgxCalendarModule,
    NgxPaginationModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig)
  ],
  providers: [Title, PnotifyService, AuthService, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule {}
