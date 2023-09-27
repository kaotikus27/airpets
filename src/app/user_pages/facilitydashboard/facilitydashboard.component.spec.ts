import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitydashboardComponent } from './facilitydashboard.component';

describe('FacilitydashboardComponent', () => {
  let component: FacilitydashboardComponent;
  let fixture: ComponentFixture<FacilitydashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilitydashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilitydashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
