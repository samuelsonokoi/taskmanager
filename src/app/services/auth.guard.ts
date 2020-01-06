import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private _auth: AuthService, private _router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let url: string = state.url;

    return this.checkLogin(url);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canActivate(next, state);
  }

  checkLogin(url: string): boolean {
    if (this._auth.authenticated()) {
      return true;
    }

    // Store the attempted URL for redirecting
    // this._auth.redirectUrl = url

    // Create a dummy session id
    // let sessionId = 123456789;

    // Set our navigation extras object that contains our global query params and fragment
    // let navigationExtras: NavigationExtras = {
    //   queryParams: { 'session_id': sessionId },
    //   queryParamsHandling: 'preserve',
    //   fragment: this._auth.redirectUrl
    // };

    // Navigate to the login page
    this._router.navigate(["/"]);

    return false;
  }
}
