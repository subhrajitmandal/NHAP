/**
 * @file: survey-payment.component.ts
 * @description: This file handles the payment for survey 
*/
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { SurveyDataHandlerService } from '../survey-data-handler.service';
import { SurveyPaymentService } from '../survey-payment.service';

@Component({
  selector: 'app-survey-payment',
  templateUrl: './survey-payment.component.html',
  styleUrls: ['./survey-payment.component.scss']
})
export class SurveyPaymentComponent implements OnInit, OnDestroy {

  surveyId: string;
  coinsExist: boolean;
  walletBalance: string;
  endSubscription: Subject<void>;
  rzp1:any;
  transactionComplete: boolean;

  constructor(private surveyDataService: SurveyDataHandlerService,
              private paymentService: SurveyPaymentService,
              private notification: MatSnackBar,
              private router: Router) { 
    this.surveyId = '';
    this.coinsExist = false;
    this.walletBalance = '0';
    this.endSubscription = new Subject<void>();
    this.transactionComplete = false;
  }

  /**
   * @function: ngOnInit
   * @description: This function handles the initialisation of the payment component
   * @param: null
   * @return: void 
  */
  ngOnInit(): void {

    // get survey id
    this.surveyDataService.surveyDataObs
    .pipe(
      takeUntil(this.endSubscription)
    )
    .subscribe( (surveyData) => {
      this.surveyId = surveyData.id;
      console.log(surveyData, "surveyData")
    });

    // get wallet status
    this.paymentService.getWalletBalance()
    .pipe(
      take(1)
    )
    .subscribe( (coinStatus) => {
        this.walletBalance = coinStatus.data;
        this.coinsExist = this.walletBalance >= '500' ? true : false;
    });

  }

  /**
   * @function: ngOnDestroy
   * @description: this function ends the subscription on leaving the component 
   * @param: null
   * @returns: void
  */
  ngOnDestroy(): void {
    this.endSubscription.next();
    this.endSubscription.complete();
  }

  /**
   * @function: payViaWallet
   * @description: This function handles payment via wallet if balance available
   * @param: null
   * @return: void 
  */
  payViaWallet(): void {

    const coinFormData: FormData = new FormData();
    coinFormData.append('survey_id', this.surveyId);
    coinFormData.append('amount', '500');

    this.paymentService.walletPayment(coinFormData)
    .pipe(
      take(1)
    )
    .subscribe( (orderStatus) => {
      if(orderStatus.success === 'true'){
        this.notification.open('Survey submitted successfully', 'Ok', {duration: 2500});
        this.transactionComplete = true;
      }
      else{
        this.notification.open('Some error occurred.', 'Ok', {duration: 2500});
      }
    })
  }

  /**
   * @function: payViaRazor
   * @description: This function handles the payment via razor pay for survey
   * @param: null
   * @return: void 
  */
  payViaRazor(): void {

    const coinFormData: FormData = new FormData();
    coinFormData.append('surveyId', this.surveyId);
    coinFormData.append('amount', '500');

    this.paymentService.createOrder(coinFormData)
    .pipe(
      take(1)
    )
    .subscribe( (orderStatus) => {
      if(orderStatus.success === 'true'){
        this.completeRazorPay(orderStatus.data.order_id, orderStatus.data.name, orderStatus.data.email, orderStatus.data.phone, orderStatus.data.order_amount.toString());
      }
      else{
        this.notification.open('Some error occurred. Please try again later', 'Ok', {duration: 2500});
      }

    });

  }

  /**
   * @function: completeRazorPay
   * @description: This function handles completes the transaction via razor pay
   * @param: orderId, name, email, phone
   * @return: void 
  */
   completeRazorPay(orderId: string, name: string, email: string, phone: string, amount: string): void { 

    const options: any = {
      key: 'rzp_live_8Ynasy34IwvnKB',
      amount: amount,
      currency: 'INR',
      name: 'NHAP',
      description: 'NHAP',
      image: '', // logo
      order_id: orderId,
      modal: { escape: false},
      prefill: { name: name, email: email, contact: phone},
      notes: {},
      theme: { color: "#3399cc"}
  };

  options.handler = ((response: any, error: any) => {
      options.response = response;
      console.log(response, "response");
      console.log(options, "options");
      // call your backend api to verify payment signature & capture transaction
      const transactionForm: FormData = new FormData();
      transactionForm.append('amount', amount);
      transactionForm.append('razorpay_order_id', response.razorpay_order_id);
      transactionForm.append('razorpay_payment_id', response.razorpay_payment_id);
      transactionForm.append('razorpay_signature', response.razorpay_signature);
      transactionForm.append('survey_id', this.surveyId);

      this.paymentService.receivePayment(transactionForm)
      .pipe(
          take(1)
      )
      .subscribe( (verifyStatus: any) => {
          if(verifyStatus.success === 'true'){
            this.notification.open('Survey submitted successfully', 'Ok', {duration: 2500});
            this.transactionComplete = true;
          }
          else{
            this.notification.open('Transaction unsuccessfull. Please try again.', 'Ok', {duration: 2500});
          }
      });
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    });
  this.rzp1 = new window.Razorpay(options);
  this.rzp1.open();
  }

  /**
   * @function: exportAsPDF
   * @description: This function saves the survey in a pdf and downloads it.
   * @param: null
   * @returns: void 
  */
  exportAsPDF(): void {
    this.surveyDataService.surveyPdfObs
    .pipe(
      take(1)
    )
    .subscribe((pdfObj) => {
      const doc = pdfObj;
      doc.save('SurveyData.pdf');
    })
  }

  /**
   * @function: navigateAway
   * @description: This function navigates to the user dashboard once the survey is complete.
   * @param: null
   * @returns: void 
  */
  navigateAway(): void {
    this.router.navigate(['../user/dashboard']);
  }
}
