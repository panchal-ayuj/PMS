import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-keyresult-form',
  templateUrl: './keyresult-form.component.html',
  styleUrl: './keyresult-form.component.scss'
})
export class KeyresultFormComponent {
  keyResultForm!: FormGroup;
  keyresults: any[] = [];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.initForm();
    this.loadKeyResults(); // Assuming you want to load existing users on component initialization
  }

  initForm() {
    this.keyResultForm = this.formBuilder.group({
      userId: [''],
      goalPlanId: [''],
      keyResultName: [''],
      description: [''],
      weight: [''],
      period: [''],
      windowId: ['']
    });
  }

  registerKeyResult() {
    const keyresult = this.keyResultForm.value;

    const apiUrl = 'http://localhost:8080/keyResult/register';

    this.http.post(apiUrl, keyresult).subscribe(
      (response) => {
        console.log('KeyResult registered successfully:', response);
        this.loadKeyResults(); // Refresh user list after registration
      },
      (error) => {
        console.error('Error registering keyResult:', error);
      }
    );
  }

  loadKeyResults() {
    const apiUrl = 'http://localhost:8080/keyResult';
    this.http.get(apiUrl).subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.keyresults = data;
        } else {
          console.error('Invalid data received from the server. Expected an array.');
        }
      },
      (error) => {
        console.error('Error loading keyresults:', error);
      }
    );
  }
}
