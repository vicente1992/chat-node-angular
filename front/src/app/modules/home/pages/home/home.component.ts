import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../../../shared/services/web-socket.service';
import { User } from '../../../auth/models/auth.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  listSubscribers: Subscription[] = [];
  listUser: User[] = []
  user!: User;
  conversation: any;
  constructor(
    private webSocketService: WebSocketService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.listObserver();
    this.user = this.authService.currentUser();
    this.webSocketService.emitEvent('loggedin', this.user)
  }
  ngOnDestroy(): void {
    this.listSubscribers.map((s) => s.unsubscribe());
  }
  listObserver() {
    const observer1$ = this.webSocketService.outEven.subscribe(res => {
      this.listUser = res;
      this.listUser = this.listUser.filter(user => user.id !== this.user.id)
    })

    this.listSubscribers = [observer1$];
  }
  getConversation(data: any) {
    this.conversation = data;
  }


}
