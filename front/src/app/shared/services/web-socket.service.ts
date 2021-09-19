import { EventEmitter, Injectable, Output } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  @Output() outEven: EventEmitter<any> = new EventEmitter();
  @Output() iventeEven: EventEmitter<any> = new EventEmitter();
  @Output() messageEven: EventEmitter<any> = new EventEmitter();
  @Output() loggedinEven: EventEmitter<any> = new EventEmitter();
  socket: any;
  constructor() {
    this.socket = io.io(environment.api);
    this.listen()
  }

  listen = () => {
    this.socket.on('updateUserList', (res: any) => this.outEven.emit(res));
    this.socket.on('invite', (res: any) => this.iventeEven.emit(res));
    this.socket.on('message', (res: any) => this.messageEven.emit(res));
    this.socket.on('loggedin', (res: any) => this.loggedinEven.emit(res));
  }

  emitEvent = (event: string = '', payload: any = {}) => {
    this.socket.emit(event, payload)
  }
}


