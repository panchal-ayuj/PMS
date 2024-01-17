import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})

export class TaskComponent implements OnInit {
  taskForm!: FormGroup;
  tasks: any[] = [];
  taskId: number | undefined;

  searchTaskId: number | undefined;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.initForm();
    this.loadTasks();
  }

  initForm() {
    this.taskForm = this.fb.group({
      keyResultId: [''],
      description: [''],
      creationDate: [''],
      deadline: [''],
      weight: [''],
      completionStatus: [''],
      userId: [''],
      windowId: [''],
      rating: [''],
      feedback: [''],
      period: [''],
      taskAttributes: ['']
    });
  }

  loadTasks() {
    const apiUrl = 'http://localhost:8080/api/tasks';
    this.http.get(apiUrl).subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.tasks = data;
        } else {
          console.error('Invalid data received from the server. Expected an array.');
        }
      },
      (error) => {
        console.error('Error loading tasks:', error);
      }
    );
  }

  registerOrUpdateTask() {
    const task = this.taskForm.value;
    if (typeof task.taskAttributes === 'string'){
      task.taskAttributes = task.taskAttributes.split(',').map((taskAttribute: string) => taskAttribute.trim());
    }

    const apiUrl = 'http://localhost:8080/api/tasks/';

    // Check if ID is present for update
    if (this.searchTaskId) {
      this.http.put(`${apiUrl}taskById/${this.searchTaskId}`, task).subscribe(
        (response) => {
          console.log('Task updated successfully:', response);
          this.loadTasks();
          this.resetForm();
        },
        (error) => {
          console.error('Error updating Task:', error);
        }
      );
    } else {
      this.http.post('http://localhost:8080/api/tasks/create', task).subscribe(
        (response) => {
          console.log('Task registered successfully:', response);
          this.loadTasks();
          this.resetForm();
        },
        (error) => {
          console.error('Error registering Task:', error);
        }
      );
    }
  }

  searchTask(taskId: number | undefined) {
    if (taskId) {
      this.searchTaskId = taskId;
      const apiUrl = `http://localhost:8080/api/tasks/taskById/${taskId}`;
      this.http.get(apiUrl).subscribe(
        (data: any) => {
          this.taskForm.patchValue(data); // Autofill the form with the fetched data
        },
        (error) => {
          console.error('Error fetching Task:', error);
        }
      );
    }
  }

  resetForm() {
    this.taskForm.reset();
    this.searchTaskId = undefined;
  }

  exportTasks() {
    const apiUrl = 'http://localhost:8080/api/tasks/export';

    // Make a GET request to the export endpoint
    this.http.get(apiUrl, { responseType: 'blob' }).subscribe(
      (data: Blob) => {
        // Create a blob URL and trigger a download
        const blobUrl = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'task_data_export.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      (error) => {
        console.error('Error exporting tasks:', error);
        // Handle the error as needed
      }
    );
  }

  // Other methods for updating, deleting, or managing tasks as needed
}