import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationTransportComponent } from './reservation-transport.component';

describe('ReservationTransportComponent', () => {
  let component: ReservationTransportComponent;
  let fixture: ComponentFixture<ReservationTransportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationTransportComponent]
    });
    fixture = TestBed.createComponent(ReservationTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
