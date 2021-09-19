import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from '../../../../shared/services/web-socket.service';
import { User } from '../../../auth/models/auth.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { Message, Chat } from '../../model/message.interface';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
  @Input() data!: Chat;
  message = '';
  messageList: Message[] = [];
  listSubscribers: Subscription[] = [];
  user!: User;
  constructor(
    private webSocketService: WebSocketService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.listObserver();
    this.user = this.authService.currentUser();
  }
  ngOnDestroy(): void {
    this.listSubscribers.map((s) => s.unsubscribe());
  }
  listObserver() {
    const observer1$ = this.webSocketService.messageEven.subscribe(res => {
      this.messageList.push({ ...res })
    })
    const observer2$ = this.webSocketService.iventeEven.subscribe(res => {
      this.messageList = [];
    })
    this.listSubscribers = [observer1$, observer2$];
  }
  sendMessage() {
    if (!this.message.trim()) return
    const message = {
      room: this.data.room,
      user: this.user,
      from: this.user.id,
      message: this.message,
      date: moment().format('DD-MM LT')
    }
    this.webSocketService.emitEvent('message', message)
    this.message = '';
  }



}
