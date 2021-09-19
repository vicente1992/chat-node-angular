import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menu: Array<any> = [
    {
      path: ['/', 'home'],
      icon: 'fas fa-comment-dots',
      name: 'Mensajes'
    },
    {
      path: ['/', 'home', 'users'],
      icon: 'fas fa-user',
      name: 'Usuarios'
    },
    {
      path: ['/', 'home', 'loans'],
      icon: 'fas fa-user-friends',
      name: 'Usuarios'
    },
    {
      path: ['/', 'home', 'payments'],
      icon: 'fas fa-envelope',
      name: 'Email'
    },
    {
      path: ['/', 'home', 'payments'],
      icon: 'fas fa-cog',
      name: 'Configuración'
    }
  ]
  user!: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private webSocketService: WebSocketService,
  ) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser();
  }

  logout() {
    this.authService.logout().then(() => {
      this.webSocketService.emitEvent('logout', this.user)
      this.router.navigate(['/', 'auth'])
    })
  }

}
