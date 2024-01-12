import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadgoalplanComponent } from './uploadgoalplan.component';

describe('UploadgoalplanComponent', () => {
  let component: UploadgoalplanComponent;
  let fixture: ComponentFixture<UploadgoalplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadgoalplanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadgoalplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
