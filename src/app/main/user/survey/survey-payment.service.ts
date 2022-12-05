/**
 * @file: survey-payment.service.ts
 * @description: This file handles the payment system for survey 
*/
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SurveyPaymentService {

  constructor(private http: HttpClient) { }

  /**
   * @function: getWalletCoin
   * @description: This function gets the status of the coins available in wallet
   * @param: null
   * @returns: Observable
  */
  getWalletBalance(): Observable<any> {
    return this.http.get(`${environment.apiUrl}user/wallet/balance/`);
  }

  /**
   * @function: createOrder
   * @description: This function creates the order and if wallet payment then completes the payment as well.
   * @param: coinForm
   * @returns: Observable
  */
   walletPayment(coinForm: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}user/payment/wallet/`, coinForm);
  }

  /**
   * @function: createOrder
   * @description: This function creates the order and if wallet payment then completes the payment as well.
   * @param: coinForm
   * @returns: Observable
  */
  createOrder(coinForm: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}user/payment/razorpay/`, coinForm);
  }

  /**
   * @function: receivePayment
   * @description: This function validates the payment via razor pay and verifies it in api
   * @param: payForm
   * @returns: Observable
  */
  receivePayment(payForm: FormData): Observable<any> {
    return this.http.put(`${environment.apiUrl}user/payment/razorpay/`, payForm);
  }

}
