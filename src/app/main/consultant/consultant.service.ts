import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {

  constructor(private http: HttpClient) { }

  /**
   * @function: getConsultantList
   * @description: This functions fetches the Consultant list
   * @param: ConsultantData
   * @returns: Observable
   */
   getConsultantList(): Observable<any>{
    return this.http.get(`${environment.apiUrl}user/consultant/`);
  }

  /**
   * @function: addConsultant
   * @description: This functions adds a new consultant
   * @param: null
   * @returns: Observable
  */
   addConsultant(consultantFormData: FormData): Observable<any>{
    return this.http.post(`${environment.apiUrl}user/consultant/`, consultantFormData);
  }

}
