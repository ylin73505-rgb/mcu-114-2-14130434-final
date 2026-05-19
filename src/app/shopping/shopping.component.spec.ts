import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { vi } from 'vitest';

import { ShoppingComponent } from './shopping.component';
import { CartService } from '../cart.service';

describe('ShoppingComponent', () => {
  let component: ShoppingComponent;
  let fixture: ComponentFixture<ShoppingComponent>;
  let cartService: CartService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingComponent],
    }).compileComponents();

    cartService = TestBed.inject(CartService);
    router = TestBed.inject(Router);
    vi.spyOn(cartService, 'getItems').mockReturnValue({
      Book: { quantity: 1, price: 100 },
    });
    vi.spyOn(cartService, 'clearCart');
    vi.spyOn(router, 'navigate');

    fixture = TestBed.createComponent(ShoppingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require basic info before allowing submit', () => {
    expect(component.canSubmit()).toBeFalsy();

    component.updateCustomerName('測試姓名');
    component.updateCustomerAddress('測試地址');
    component.updateCustomerPhone('0912345678');

    expect(component.canSubmit()).toBeTruthy();
  });

  it('should not submit when basic info is incomplete', () => {
    component.submitOrder();

    expect(cartService.clearCart).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
