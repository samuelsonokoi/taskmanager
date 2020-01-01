import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from "./components/user/user.component";
import { AuthComponent } from "./components/auth/auth.component";
import { CompletedTasksComponent } from "./components/user/completed-tasks/completed-tasks.component";
import { PendingTasksComponent } from "./components/user/pending-tasks/pending-tasks.component";
import { OverdueTasksComponent } from "./components/user/overdue-tasks/overdue-tasks.component";

const routes: Routes = [
  { path: "", component: AuthComponent },
  {
    path: "user",
    component: UserComponent,
    children: [
      { path: "completed-tasks", component: CompletedTasksComponent },
      { path: "pending-tasks", component: PendingTasksComponent },
      { path: "overdue-tasks", component: OverdueTasksComponent }
    ]
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
