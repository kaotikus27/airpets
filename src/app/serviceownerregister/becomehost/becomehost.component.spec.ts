import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomehostComponent } from './becomehost.component';

describe('BecomehostComponent', () => {
  let component: BecomehostComponent;
  let fixture: ComponentFixture<BecomehostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BecomehostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BecomehostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
