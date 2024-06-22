import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  private baseUrl = `${environment.serverBaseUrl}announcement`;

  constructor(private http: HttpClient) {}

  createAnnouncement(data: FormData) {
    const token = window.localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .post<any>(`${environment.serverBaseUrl}announcement/create`, data, {
        headers,
      })
      .toPromise();
  }

  getAnnouncements() {
    return this.http.get<any>(`${this.baseUrl}/get`).toPromise();
  }

  getAnnouncementById(id: string) {
    return this.http.get<any>(`${this.baseUrl}/get/${id}`).toPromise();
  }

  reserveAnnouncement(id: string) {
    const token = window.localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .patch<any>(`${this.baseUrl}/reserve/${id}`, {}, { headers })
      .toPromise();
  }

  releaseAnnouncement(id: string) {
    const token = window.localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .patch<any>(`${this.baseUrl}/release/${id}`, {}, { headers })
      .toPromise();
  }
}
