import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyUploadComponent } from './survey-upload.component';

describe('SurveyUploadComponent', () => {
  let component: SurveyUploadComponent;
  let fixture: ComponentFixture<SurveyUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
