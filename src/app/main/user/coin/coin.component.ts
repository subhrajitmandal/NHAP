/**
 * @file: coin.component.ts
 * @description: This file contains all the functionality for user coin 
*/
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CoinService } from './coin.service';
import { take } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface CoinListDatatype {
    amount: number;
    created_at: string,
    id: string,
    is_credit: boolean,
    is_debit: boolean,
    message: string,
    mode: string,
    order_id: string,
    status: boolean,
    transaction_id: string,
    updated_at: string,
    user: Record<string, string>
}

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss']
})

export class CoinComponent implements AfterViewInit, OnInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    walletBalance: string;
    displayedColumns: string[];
    coinDatasource: MatTableDataSource<CoinListDatatype>;

    constructor(private coinService: CoinService) {
        this.walletBalance = '0';
        this.displayedColumns = ['transaction', 'amount'];
        this.coinDatasource = new MatTableDataSource<CoinListDatatype>();
     }


  /**
   * @function: ngAfterViewInit
   * @description: This function sets the paginator and sorting of the table.
   * @param: null
   * @returns: void
   */
   ngAfterViewInit() {
    this.coinDatasource.paginator = this.paginator;
    this.coinDatasource.sort = this.sort;
  }

  /**
   * @function: ngOnInit
   * @description: This function sets the paginator and sorting of the table.
   * @param: null
   * @returns: void
   */
   ngOnInit() {

    // Get the wallet balance
    this.coinService.getWalletBalance()
    .pipe(
        take(1)
    )
    .subscribe( (walletBalanceStatus) => {
        if(walletBalanceStatus.success === 'true'){
            this.walletBalance = walletBalanceStatus.data;
        }
    })

    // Get the transactions in the table
    this.coinService.getTransaction()
    .pipe(
        take(1)
    )
    .subscribe( (coinDetails) => {
        this.coinDatasource.data = coinDetails.data;



      //  this.coinDatasource.data = coinTableArr;
    });

    
  }
}
