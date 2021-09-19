import { User } from '../../auth/models/auth.interface';


export interface Message {
  date: string;
  from: number;
  message: string;
  room: number;
  user: User;
}


export interface Chat {
  from: number;
  hash: string;
  room: number;
  to: number | string;
  userFrom: User;
  userTo: User;
}
