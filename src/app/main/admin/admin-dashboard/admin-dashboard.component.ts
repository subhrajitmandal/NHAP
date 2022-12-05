/**
 * @file: admin-dashboard.component.ts
 * @description: This is the admin dashboard page
 */
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminDashboardService } from './admin-dashboard.service';
import { take } from 'rxjs/operators';
 
export interface TodaySurveyDatatype {
  id: string,
  surveyNo: string,
  highwayNo: number,
  username: string,
  status: string
}


 @Component({
   selector: 'app-admin-dashboard',
   templateUrl: './admin-dashboard.component.html',
   styleUrls: ['./admin-dashboard.component.scss']
 })
 
 export class AdminDashboardComponent implements OnInit, AfterViewInit {
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[];
  surveyDatasource: MatTableDataSource<TodaySurveyDatatype>;
  dashboardSummary: {users: string, consultants: string, surveys: string};

   constructor(private dashboardService: AdminDashboardService) { 
      this.displayedColumns = ['surveyNo', 'highwayNo', 'username', 'status', 'view'];
      this.surveyDatasource = new MatTableDataSource<TodaySurveyDatatype>();
      this.dashboardSummary = {users: '0', consultants: '0', surveys: '0'};
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
      // Fetches the data for the dashboard summary in tiles
      this.dashboardService.getDashboardSummaryDetails()
      .pipe(
        take(1)
      )
      .subscribe( (summaryDetails) => {
        if(summaryDetails.success === 'true'){
          this.dashboardSummary = {
            users: summaryDetails.data.total_user,
            consultants: summaryDetails.data.total_consultant,
            surveys: summaryDetails.data.submitted_survey
          }
        }
      });

      // Fetches the data for the dashboard table
      this.dashboardService.getDashboardTableDetails()
      .pipe(
        take(1)
      )
      .subscribe( (surveyDetails) => {
        if(surveyDetails.success === 'true'){
      //    this.surveyDatasource.data = surveyDetails.data;
        }
      });
   }

  /**
   * @function: handleViewSurvey
   * @description: This function handles the click for view of the survey details
   * @param: selectedSurvey, event
   * @returns: void
   */
   handleViewSurvey(selectedSurvey: TodaySurveyDatatype, event: Event ): void {
    event.stopPropagation();
    
    //Add code for the view functionality

  }
 }
 
 