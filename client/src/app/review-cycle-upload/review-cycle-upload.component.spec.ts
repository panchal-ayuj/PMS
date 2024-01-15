import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCycleUploadComponent } from './review-cycle-upload.component';

describe('ReviewCycleUploadComponent', () => {
  let component: ReviewCycleUploadComponent;
  let fixture: ComponentFixture<ReviewCycleUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewCycleUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewCycleUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
