import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsVComponent } from './products-v.component';

describe('ProductsVComponent', () => {
  let component: ProductsVComponent;
  let fixture: ComponentFixture<ProductsVComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsVComponent]
    });
    fixture = TestBed.createComponent(ProductsVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
