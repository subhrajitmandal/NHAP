import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyDiagramComponent } from './survey-diagram.component';

describe('SurveyDiagramComponent', () => {
  let component: SurveyDiagramComponent;
  let fixture: ComponentFixture<SurveyDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyDiagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
