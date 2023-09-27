import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelpreviewComponent } from './hotelpreview.component';

describe('HotelpreviewComponent', () => {
  let component: HotelpreviewComponent;
  let fixture: ComponentFixture<HotelpreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelpreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
