import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersLayoutComponent } from './users-layout.component';

describe('UserLayoutComponent', () => {
  let component: UsersLayoutComponent;
  let fixture: ComponentFixture<UsersLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
