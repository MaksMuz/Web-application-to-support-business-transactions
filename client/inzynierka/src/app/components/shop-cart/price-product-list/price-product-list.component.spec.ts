import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceProductListComponent } from './price-product-list.component';

describe('PriceProductListComponent', () => {
  let component: PriceProductListComponent;
  let fixture: ComponentFixture<PriceProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceProductListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
