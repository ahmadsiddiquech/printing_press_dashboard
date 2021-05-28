import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriesModalComponent } from './subcategories-modal.component';

describe('SubcategoriesModalComponent', () => {
  let component: SubcategoriesModalComponent;
  let fixture: ComponentFixture<SubcategoriesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategoriesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoriesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
