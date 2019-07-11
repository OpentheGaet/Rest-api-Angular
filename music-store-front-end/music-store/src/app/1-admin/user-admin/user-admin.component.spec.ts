import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserAdminComponent } from './user-admin.component';

describe('AdminUserAdminComponent', () => {
  let component: AdminUserAdminComponent;
  let fixture: ComponentFixture<AdminUserAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
