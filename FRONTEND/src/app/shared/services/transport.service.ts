import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const USER_AUTH_API_URL = 'http://localhost:8080/transport';
@Injectable({
  providedIn: 'root',
})
export class TransportService {
  constructor(private http: HttpClient) {}

  getTransport() {
    return this.http.get(USER_AUTH_API_URL + '/getTransport');
  }
  countOfNamesPerAddress() {
    return this.http.get(USER_AUTH_API_URL + '/countOfNamesPerAddress');
  }
  getAdresse(): any {
    return this.http.get(USER_AUTH_API_URL + '/getAdresse');
  }
  AddTransport(data: any) {
    return this.http.post(USER_AUTH_API_URL + '/AddTransport', data, {
      headers: new HttpHeaders().set('content-type', 'application/json'),
    });
  }
  deleteTransport(id_transport: number) {
    return this.http.delete(
      `${USER_AUTH_API_URL}/deleteTransport?id_transport=${id_transport}`
    );
  }

  updateTransport(id_transport: number, data: any) {
    return this.http.post(
      `${USER_AUTH_API_URL}/updateTransport?id_transport=${id_transport}`,
      data,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }
    );
  }
  getTransportById(id_transport: number) {
    return this.http.get(
      `${USER_AUTH_API_URL}/getTransportById?id_transport=${id_transport}`
    );
  }
  getReservationById(id: number) {
    return this.http.get(`${USER_AUTH_API_URL}/getReservationById?id=${id}`);
  }
  updateStatusResevation(id: number, data: any) {
    return this.http.post(
      `${USER_AUTH_API_URL}/updateStatusResevation?id=${id}`,
      data,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }
    );
  }

  countReservation(): any {
    return this.http.get(USER_AUTH_API_URL + '/countReservation');
  }
  countReservationAnnuler(): any {
    return this.http.get(USER_AUTH_API_URL + '/countReservationAnnuler');
  }
  countReservationConfirmer(): any {
    return this.http.get(USER_AUTH_API_URL + '/countReservationConfirmer');
  }
}
