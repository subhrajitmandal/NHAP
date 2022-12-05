import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyCommonComponent } from './survey-common.component';

describe('SurveyCommonComponent', () => {
  let component: SurveyCommonComponent;
  let fixture: ComponentFixture<SurveyCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyCommonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
