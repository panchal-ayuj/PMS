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

  registerUser() {
    const user = this.userForm.value;
    user.roles = user.roles.split(',').map((role: string) => role.trim());
    user.teams = user.teams.split(',').map((team: string) => team.trim());

    const apiUrl = 'http://localhost:8080/api/users/register';
  

    this.http.post(apiUrl, user).subscribe(
      (response) => {
        console.log('User registered successfully:', response);
        this.loadUsers(); // Refresh user list after registration
      },
      (error) => {
        console.error('Error registering user:', error);
      }
    );
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
}
