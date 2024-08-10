import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminComponent } from './admin/admin.component';
import { MySchemeComponent } from './my-scheme/my-scheme.component';
import { AgricultureComponent } from './agriculture/agriculture.component';
import { EducationComponent } from './education/education.component';
import { TransportComponent } from './transport/transport.component';
import { WomenComponent } from './women/women.component';
import { SocialComponent } from './social/social.component';
import { BussinessComponent } from './bussiness/bussiness.component';
import { SchemeDetailsComponent } from './scheme-details/scheme-details.component';

const routes: Routes = [
  {
    path: "",
    component: UserAuthComponent
  },
  {
    path: 'seller-auth',
    component: SellerAuthComponent
  }
  ,
  {
    path: 'home',
    component: HomeComponent
  }
  ,
  {
    path: 'seller-home',
    component: SellerHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-scheme',
    component: SellerAddProductComponent,
  },
  {
    path: 'seller-update-product/:id',
    component: SellerUpdateProductComponent,
    canActivate: [AuthGuard]
  },
  {
    component: SearchComponent,
    path: 'search/:query'
  },
  {
    component: ProductDetailsComponent,
    path: 'detail/:productId'
  },
  {
    component: UserAuthComponent,
    path: 'user-auth'
  },
  {
    component: CartPageComponent,
    path: 'cart-page'
  },
  {
    component: CheckoutComponent,
    path: 'checkout'
  },
  {
    component: MyOrdersComponent,
    path: 'my-orders'
  }
  ,
  {
    component: AdminComponent,
    path: 'admin'
  }
  ,
  {
    component: MySchemeComponent,
    path: 'my-scheme'
  }
  ,
  {
    component: AgricultureComponent,
    path: 'agriculture'
  }
  ,
  {
    component: EducationComponent,
    path: 'education'
  }
  ,
  {
    component: TransportComponent,
    path: 'transport'
  }
  ,
  {
    component: WomenComponent,
    path: 'women'
  }
  ,
  {
    component: SocialComponent,
    path: 'social'
  }
  ,
  {
    component: BussinessComponent,
    path: 'bussiness'
  },
  {
    component: SchemeDetailsComponent,
    path: 'details/:schemeId'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
