import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-diaglogoverview',
  templateUrl: './diaglogoverview.component.html',
  styleUrl: './diaglogoverview.component.scss'
})
export class DiaglogoverviewComponent {
  constructor(
    public dialogRef: MatDialogRef<DiaglogoverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tasks: any }
  ) {}

  getWeight(taskWeight:number): number {
    return Math.round(taskWeight/(this.data.tasks.reduce((sum: any, task: { weight: any; }) => sum + task.weight, 0))*100);
  }
  
}
