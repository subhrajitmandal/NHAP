import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermnconditionsComponent } from './termnconditions.component';

describe('TermnconditionsComponent', () => {
  let component: TermnconditionsComponent;
  let fixture: ComponentFixture<TermnconditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermnconditionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermnconditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
