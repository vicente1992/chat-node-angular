import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private url: string = environment.api;
  constructor(
    public http: HttpClient
  ) { }

  getConversation(hash: string = ''): Observable<any> {
    return this.http.get<any>(`${this.url}/conversation/${hash}`,)
      .pipe(
        catchError((e: any) => {
          console.log(e)
          return throwError(e);
        })
      );
  }

  createConversation(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/conversation`, data)
      .pipe(
        catchError((e: any) => {
          console.log(e)
          return throwError(e);
        })
      );
  }
}
