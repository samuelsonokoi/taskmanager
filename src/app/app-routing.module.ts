import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from "./components/user/user.component";
import { AuthComponent } from "./components/auth/auth.component";
import { CompletedTasksComponent } from "./components/user/completed-tasks/completed-tasks.component";
import { PendingTasksComponent } from "./components/user/pending-tasks/pending-tasks.component";
import { OverdueTasksComponent } from "./components/user/overdue-tasks/overdue-tasks.component";
import { OverviewComponent } from "./components/user/overview/overview.component";
import { AssignTaskComponent } from "./components/user/assign-task/assign-task.component";
import { TaskComponent } from "./components/user/task/task.component";

const routes: Routes = [
  { path: "", component: AuthComponent, pathMatch: "full" },
  {
    path: "user",
    component: UserComponent,
    children: [
      { path: "", component: OverviewComponent, pathMatch: "full" },
      { path: "assign-task", component: AssignTaskComponent },
      { path: "task/:id", component: TaskComponent },
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
