import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket$!: WebSocketSubject<any>;
  public receivedData: any[] = [];
  public notificationSubject: Subject<any> = new Subject<any>();
  public notificationCount: Subject<any> = new Subject<any>();



  public connect(user_id:string): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket("ws://localhost:8000/ws/"+user_id);
      this.socket$.subscribe((data: any) => {
        this.notificationSubject.next(data);
        console.log(this.receivedData)
      });
    }
  }

  sendMessage(message: string) {
    this.socket$.next({ message });
  }

  close() {
    this.socket$.complete();
  }
}
