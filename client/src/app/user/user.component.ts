// user-management.component.ts

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ExportService } from '../export.service';
import { MatSnackBar } from '@angular/material/snack-bar';

type FormFields = {
  firstName: ElementRef<any>;
  lastName: ElementRef<any>;
  email: ElementRef<any>;
  status: ElementRef<any>;
  joiningDate: ElementRef<any>;
  hrId: ElementRef<any>;
  band: ElementRef<any>;
  reportingManagerId: ElementRef<any>;
  roles: ElementRef<any>;
  teams: ElementRef<any>;
};

type FormRefs = {
  addForm: FormFields;
  updateForm: FormFields;
};

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserManagementComponent implements OnInit {
  selectedOption: string = 'register';
  value = 'Clear me';
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
  // Add Users specific options
  // showAddSingleUserOption: boolean = false;
  // showBulkUploadOption: boolean = false;

  // // Update Users specific options
  // showSearchOption: boolean = false;
  // userDetails: any = {}; // Assuming you have a UserDetails model

  // Function to handle radio button change
  // onRadioButtonChange(option: string): void {

  // Set specific options based on the selected radio button
  // switch (option) {
  //   case '1': // Add Users
  //     // this.showAddSingleUserOption = true;
  //     // this.showBulkUploadOption = true;
  //     break;
  //   case '2': // Update Users
  //     // this.showSearchOption = true;
  //     break;
  //   // Add more cases for other options if needed
  // }
  // }

  addForm!: FormGroup;
  updateForm!: FormGroup;
  users: any[] = [];
  userId: number | undefined;

  searchUserId: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private exportService: ExportService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUsers();
    this.initAddForm();

    // Assuming you want to load existing users on component initialization
  }

  initForm() {
    this.updateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      status: ['', Validators.required],
      joiningDate: ['', Validators.required],
      hrId: ['', Validators.required],
      band: ['', Validators.required],
      reportingManagerId: ['', Validators.required],
      roles: ['', Validators.required],
      teams: ['', Validators.required],
    });
  }

  initAddForm() {
    this.addForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      status: ['', Validators.required],
      joiningDate: ['', Validators.required],
      hrId: ['', Validators.required],
      band: ['', Validators.required],
      reportingManagerId: ['', Validators.required],
      roles: ['', Validators.required],
      teams: ['', Validators.required],
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

  // registerOrUpdateUser() {
  //   const user = this.userForm.value;
  //   console.log(typeof user.roles);
  //   console.log(user.roles);
  //   if (typeof user.roles === 'string'){
  //     user.roles = user.roles.split(',').map((role: string) => role.trim());
  //   }
  //   if (typeof user.teams === 'string'){
  //     user.teams = user.teams.split(',').map((team: string) => team.trim());
  //   }

  //   const apiUrl = 'http://localhost:8080/api/users/';

  //   // Check if ID is present for update
  //   if (this.searchUserId) {
  //     this.http.put(`${apiUrl}userById/${this.searchUserId}`, user).subscribe(
  //       (response) => {
  //         console.log('User updated successfully:', response);
  //         this.showSuccessSnackBar('User updated successfully');
  //         this.loadUsers();
  //         this.resetForm();
  //       },
  //       (error) => {
  //         console.error('Error updating User:', error);
  //       }
  //     );
  //   } else {
  //     this.http.post('http://localhost:8080/api/users/register', user).subscribe(
  //       (response) => {
  //         console.log('User registered successfully:', response);
  //         this.showSuccessSnackBar('User registered successfully');
  //         this.loadUsers();
  //         this.resetForm();
  //       },
  //       (error) => {
  //         console.error('Error registering User:', error);
  //       }
  //     );
  //   }
  // }

  addUser() {
    const user = this.addForm.value;
    console.log(typeof user.roles);
    console.log(user.roles);
    if (typeof user.roles === 'string') {
      user.roles = user.roles.split(',').map((role: string) => role.trim());
    }
    if (typeof user.teams === 'string') {
      user.teams = user.teams.split(',').map((team: string) => team.trim());
    }

    const apiUrl = 'http://localhost:8080/api/users/';
    this.http.post(`${apiUrl}register`, user).subscribe(
      (response) => {
        console.log('User registered successfully:', response);
        this.showSuccessSnackBar('User registered successfully');
        this.loadUsers();
        this.resetAddForm();
      },
      (error) => {
        console.error('Error registering User:', error);
      }
    );
  }

  updateUser() {
    const user = this.updateForm.value;
    console.log(typeof user.roles);
    console.log(user.roles);
    if (typeof user.roles === 'string') {
      user.roles = user.roles.split(',').map((role: string) => role.trim());
    }
    if (typeof user.teams === 'string') {
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
          this.resetUpdateForm();
        },
        (error) => {
          console.error('Error updating User:', error);
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
          console.error(
            'Invalid data received from the server. Expected an array.'
          );
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
          this.updateForm.patchValue(data); // Autofill the form with the fetched data
        },
        (error) => {
          console.error('Error fetching User:', error);
        }
      );
    }
  }

  resetUpdateForm() {
    this.updateForm.reset();
    this.searchUserId = undefined;
  }
  resetAddForm() {
    this.addForm.reset();
    this.searchUserId = undefined;
  }
  private showSuccessSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      panelClass: ['snackbar-success'], // Add custom styles if needed
    });
  }

  highlightInvalidFields(formName: 'addForm' | 'updateForm') {
    const form = this[formName] as FormGroup;
    const formFields: FormRefs = {
      addForm: {
        firstName: this.firstNameField,
        lastName: this.lastNameField,
        email: this.emailField,
        status: this.statusField,
        joiningDate: this.joiningDateField,
        hrId: this.hrIdField,
        band: this.bandField,
        reportingManagerId: this.reportingManagerIdField,
        roles: this.rolesField,
        teams: this.rolesField,
        // ... Add other fields
      },
      updateForm: {
        firstName: this.firstNameField,
        lastName: this.lastNameField,
        email: this.emailField,
        status: this.statusField,
        joiningDate: this.joiningDateField,
        hrId: this.hrIdField,
        band: this.bandField,
        reportingManagerId: this.reportingManagerIdField,
        roles: this.rolesField,
        teams: this.rolesField,
      },
    };

    Object.keys(form.controls).forEach((field) => {
      const control = form.get(field)!;
      const fieldRef = (formFields[formName] as any)[field] as ElementRef<any>;

      if (control.invalid && fieldRef) {
        control.markAsTouched();
        fieldRef.nativeElement.focus();
      }
    });

    if (form.valid) {
      // Call the respective method (addUser or updateUser) based on the form name
      console.log('form valid');
      formName === 'addForm' ? this.addUser() : this.updateUser();
    }
  }
}
