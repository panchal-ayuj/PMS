import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentKeyresultComponent } from './parent-keyresult.component';

describe('ParentKeyresultComponent', () => {
  let component: ParentKeyresultComponent;
  let fixture: ComponentFixture<ParentKeyresultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentKeyresultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParentKeyresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
