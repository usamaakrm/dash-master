import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { SellerService } from './services/seller.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private sellerService: SellerService) { }
  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
//  to navigate to user after login
    if (localStorage.getItem('seller')) {
      return true
    }

    return this.sellerService.isSellerLoggedIn;
  };
}
