import { Component, OnInit } from '@angular/core';
import { Event, Navigation, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

export const routeConfigs = {
  // Common Section
  '': { section: '', showHideButton: false, showHidePageHeader: false},
  '/login': { section: '', showHideButton: false, showHidePageHeader: false},
  '/signup': { section: '', showHideButton: false, showHidePageHeader: false},
  '/admin/login': { section: '', showHideButton: false, showHidePageHeader: false},   
  // User Section
  '/user': { section: 'Dashboard', showHideButton: true, showHidePageHeader: true},
  '/user/dashboard': { section: 'Dashboard', showHideButton: true, showHidePageHeader: true},
  '/user/profile': { section: 'Profile', showHideButton: true, showHidePageHeader: true},
  '/user/surveylist': { section: 'My Surveys', showHideButton: true, showHidePageHeader: true},
  '/user/coin': { section: 'My Wallet', showHideButton: true, showHidePageHeader: true},
  '/user/survey': { section: 'Take A Survey', showHideButton: true, showHidePageHeader: false},
  // Admin Section
  '/admin/dashboards': { section: 'Dashboard', showHideButton: false, showHidePageHeader: true},
  '/admin/survey': { section: 'View Surveys', showHideButton: false, showHidePageHeader: true},
  '/admin/users': { section: 'View Users', showHideButton: false, showHidePageHeader: true},
  '/admin/consultants': { section: 'View Consultants', showHideButton: false, showHidePageHeader: true},
  '/admin/reports': { section: 'View Reports', showHideButton: false, showHidePageHeader: true}
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit {

  currentRoute: string;
  routeConfigs: Record<string, any>;



  constructor(private routerChanges: Router) {
    this.currentRoute = '';
    this.routeConfigs = routeConfigs;
  }

  ngOnInit(): void {
    
    this.routerChanges.events
    .pipe(
      filter( (e: Event): e is RouterEvent => e instanceof NavigationEnd  )
    )
    .subscribe( (events: RouterEvent) => {

      this.currentRoute = events.url;

    });
    
  }

}
