import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get(url: any, data?: any) {
    return this.http
      .get<any>(environment.serverBaseUrl + url, { params: data })
      .toPromise();
  }

  post(url: string, data: any, isFormData: boolean = false) {
    const body = new HttpParams({
      fromObject: data,
    });
    return this.http
      .post(environment.serverBaseUrl + url, !isFormData ? body : data)
      .toPromise();
  }

  patch(url: string, data: any) {
    const body = new HttpParams({
      fromObject: data,
    });
    return this.http.patch(environment.serverBaseUrl + url, body).toPromise();
  }
}
