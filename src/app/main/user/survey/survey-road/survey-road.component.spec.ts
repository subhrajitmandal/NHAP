import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyRoadComponent } from './survey-road.component';

describe('SurveyRoadComponent', () => {
  let component: SurveyRoadComponent;
  let fixture: ComponentFixture<SurveyRoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyRoadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyRoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
