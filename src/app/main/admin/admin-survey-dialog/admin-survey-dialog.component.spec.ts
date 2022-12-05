import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSurveyDialogComponent } from './admin-survey-dialog.component';

describe('AdminSurveyDialogComponent', () => {
  let component: AdminSurveyDialogComponent;
  let fixture: ComponentFixture<AdminSurveyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSurveyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSurveyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
