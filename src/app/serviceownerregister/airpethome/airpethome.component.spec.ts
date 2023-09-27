import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirpethomeComponent } from './airpethome.component';

describe('AirpethomeComponent', () => {
  let component: AirpethomeComponent;
  let fixture: ComponentFixture<AirpethomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirpethomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirpethomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
