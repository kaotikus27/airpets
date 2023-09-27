import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomemahostComponent } from './becomemahost.component';

describe('BecomemahostComponent', () => {
  let component: BecomemahostComponent;
  let fixture: ComponentFixture<BecomemahostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BecomemahostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BecomemahostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
