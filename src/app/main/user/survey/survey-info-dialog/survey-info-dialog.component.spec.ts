import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyInfoDialogComponent } from './survey-info-dialog.component';

describe('SurveyInfoDialogComponent', () => {
  let component: SurveyInfoDialogComponent;
  let fixture: ComponentFixture<SurveyInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});