import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyresultuploadComponent } from './keyresultupload.component';

describe('KeyresultuploadComponent', () => {
  let component: KeyresultuploadComponent;
  let fixture: ComponentFixture<KeyresultuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeyresultuploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeyresultuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
