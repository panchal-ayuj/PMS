import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentReviewcycleComponent } from './parent-reviewcycle.component';

describe('ParentReviewcycleComponent', () => {
  let component: ParentReviewcycleComponent;
  let fixture: ComponentFixture<ParentReviewcycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentReviewcycleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParentReviewcycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
