import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfFeedbackDialogComponent } from './self-feedback-dialog.component';

describe('SelfFeedbackDialogComponent', () => {
  let component: SelfFeedbackDialogComponent;
  let fixture: ComponentFixture<SelfFeedbackDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelfFeedbackDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelfFeedbackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
