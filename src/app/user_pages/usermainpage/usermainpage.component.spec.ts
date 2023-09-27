import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermainpageComponent } from './usermainpage.component';

describe('UsermainpageComponent', () => {
  let component: UsermainpageComponent;
  let fixture: ComponentFixture<UsermainpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsermainpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsermainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
