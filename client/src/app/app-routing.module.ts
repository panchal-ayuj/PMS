import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ParentUserComponent } from './parent-user/parent-user.component';
import { ParentGoalplanComponent } from './parent-goalplan/parent-goalplan.component';
import { ParentKeyresultComponent } from './parent-keyresult/parent-keyresult.component';
import { ParentReviewcycleComponent } from './parent-reviewcycle/parent-reviewcycle.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'admin', component: AdminPageComponent},
  { path: 'user', component: ParentUserComponent},
  { path: 'goalplan', component: ParentGoalplanComponent},
  { path: 'keyresult', component: ParentKeyresultComponent},
  { path: 'reviewcycle', component: ParentReviewcycleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
