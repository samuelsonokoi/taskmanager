import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo
} from "@angular/fire/auth-guard";

import { UserComponent } from "./components/user/user.component";
import { AuthComponent } from "./components/auth/auth.component";
import { CompletedTasksComponent } from "./components/user/completed-tasks/completed-tasks.component";
import { PendingTasksComponent } from "./components/user/pending-tasks/pending-tasks.component";
import { OverdueTasksComponent } from "./components/user/overdue-tasks/overdue-tasks.component";
import { OverviewComponent } from "./components/user/overview/overview.component";
import { AssignTaskComponent } from "./components/user/assign-task/assign-task.component";
import { TaskComponent } from "./components/user/task/task.component";
import { AllUsersComponent } from "./components/user/all-users/all-users.component";
import { AllTasksComponent } from "./components/user/all-tasks/all-tasks.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["/"]);
const redirectLoggedInToUser = () => redirectLoggedInTo(["/user"]);

const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    pathMatch: "full",
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToUser }
  },
  {
    path: "user",
    component: UserComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin
    },
    children: [
      { path: "", component: OverviewComponent, pathMatch: "full" },
      { path: "assign-task", component: AssignTaskComponent },
      { path: "task/:id", component: TaskComponent },
      { path: "completed-tasks", component: CompletedTasksComponent },
      { path: "pending-tasks", component: PendingTasksComponent },
      { path: "overdue-tasks", component: OverdueTasksComponent },
      { path: "all-users", component: AllUsersComponent },
      { path: "all-tasks", component: AllTasksComponent }
    ]
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
