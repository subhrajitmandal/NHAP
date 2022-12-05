import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPaymentComponent } from './survey-payment.component';

describe('SurveyPaymentComponent', () => {
  let component: SurveyPaymentComponent;
  let fixture: ComponentFixture<SurveyPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
