import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalplanFormComponent } from './goalplan-form.component';

describe('GoalplanFormComponent', () => {
  let component: GoalplanFormComponent;
  let fixture: ComponentFixture<GoalplanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoalplanFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoalplanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
