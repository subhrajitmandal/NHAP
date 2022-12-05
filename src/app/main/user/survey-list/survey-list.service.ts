/**
 * @file: survey-list.service.ts
 * @description: This file fetches the survey details.
 * @author: Asish Das
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SurveyListService {

  constructor(private http: HttpClient) { }

    /**
   * @function: getSurveyList
   * @description: This functions fetches the survey list
   * @param: surveyData
   * @returns: Observable
   */
  getSurveyList(): Observable<any>{
    return this.http.get(`${environment.apiUrl}user/survey/`);
  } 

  /**
   * @function: getSurveyList
   * @description: This functions fetches the survey details
   * @param: draftId
   * @returns: Observable
  */
  getSurveyDetails(draftId: string): Observable<any>{
      return this.http.get(`${environment.apiUrl}user/survey/${draftId}/`);
  } 

  /**
   * @function: fetchImageFromServer
   * @description: This functions calls http for fetching the image from api server
   * @param: imageUrl
   * @returns: Observable
   */
  fetchImageFromServer(leftImageUrl: string, rightImageUrl: string): Observable<any> {

    return forkJoin([
      this.http.get(leftImageUrl, { responseType: 'blob' }),
      this.http.get(rightImageUrl, { responseType: 'blob' })
    ]);
  }

}
