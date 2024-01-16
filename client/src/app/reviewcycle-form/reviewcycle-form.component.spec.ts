import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewcycleFormComponent } from './reviewcycle-form.component';

describe('ReviewcycleFormComponent', () => {
  let component: ReviewcycleFormComponent;
  let fixture: ComponentFixture<ReviewcycleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewcycleFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewcycleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
