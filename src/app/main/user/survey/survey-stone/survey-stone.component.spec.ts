import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyStoneComponent } from './survey-stone.component';

describe('SurveyStoneComponent', () => {
  let component: SurveyStoneComponent;
  let fixture: ComponentFixture<SurveyStoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyStoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyStoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
