import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTeamComponent } from './review-team.component';

describe('ReviewTeamComponent', () => {
  let component: ReviewTeamComponent;
  let fixture: ComponentFixture<ReviewTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
