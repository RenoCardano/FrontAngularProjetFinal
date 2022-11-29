import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGard implements CanActivate{

  constructor(private authService : AuthService,
              private router : Router) {}

  // @ts-ignore
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  )  {
  if(this.authService.isAuth){
      return true
  } else {
    this.router.navigate(['/auth'])
  }
  }
}
