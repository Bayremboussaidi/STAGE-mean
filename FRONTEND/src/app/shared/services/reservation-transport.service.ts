import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const USER_AUTH_API_URL = 'http://localhost:8080/transport';
@Injectable({
  providedIn: 'root',
})
export class ReservationTransportService {
  constructor(private http: HttpClient) {}
  getReservationTransport() {
    return this.http.get(USER_AUTH_API_URL + '/getReservationTransport');
  }
  getReservationTransportByStatus() {
    return this.http.get(
      USER_AUTH_API_URL + '/getReservationTransportByStatus'
    );
  }
  getTransportCount() {
    return this.http.get(USER_AUTH_API_URL + '/count');
  }

  AddReservationTransport(data: any) {
    return this.http.post(
      USER_AUTH_API_URL + '/AddReservationTransport',
      data,
      {
        headers: new HttpHeaders().set('content-type', 'application/json'),
      }
    );
  }
}
