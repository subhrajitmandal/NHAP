import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPropertyComponent } from './survey-property.component';

describe('SurveyPropertyComponent', () => {
  let component: SurveyPropertyComponent;
  let fixture: ComponentFixture<SurveyPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
