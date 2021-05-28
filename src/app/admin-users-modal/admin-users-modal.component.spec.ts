import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersModalComponent } from './admin-users-modal.component';

describe('AdminUsersModalComponent', () => {
  let component: AdminUsersModalComponent;
  let fixture: ComponentFixture<AdminUsersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUsersModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
