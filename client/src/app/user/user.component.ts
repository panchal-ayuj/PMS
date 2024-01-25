// user-management.component.ts

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ExportService } from '../export.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserManagementComponent implements OnInit {
  @ViewChild('firstNameField') firstNameField!: ElementRef;
  @ViewChild('lastNameField') lastNameField!: ElementRef;
  @ViewChild('emailField') emailField!: ElementRef;
  @ViewChild('statusField') statusField!: ElementRef;
  @ViewChild('joiningDateField') joiningDateField!: ElementRef;
  @ViewChild('hrIdField') hrIdField!: ElementRef;
  @ViewChild('bandField') bandField!: ElementRef;
  @ViewChild('reportingManagerIdField') reportingManagerIdField!: ElementRef;
  @ViewChild('rolesField') rolesField!: ElementRef;
  @ViewChild('teamsField') teamsField!: ElementRef;
  userForm!: FormGroup;
  users: any[] = [];
  userId: number | undefined;

  searchUserId: number | undefined;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,private exportService: ExportService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initForm();
    this.loadUsers(); // Assuming you want to load existing users on component initialization
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['' , Validators.required],
      lastName: ['' , Validators.required],
      email: ['', [Validators.required , Validators.email]],
      status: ['', Validators.required],
      joiningDate: ['', Validators.required],
      hrId: ['', Validators.required],
      band: ['', Validators.required],
      reportingManagerId: ['', Validators.required],
      roles: ['', Validators.required],
      teams: ['', Validators.required]
    });
  }

  // registerUser() {
  //   const user = this.userForm.value;
  //   user.roles = user.roles.split(',').map((role: string) => role.trim());
  //   user.teams = user.teams.split(',').map((team: string) => team.trim());

  //   const apiUrl = 'http://localhost:8080/api/users/register';

  //   this.http.post(apiUrl, user).subscribe(
  //     (response) => {
  //       console.log('User registered successfully:', response);
  //       this.loadUsers(); // Refresh user list after registration
  //     },
  //     (error) => {
  //       console.error('Error registering user:', error);
  //     }
  //   );
  // }

  registerOrUpdateUser() {
    const user = this.userForm.value;
    console.log(typeof user.roles);
    console.log(user.roles);
    if (typeof user.roles === 'string'){
      user.roles = user.roles.split(',').map((role: string) => role.trim());
    }
    if (typeof user.teams === 'string'){
      user.teams = user.teams.split(',').map((team: string) => team.trim());
    }
  
    const apiUrl = 'http://localhost:8080/api/users/';

    // Check if ID is present for update
    if (this.searchUserId) {
      this.http.put(`${apiUrl}userById/${this.searchUserId}`, user).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          this.showSuccessSnackBar('User updated successfully');
          this.loadUsers();
          this.resetForm();
        },
        (error) => {
          console.error('Error updating User:', error);
        }
      );
    } else {
      this.http.post('http://localhost:8080/api/users/register', user).subscribe(
        (response) => {
          console.log('User registered successfully:', response);
          this.showSuccessSnackBar('User registered successfully');
          this.loadUsers();
          this.resetForm();
        },
        (error) => {
          console.error('Error registering User:', error);
        }
      );
    }
  }


  loadUsers() {
    const apiUrl = 'http://localhost:8080/api/users';
    this.http.get(apiUrl).subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.users = data;
        } else {
          console.error('Invalid data received from the server. Expected an array.');
        }
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  exportData() {
    this.exportService.exportData().subscribe(
      (data: Blob) => {
        console.log(data);
        // Create a blob URL and trigger a download
        const blobUrl = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'employee_data_export.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      (error) => {
        console.error('Error exporting data:', error);
        // Handle the error as needed
      }
    );
  }
  searchUser(userId: number | undefined) {
    if (userId) {
      this.searchUserId = userId;
      const apiUrl = `http://localhost:8080/api/users/userById/${userId}`;
      this.http.get(apiUrl).subscribe(
        (data: any) => {
          this.userForm.patchValue(data); // Autofill the form with the fetched data
        },
        (error) => {
          console.error('Error fetching User:', error);
        }
      );
    }
  }

  resetForm() {
    this.userForm.reset();
    this.searchUserId = undefined;
  }
  private showSuccessSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      panelClass: ['snackbar-success'] // Add custom styles if needed
    });
  }
  
  highlightInvalidFields() {
    Object.keys(this.userForm.controls).forEach((field) => {
      const control = this.userForm.get(field)!;

      if (control.invalid) {
        control.markAsTouched();

        switch (field) {
          case 'firstName':
            this.firstNameField?.nativeElement.focus();
            break;
          case 'lastName':
            this.lastNameField?.nativeElement.focus();
            break;
          case 'email':
            this.emailField?.nativeElement.focus();
            break;
          case 'status':
            this.statusField?.nativeElement.focus();
            break;
          case 'joiningDate':
            this.joiningDateField?.nativeElement.focus();
            break;
          case 'hrId':
            this.hrIdField?.nativeElement.focus();
            break;
          case 'band':
            this.bandField?.nativeElement.focus();
            break;
          case 'reportingManagerId':
            this.reportingManagerIdField?.nativeElement.focus();
            break;
          case 'roles':
            this.rolesField?.nativeElement.focus();
            break;
          case 'teams':
            this.teamsField?.nativeElement.focus();
            break;
          // Add similar cases for other fields
        }
      }
    });

    if (this.userForm.valid) {
      this.registerOrUpdateUser();
    }
  }
  submitForm(event :Event) {
    event.preventDefault(); // Prevent the default form submission behavior
    this.highlightInvalidFields();
  }
  
clearForm() {
  this.resetForm();
}
}
