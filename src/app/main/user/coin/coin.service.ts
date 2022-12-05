/**
 * @file: coin.service.ts
 * @description: This file handles the http calls for coin
*/
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoinService {

  constructor(private http: HttpClient) {}

  /**
   * @function: getWalletBalance
   * @description: This function retrieves the wallet balance
   * @param: null
   * @returns: observable
  */
  getWalletBalance(): Observable<any> {
    return this.http.get(`${environment.apiUrl}user/wallet/balance/`);
  }

  /**
   * @function: getTransaction
   * @description: This function retrieves the transaction balance
   * @param: null
   * @returns: observable
  */
  getTransaction(): Observable<any> {
    return this.http.get(`${environment.apiUrl}user/transaction/`);
  }

}
