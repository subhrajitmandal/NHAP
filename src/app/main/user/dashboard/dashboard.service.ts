import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {}

  getUserCoinStatus(): Observable<any> {
    return this.http.get(`${environment.apiUrl}getUserCoinStatus/`);
  }
}
