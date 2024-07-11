import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const USER_AUTH_API_URL = 'http://localhost:8080/plat';
@Injectable({
  providedIn: 'root',
})
export class CommandeRepasService {
  constructor(private http: HttpClient) {}
  getcommandeRepas() {
    return this.http.get(USER_AUTH_API_URL + '/getcommandeRepas');
  }
  getRepasCount() {
    return this.http.get(USER_AUTH_API_URL + '/count');
  }
}
