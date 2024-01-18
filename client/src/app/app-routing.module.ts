import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ParentUserComponent } from './parent-user/parent-user.component';
import { ParentGoalplanComponent } from './parent-goalplan/parent-goalplan.component';
import { ParentKeyresultComponent } from './parent-keyresult/parent-keyresult.component';
import { ParentReviewcycleComponent } from './parent-reviewcycle/parent-reviewcycle.component';
import { AppComponent } from './app.component';
import { HierarchyComponent } from './hierarchy/hierarchy.component';
import { UserManagementComponent } from './user/user.component';
import { TaskComponent } from './task/task.component';
import { ReviewcycleFormComponent } from './reviewcycle-form/reviewcycle-form.component';
import { KeyresultFormComponent } from './keyresult-form/keyresult-form.component';
import { GoalplanFormComponent } from './goalplan-form/goalplan-form.component';
import { AdminGuard } from './admin.guard'; // Import the AdminGuard
import { UserGuard } from './user.guard'; // Import the AdminGuard
import { ParentTaskComponent } from './parent-task/parent-task.component';
import { KeyresultPageComponent } from './keyresult-page/keyresult-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TeamPageComponent } from './team-page/team-page.component';

const routes: Routes = [
  { path: 'hierarchy', component: HierarchyComponent},
  { path: '', component: LoginComponent },
  { path: 'logout', component: LogoutComponent,canActivate: [UserGuard] },
  { path: 'navbar', component: NavbarComponent,canActivate: [UserGuard] },
  { path: 'keyresult', component: KeyresultPageComponent,canActivate: [UserGuard] },
  { path: 'profile',component:ProfilePageComponent,canActivate: [UserGuard] },
  { path: 'admin', component: AdminPageComponent,canActivate: [AdminGuard]},
  { path: 'admin/user', component: ParentUserComponent,canActivate: [AdminGuard]},
  { path: 'admin/goalplan', component: ParentGoalplanComponent,canActivate: [AdminGuard]},
  { path: 'admin/keyresult', component: ParentKeyresultComponent,canActivate: [AdminGuard]},
  { path: 'admin/reviewcycle', component: ParentReviewcycleComponent,canActivate: [AdminGuard]},
  { path: 'admin/task', component:ParentTaskComponent},
  { path: 'team', component: TeamPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
