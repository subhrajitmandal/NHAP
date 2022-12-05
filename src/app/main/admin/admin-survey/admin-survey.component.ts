/**
 * @file: admin-survey.component.ts
 * @description: This is the admin survey page
 */
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminSurveyService } from './admin-survey.service';
import { take } from 'rxjs/operators';
 
export interface SurveyListDatatype {
  id: string;
  surveyNo: string;
  roadNo: string;
  date: string;
  propertyType: string,
  username: string,
  status: string
}

 @Component({
   selector: 'app-admin-survey',
   templateUrl: './admin-survey.component.html',
   styleUrls: ['./admin-survey.component.scss']
 })
 
 export class AdminSurveyComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[];
  surveyDatasource: MatTableDataSource<SurveyListDatatype>;
 
   constructor(private surveyService: AdminSurveyService) { 
    this.displayedColumns = ['surveyNo', 'roadNo', 'date', 'propertyType', 'username', 'status', 'view'];
    this.surveyDatasource = new MatTableDataSource<SurveyListDatatype>();
   }

     /**
   * @function: ngAfterViewInit
   * @description: This function sets the paginator and sorting of the table.
   * @param: null
   * @returns: void
   */
  ngAfterViewInit() {
    this.surveyDatasource.paginator = this.paginator;
    this.surveyDatasource.sort = this.sort;
  }

  /**
   * @function: ngOnInit
   * @description: This function sets the data in the datasource of the table
   * @param: null
   * @returns: void
   */
   ngOnInit(): void {
      this.surveyService.getSurveyList()
      .pipe(
        take(1)
      )
      .subscribe( (surveyData) => {
        if(surveyData.success === 'true'){
          this.surveyDatasource.data = surveyData.data;
        }
      });

   }
 

  /**
   * @function: handleViewSurvey
   * @description: This function handles the click for view of the survey details
   * @param: selectedSurvey, event
   * @returns: void
   */
   handleViewSurvey(selectedSurvey: SurveyListDatatype, event: Event ): void {
    event.stopPropagation();

    // Make changes for view of survey as needed
    console.log(selectedSurvey, "Admin selectedSurvey")

  }
 }
 
 