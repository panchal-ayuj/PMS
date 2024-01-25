import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackArchivePageComponent } from './feedback-archive-page.component';

describe('FeedbackArchivePageComponent', () => {
  let component: FeedbackArchivePageComponent;
  let fixture: ComponentFixture<FeedbackArchivePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedbackArchivePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedbackArchivePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
