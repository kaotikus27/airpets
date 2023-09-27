import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelrequestComponent } from './hotelrequest.component';

describe('HotelrequestComponent', () => {
  let component: HotelrequestComponent;
  let fixture: ComponentFixture<HotelrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelrequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
