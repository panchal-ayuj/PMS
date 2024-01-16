import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentUserComponent } from './parent-user.component';

describe('ParentUserComponent', () => {
  let component: ParentUserComponent;
  let fixture: ComponentFixture<ParentUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
