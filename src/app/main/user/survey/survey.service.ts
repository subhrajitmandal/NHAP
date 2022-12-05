import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SurveyService {

  constructor(private http: HttpClient) { }

    /**
   * @function: saveDraft
   * @description: This functions calls http for saving the survey draft
   * @param: surveyData
   * @returns: Observable
   */
  saveDraft(surveyData: FormData, draftId: string): Observable<any>{
    return this.http.put(`${environment.apiUrl}user/survey/${draftId}/`, surveyData);
  } 

    /**
   * @function: createSurvey
   * @description: This functions calls http for saving the survey draft
   * @param: surveyData
   * @returns: Observable
   */
  createSurvey(surveyData: FormData): Observable<any>{
    return this.http.post(`${environment.apiUrl}user/survey/`, surveyData);
  }
}
