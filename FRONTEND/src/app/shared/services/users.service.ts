import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const USER_AUTH_API_URL = 'http://localhost:8080/users';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAllUser() {
    return this.http.get(USER_AUTH_API_URL + '/getAllUser');
  }

  AddUser(data: any) {
    return this.http.post(USER_AUTH_API_URL + '/AddUser', data, {
      headers: new HttpHeaders().set('content-type', 'application/json'),
    });
  }
  deleteUser(id_User: number) {
    return this.http.delete(
      `${USER_AUTH_API_URL}/deleteUser?id_User=${id_User}`
    );
  }
  updateUser(id_User: number, data: any) {
    return this.http.post(
      `${USER_AUTH_API_URL}/updateUser?id_User=${id_User}`,
      data,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }
    );
  }
  updateMotDePasse(id_User: number, data: any) {
    return this.http.post(
      `${USER_AUTH_API_URL}/updateMotDePasse?id_User=${id_User}`,
      data,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }
    );
  }
  getUserById(id_User: number) {
    return this.http.get(`${USER_AUTH_API_URL}/getUserById?id_User=${id_User}`);
  }
  getUsersCount() {
    return this.http.get(USER_AUTH_API_URL + '/count');
  }
  getReclamation() {
    return this.http.get(USER_AUTH_API_URL + '/getReclamation');
  }
  AddReclamation(data: any) {
    return this.http.post(USER_AUTH_API_URL + '/AddReclamation', data, {
      headers: new HttpHeaders().set('content-type', 'application/json'),
    });
  }
  countReclamation() {
    return this.http.get(USER_AUTH_API_URL + '/countReclamation');
  }
}
