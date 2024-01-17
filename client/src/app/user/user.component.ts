// user-management.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ExportService } from '../export.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserManagementComponent implements OnInit {
  userForm!: FormGroup;
  users: any[] = [];
  userId: number | undefined;

  searchUserId: number | undefined;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,private exportService: ExportService) { }

  ngOnInit(): void {
    this.initForm();
    this.loadUsers(); // Assuming you want to load existing users on component initialization
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      status: [''],
      joiningDate: [''],
      hrId: [''],
      band: [''],
      reportingManagerId: [''],
      roles: [''],
      teams: ['']
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
}
