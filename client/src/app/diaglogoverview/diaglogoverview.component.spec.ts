import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaglogoverviewComponent } from './diaglogoverview.component';

describe('DiaglogoverviewComponent', () => {
  let component: DiaglogoverviewComponent;
  let fixture: ComponentFixture<DiaglogoverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiaglogoverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiaglogoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
