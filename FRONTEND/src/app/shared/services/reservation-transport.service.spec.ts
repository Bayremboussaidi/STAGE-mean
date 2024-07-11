import { TestBed } from '@angular/core/testing';

import { ReservationTransportService } from './reservation-transport.service';

describe('ReservationTransportService', () => {
  let service: ReservationTransportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationTransportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
