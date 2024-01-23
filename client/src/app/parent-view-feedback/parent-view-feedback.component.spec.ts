import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentViewFeedbackComponent } from './parent-view-feedback.component';

describe('ParentViewFeedbackComponent', () => {
  let component: ParentViewFeedbackComponent;
  let fixture: ComponentFixture<ParentViewFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentViewFeedbackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParentViewFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
