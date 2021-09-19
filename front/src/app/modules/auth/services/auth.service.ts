import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import * as faker from 'faker';
import { User } from '../models/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private cookieService: CookieService,
    private router: Router,
  ) { }

  login(data = {}) {
    const user = {
      ...data,
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber()
    }
    return user
  }

  setterUser(data: User) {
    this.cookieService.set(
      'user',
      JSON.stringify(data),
      environment.daysTokenExpire,
      '/');
  }

  currentUser = () => {
    try {
      return (this.cookieService.get('user')) ? JSON.parse(this.cookieService.get('user')) : null;
    } catch (e) {
      return null
    }
  }
  redirectLogin = () => {
    this.router.navigate(['/', 'auth']);
  }


  private clear = () => {
    this.cookieService.delete('user', '/');
  }


  checkSession = (redirect = true) => {
    return new Promise((resolve, reject) => {
      if (this.cookieService.check('user')) {
        const user = this.currentUser();
        if (user) {
          this.setterUser(user)
          resolve(true);
        } else {
          this.clear();
          this.redirectLogin();
        }
        resolve(true);
      } else {
        redirect ? this.redirectLogin() : null;
        reject(false);
      }
    }
    );
  };


  logout = () => new Promise((resolve, reject) => {
    try {
      this.clear();
      resolve(true);
    } catch (e) {
      reject(false);
    }
  });
}
