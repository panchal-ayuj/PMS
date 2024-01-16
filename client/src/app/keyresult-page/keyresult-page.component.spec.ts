import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyresultPageComponent } from './keyresult-page.component';

describe('KeyresultPageComponent', () => {
  let component: KeyresultPageComponent;
  let fixture: ComponentFixture<KeyresultPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeyresultPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeyresultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
