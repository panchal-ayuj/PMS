import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserManagementComponent } from './user/user.component';
import { UploadComponent } from './uploadgoalplan/uploadgoalplan.component';
import { KeyResultUploadComponent } from './keyresultupload/keyresultupload.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TaskComponent } from './task/task.component';
import { UserUploadComponent } from './user-upload/user-upload.component';
import { TaskUploadComponent } from './task-upload/task-upload.component';
import { ReviewCycleUploadComponent } from './review-cycle-upload/review-cycle-upload.component';
import { GoalplanFormComponent } from './goalplan-form/goalplan-form.component';
import { KeyresultFormComponent } from './keyresult-form/keyresult-form.component';
import { ReviewcycleFormComponent } from './reviewcycle-form/reviewcycle-form.component';
import { MatCardModule } from '@angular/material/card';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ParentUserComponent } from './parent-user/parent-user.component';
import { ParentGoalplanComponent } from './parent-goalplan/parent-goalplan.component';
import { ParentReviewcycleComponent } from './parent-reviewcycle/parent-reviewcycle.component';
import { ParentKeyresultComponent } from './parent-keyresult/parent-keyresult.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HierarchyComponent } from './hierarchy/hierarchy.component';
import { DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { RouterModule } from '@angular/router';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { ExportService } from './export.service';
import { ParentTaskComponent } from './parent-task/parent-task.component';
import { KeyresultPageComponent } from './keyresult-page/keyresult-page.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { DiaglogoverviewComponent } from './diaglogoverview/diaglogoverview.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { BodyComponent } from './body/body.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { EmployeeService } from './employee.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { RatingDialogComponent } from './rating-dialog/rating-dialog.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { IdCardComponent } from './id-card/id-card.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    UserManagementComponent,
    UploadComponent,
    KeyResultUploadComponent,
    SidebarComponent,
    TaskComponent,
    UserUploadComponent,
    TaskUploadComponent,
    ReviewCycleUploadComponent,
    GoalplanFormComponent,
    KeyresultFormComponent,
    ReviewcycleFormComponent,
    AdminPageComponent,
    ParentUserComponent,
    ParentGoalplanComponent,
    ParentReviewcycleComponent,
    ParentKeyresultComponent,
    HierarchyComponent,
    ParentTaskComponent,
    KeyresultPageComponent,
    DiaglogoverviewComponent,
    ProfilePageComponent,
    BodyComponent,
    NavbarComponent,
    TeamPageComponent,
    RatingDialogComponent,
    FeedbackComponent,
    IdCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    DiagramModule,
    AppRoutingModule,
    OrganizationChartModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatSnackBarModule,
    MatGridListModule
    
  ],
  providers: [ExportService, EmployeeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
