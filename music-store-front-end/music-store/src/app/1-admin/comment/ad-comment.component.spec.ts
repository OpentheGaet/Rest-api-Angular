import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminCommentComponent } from './ad-comment.component';

describe('AdminCommentComponent', () => {
  let component: AdminCommentComponent;
  let fixture: ComponentFixture<AdminCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
