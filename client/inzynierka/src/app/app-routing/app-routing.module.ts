import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from '../components/login/login.component';
import {RegisterComponent} from '../components/register/register.component';
import {ShopCartComponent} from '../components/shop-cart/shop-cart.component';
import {AccountComponent} from '../components/account/account.component';
import {AddressComponent} from '../components/address/address.component';
import {ProductViewComponent} from '../components/product-view/product-view.component';
import {AddProductComponent} from '../components/add-product/add-product.component';
import {MyProductsComponent} from '../components/my-products/my-products.component';
import {ProductListComponent} from '../components/shop-cart/product-list/product-list.component';
import {CategoryProductListComponent} from '../components/shop-cart/category-product-list/category-product-list.component';
import {PriceProductListComponent} from '../components/shop-cart/price-product-list/price-product-list.component';
import {SearchProductListComponent} from '../components/shop-cart/search-product-list/search-product-list.component';
import {MainCartComponent} from '../components/main-cart/main-cart.component';
import {ResetPasswordComponent} from '../components/reset-password/reset-password.component';
import {ResetComponent} from '../components/reset/reset.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/shop',
    pathMatch: 'full'
  },
  {
    path: 'shop',
    component: ShopCartComponent,
    children: [
      {
        path: '',
        component: ProductListComponent
      },
      {
        path: 'category/:id',
        component: CategoryProductListComponent
      },
      {
        path: 'price',
        component: PriceProductListComponent
      },
      {
        path: 'search',
        component: SearchProductListComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'account/address',
    component: AddressComponent
  },
  {
    path: 'products/:id',
    component: ProductViewComponent
  },
  {
    path: 'account/add-product',
    component: AddProductComponent
  },
  {
    path: 'account/my-products',
    component: MyProductsComponent
  },
  {
    path: 'cart',
    component: MainCartComponent
  },
  {
    path: 'login/resetpassword',
    component: ResetComponent
  },
  {
    path: 'login/resetpassword/:token',
    component: ResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
