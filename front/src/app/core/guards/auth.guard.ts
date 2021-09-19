import { Injectable } from '@angular/core';
import { CanActivate, } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService
  ) { }
  canActivate() {
    return this.authService.checkSession(true).then(a => {
      return true;
    }).catch(e => {
      return false;
    });
  }

}
