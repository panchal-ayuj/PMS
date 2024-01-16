import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ParentUserComponent } from './parent-user/parent-user.component';
import { ParentGoalplanComponent } from './parent-goalplan/parent-goalplan.component';
import { ParentKeyresultComponent } from './parent-keyresult/parent-keyresult.component';
import { ParentReviewcycleComponent } from './parent-reviewcycle/parent-reviewcycle.component';
import { AdminGuard } from './admin.guard'; // Import the AdminGuard
import { UserGuard } from './user.guard'; // Import the AdminGuard
import { ParentTaskComponent } from './parent-task/parent-task.component';
import { KeyresultPageComponent } from './keyresult-page/keyresult-page.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'logout', component: LogoutComponent,canActivate: [UserGuard] },
  { path: 'keyresult', component: KeyresultPageComponent,canActivate: [UserGuard] },
  { path: 'admin', component: AdminPageComponent,canActivate: [AdminGuard]},
  { path: 'admin/user', component: ParentUserComponent,canActivate: [AdminGuard]},
  { path: 'admin/goalplan', component: ParentGoalplanComponent,canActivate: [AdminGuard]},
  { path: 'admin/keyresult', component: ParentKeyresultComponent,canActivate: [AdminGuard]},
  { path: 'admin/reviewcycle', component: ParentReviewcycleComponent,canActivate: [AdminGuard]},
  { path: 'admin/task', component:ParentTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
