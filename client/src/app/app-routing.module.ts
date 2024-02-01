import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ParentUserComponent } from './parent-user/parent-user.component';
import { ParentKeyresultComponent } from './parent-keyresult/parent-keyresult.component';
import { ParentReviewcycleComponent } from './parent-reviewcycle/parent-reviewcycle.component';
import { AppComponent } from './app.component';
import { HierarchyComponent } from './hierarchy/hierarchy.component';
import { UserManagementComponent } from './user/user.component';
import { TaskComponent } from './task/task.component';
import { ReviewcycleFormComponent } from './reviewcycle-form/reviewcycle-form.component';
import { KeyresultFormComponent } from './keyresult-form/keyresult-form.component';
import { AdminGuard } from './admin.guard'; // Import the AdminGuard
import { UserGuard } from './user.guard'; // Import the AdminGuard
import { ParentTaskComponent } from './parent-task/parent-task.component';
import { KeyresultPageComponent } from './keyresult-page/keyresult-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ParentViewFeedbackComponent } from './parent-view-feedback/parent-view-feedback.component';
import { FeedbackArchivePageComponent } from './feedback-archive-page/feedback-archive-page.component';

const routes: Routes = [
  { path: 'hierarchy', component: HierarchyComponent},
  { path: '', component: LoginComponent },
  { path: 'logout', component: LogoutComponent,canActivate: [UserGuard] },
  { path: 'navbar', component: NavbarComponent,canActivate: [UserGuard] },
  { path: 'keyresult', component: KeyresultPageComponent,canActivate: [UserGuard] },
  { path: 'profile',component:ProfilePageComponent,canActivate: [UserGuard] },
  { path: 'team', component: TeamPageComponent,canActivate: [UserGuard] },
  { path: 'profile',component:ProfilePageComponent,canActivate: [UserGuard] },
  { path: 'feedback',component:FeedbackComponent,canActivate: [UserGuard]},
  { path: 'admin', component: AdminPageComponent,canActivate: [UserGuard,AdminGuard]},
  { path: 'admin/user', component: ParentUserComponent,canActivate: [UserGuard,AdminGuard]},
  { path: 'admin/keyresult', component: ParentKeyresultComponent,canActivate: [UserGuard,AdminGuard]},
  { path: 'admin/reviewcycle', component: ParentReviewcycleComponent,canActivate: [UserGuard,AdminGuard]},
  { path: 'admin/feedback', component: ParentViewFeedbackComponent,canActivate: [UserGuard,AdminGuard]},
  { path: 'admin/task', component:ParentTaskComponent,canActivate: [UserGuard,AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}