import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentGoalplanComponent } from './parent-goalplan.component';

describe('ParentGoalplanComponent', () => {
  let component: ParentGoalplanComponent;
  let fixture: ComponentFixture<ParentGoalplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentGoalplanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParentGoalplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
