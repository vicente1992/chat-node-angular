import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { WebSocketService } from '../../../../shared/services/web-socket.service';
import { User } from '../../../auth/models/auth.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { Subscription } from 'rxjs';
import { Chat } from '../../model/message.interface';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.scss']
})
export class CardUserComponent implements OnInit, OnDestroy {

  @Input() data: User[] = [];
  @Output() conversation: EventEmitter<Chat> = new EventEmitter();
  user!: User;
  listSubscribers: Subscription[] = [];
  constructor(
    private webSocketService: WebSocketService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser();
    this.listObserver();
  }
  ngOnDestroy(): void {
    this.listSubscribers.map((s) => s.unsubscribe());
  }

  listObserver() {
    const observer1$ = this.webSocketService.iventeEven.subscribe(res => {
      this.webSocketService.emitEvent('joinRoom', res)
      this.conversation.emit(res)
    })

    this.listSubscribers = [observer1$];
  }

  createRoom(userTo: User) {
    const { id = '', hash = '' } = userTo;
    const payload: Chat = {
      to: id,
      from: this.user.id,
      hash,
      room: Date.now(),
      userTo,
      userFrom: this.user
    }
    this.webSocketService.emitEvent('createRoom', payload)
    this.conversation.emit(payload)

  }

}
