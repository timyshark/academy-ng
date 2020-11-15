import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentsFooterComponent } from './students-footer.component';


describe('StudentsFooterComponent', () => {
  let component: StudentsFooterComponent;
  let fixture: ComponentFixture<StudentsFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
