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

  createTask() {
    const task = this.taskForm.value;
    task.taskAttributes = task.taskAttributes.split(',').map((taskAttribute: string) => taskAttribute.trim());

    const apiUrl = 'http://localhost:8080/api/tasks';
    this.http.post(apiUrl, task).subscribe(
      (response) => {
        console.log('Task created successfully:', response);
        this.loadTasks(); // Refresh the task list
      },
      (error) => {
        console.error('Error creating task:', error);
      }
    );
  }

  updateTask(taskId: number) {
    const updatedTask = this.taskForm.value;
    const apiUrl = `http://localhost:8080/api/tasks/${taskId}`;
    this.http.put(apiUrl, updatedTask).subscribe(
      (response) => {
        console.log('Task updated successfully:', response);
        this.loadTasks(); // Refresh the task list
      },
      (error) => {
        console.error('Error updating task:', error);
      }
    );
  }

  deleteTask(taskId: number) {
    const apiUrl = `http://localhost:8080/api/tasks/${taskId}`;
    this.http.delete(apiUrl).subscribe(
      (response) => {
        console.log('Task deleted successfully:', response);
        this.loadTasks(); // Refresh the task list
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
  }

  // Other methods for updating, deleting, or managing tasks as needed
}