import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-keyresult-form',
  templateUrl: './keyresult-form.component.html',
  styleUrl: './keyresult-form.component.scss'
})
export class KeyresultFormComponent {
  @ViewChild('userIdField')
  userIdField!: ElementRef;
  @ViewChild('goalPlanIdField')
  goalPlanIdField!: ElementRef;
  @ViewChild('keyResultNameField')
  keyResultNameField!: ElementRef;
  @ViewChild('descriptionField')
  descriptionField!: ElementRef;
  @ViewChild('weightField')
  weightField!: ElementRef;
  @ViewChild('periodField')
  periodField!: ElementRef;
  @ViewChild('windowIdField')
  windowIdField!: ElementRef;
  keyResultForm!: FormGroup;
  keyresults: any[] = [];
  keyResultId: number | undefined;

  searchKeyResultId: number | undefined;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initForm();
    this.loadKeyResults(); // Assuming you want to load existing users on component initialization
  }

  initForm() {
    this.keyResultForm = this.formBuilder.group({
      userId: ['' , Validators.required],
      goalPlanId: ['' , Validators.required],
      keyResultName: ['' , [Validators.required , Validators.maxLength(255)]],
      description: ['' , Validators.required],
      weight: ['', Validators.required],
      period: ['', Validators.required],
      windowId: ['', Validators.required]
    });
  }

  registerOrUpdateKeyResult() {
    const keyresult = this.keyResultForm.value;

    const apiUrl = 'http://localhost:8080/keyResult/';

    // Check if ID is present for update
    if (this.searchKeyResultId) { 
      this.showSuccessSnackBar('Key Result updated successfully');


      this.http.put(`${apiUrl}keyResultById/${this.searchKeyResultId}`, keyresult).subscribe(
        (response) => {
          
          console.log('Key Result updated successfully:', response);
          this.loadKeyResults();
          this.resetForm();
        },
        (error) => {
          console.error('Error updating Key Result:', error);
        }
      );
    } else {
      this.showSuccessSnackBar('Key Result registered successfully');
      this.http.post('http://localhost:8080/keyResult/register', keyresult).subscribe(
        (response) => {
          console.log('Key Result registered successfully:', response);
          this.loadKeyResults();
          this.resetForm();
        },
        (error) => {
          console.error('Error registering Key Result:', error);
        }
      );
    }
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

  exportKeyResults() {
    const apiUrl = 'http://localhost:8080/keyResult/export';

    // Make a GET request to the export endpoint
    this.http.get(apiUrl, { responseType: 'blob' }).subscribe(
      (data: Blob) => {
        // Create a blob URL and trigger a download
        const blobUrl = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'key_result_data_export.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      (error) => {
        console.error('Error exporting key results:', error);
        // Handle the error, you can display a user-friendly message
      }
    );
  }

  searchKeyResult(keyResultId: number | undefined) {
    if (keyResultId) {
      this.searchKeyResultId = keyResultId;
      const apiUrl = `http://localhost:8080/keyResult/keyResultById/${keyResultId}`;
      this.http.get(apiUrl).subscribe(
        (data: any) => {
          this.keyResultForm.patchValue(data); // Autofill the form with the fetched data
        },
        (error) => {
          console.error('Error fetching Key Result:', error);
        }
      );
    }
  }

  resetForm() {
    this.keyResultForm.reset();
    this.searchKeyResultId = undefined;
  }
  private showSuccessSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      panelClass: ['snackbar-success'] // Add custom styles if needed
    });
  }
  submitForm(event: Event) {
    event.preventDefault(); // Prevent the default form submission behavior
    this.highlightInvalidFields();
  }
  
  highlightInvalidFields() {
    // Loop through form controls and mark the invalid ones
    Object.keys(this.keyResultForm.controls).forEach((field) => {
      const control: AbstractControl = this.keyResultForm.get(field)!;
  
      // If the control is invalid
      if (control.invalid) {
        // Mark the control as touched to display error messages (if any)
        control.markAsTouched();
  
        // Focus on the first invalid field
        if (field === 'userId' && this.userIdField) {
          this.userIdField.nativeElement.focus();
        } else if (field === 'goalPlanId' && this.goalPlanIdField) {
          this.goalPlanIdField.nativeElement.focus();
        } else if (field === 'keyResultName' && this.keyResultNameField) {
          this.keyResultNameField.nativeElement.focus();
        } else if (field === 'description' && this.descriptionField) {
          this.descriptionField.nativeElement.focus();
        } else if (field === 'weight' && this.weightField) {
          this.weightField.nativeElement.focus();
        } else if (field === 'period' && this.periodField) {
          this.periodField.nativeElement.focus();
        } else if (field === 'windowId' && this.windowIdField) {
          this.windowIdField.nativeElement.focus();
        }
        // Add similar conditions for other fields
      }
    });
    if (this.keyResultForm.valid) {
      this.registerOrUpdateKeyResult();
    }
  }
  clearForm() {
    this.resetForm();
  }
  
  
  
  
  
  
}
