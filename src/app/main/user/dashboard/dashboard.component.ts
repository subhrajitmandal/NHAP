import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService } from './dashboard.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private dashboardService: DashboardService,
              private notification: MatSnackBar) { }

  getCoinStatus(): void {
    this.dashboardService.getUserCoinStatus()
    .pipe(
      take(1)
    )
    .subscribe( (coinStatus) => {
      if(coinStatus.status === 'true'){
        this.notification.open(coinStatus.message, 'ok');
        //redirect to survey start page
      }
      else{
        this.notification.open(coinStatus.message, 'ok');
        // Redirect to coin insufficient screen
      }
    });
  }
}
