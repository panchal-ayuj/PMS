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
import { ReviewCycleUploadComponent } from './review-cycle-upload/review-cycle-upload.component';
import { GoalplanFormComponent } from './goalplan-form/goalplan-form.component';
import { KeyresultFormComponent } from './keyresult-form/keyresult-form.component';
import { ReviewcycleFormComponent } from './reviewcycle-form/reviewcycle-form.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    UserManagementComponent,
    UploadComponent,
    KeyResultUploadComponent,
    ReviewCycleUploadComponent,
    GoalplanFormComponent,
    KeyresultFormComponent,
    ReviewcycleFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
