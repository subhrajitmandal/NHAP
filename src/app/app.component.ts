import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, Event } from '@angular/router';
import { of, Subject } from 'rxjs';
import { filter, mergeMap, takeUntil, delay, take } from 'rxjs/operators';
import { SpinnerLoaderService } from './main/common/services/spinner-loader.service';
import { UserLoggedInfoService } from './main/common/services/user-logged-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy{

  isHTTPLoader: boolean;
  isRouterLoader: boolean;
  endSubscription: Subject<void>;

  constructor(private userInfoService: UserLoggedInfoService,
              private router: Router,
              private spinnerService: SpinnerLoaderService){
    this.isHTTPLoader = false;
    this.isRouterLoader = false;
    this.endSubscription = new Subject<void>();
  }

  ngOnDestroy(): void {
    this.endSubscription.next();
    this.endSubscription.complete();
  }

  ngOnInit(): void {

    // Display or hide the http loader
    this.spinnerService.isLoadingObs
    .pipe(
      takeUntil(this.endSubscription),
      delay(10)
    )
    .subscribe( (status) => this.isHTTPLoader = status);

    //Display the loader on router navigation
    this.router.events
    .pipe(
      filter(event => event instanceof NavigationStart)
    )
    .subscribe( (event) => {
        this.isRouterLoader = true;
    });

    // Hide the loader on end of router navigation with a slight delay to avoid flickering effect.
    this.router.events
    .pipe(
      delay(500),
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe( (event) => {
        this.isRouterLoader = false;
    });

    // On page reload add the user information in behavior subject
    if(localStorage.length && localStorage.getItem('app_aid')){
      this.userInfoService.saveUserInfo(localStorage.getItem('app_aid'));
    }


    //End of ngOnInit
  }

}
