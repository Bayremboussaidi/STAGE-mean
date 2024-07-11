import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTransportComponent } from './all-transport.component';

describe('AllTransportComponent', () => {
  let component: AllTransportComponent;
  let fixture: ComponentFixture<AllTransportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllTransportComponent]
    });
    fixture = TestBed.createComponent(AllTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
