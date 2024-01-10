import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$: Subject<any> = new Subject();

  constructor() {}

  public connect(connectionString: string) {
    this.socket$ = webSocket(connectionString);
  }

  public sendMessage(message: any): void {
    this.socket$?.next(message);
  }

  public getMessageStream(): Observable<any> {
    return this.socket$.asObservable();
  }

  public closeConnection(): void {
    this.socket$?.complete();
  }
}
