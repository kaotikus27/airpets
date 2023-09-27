import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterOtherpageComponent } from './footer-otherpage.component';

describe('FooterOtherpageComponent', () => {
  let component: FooterOtherpageComponent;
  let fixture: ComponentFixture<FooterOtherpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterOtherpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterOtherpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
