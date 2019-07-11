import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStylesComponent } from './ad-styles.component';

describe('AdminStylesComponent', () => {
  let component: AdminStylesComponent;
  let fixture: ComponentFixture<AdminStylesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStylesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
