import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const USER_AUTH_API_URL = 'http://localhost:8080/plat';
@Injectable({
  providedIn: 'root',
})
export class RepasService {
  constructor(private http: HttpClient) {}
  getPlat() {
    return this.http.get(USER_AUTH_API_URL + '/getPlat');
  }
  AddPlat(data: any) {
    return this.http.post(USER_AUTH_API_URL + '/AddPlat', data, {
      headers: new HttpHeaders().set('content-type', 'application/json'),
    });
  }
  getPlatById(id_plat: number) {
    return this.http.get(`${USER_AUTH_API_URL}/getPlatById?id_plat=${id_plat}`);
  }
  deletePlat(id_plat: number) {
    return this.http.delete(
      `${USER_AUTH_API_URL}/deletePlat?id_plat=${id_plat}`
    );
  }
  updatePlat(id_plat: number, data: any) {
    return this.http.post(
      `${USER_AUTH_API_URL}/updatePlat?id_plat=${id_plat}`,
      data,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }
    );
  }
  getnomPlat() {
    return this.http.get(USER_AUTH_API_URL + '/getnomPlat');
  }
  AddCommanderPlat(data: any) {
    return this.http.post(USER_AUTH_API_URL + '/AddCommanderPlat', data, {
      headers: new HttpHeaders().set('content-type', 'application/json'),
    });
  }
}
