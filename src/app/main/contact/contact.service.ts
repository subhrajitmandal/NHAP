import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }
  
  /**
   * @function: addConsultant
   * @description: This functions adds a new consultant
   * @param: null
   * @returns: Observable
  */
   sendContactData(contactFormData: FormData): Observable<any>{
    return this.http.post(`${environment.apiUrl}user/consultant/`, contactFormData);
  }

}
