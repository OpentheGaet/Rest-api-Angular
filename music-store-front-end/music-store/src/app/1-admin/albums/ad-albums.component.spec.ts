import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAlbumsComponent } from './ad-albums.component';

describe('AdminAlbumsComponent', () => {
  let component: AdminAlbumsComponent;
  let fixture: ComponentFixture<AdminAlbumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAlbumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
