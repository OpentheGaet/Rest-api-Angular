import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConnectorComponent } from './admin-connector.component';

describe('AdminConnectorComponent', () => {
  let component: AdminConnectorComponent;
  let fixture: ComponentFixture<AdminConnectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminConnectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConnectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
