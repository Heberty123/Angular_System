import { Injectable } from '@angular/core';
import {CompatClient, Stomp} from '@stomp/stompjs';
import {StompSubscription} from '@stomp/stompjs/src/stomp-subscription';
import { ProductStock } from '../interfaces/ProductStock';

export type ListenerCallBack = (message: ProductStock[]) => void;

@Injectable({
  providedIn: 'root',
})
export class WebSocketStockService {

  private connection: CompatClient | undefined = undefined;

  private subscription: StompSubscription | undefined;

  constructor() {
      this.connection = Stomp.client('ws://localhost:8080/inventory-socket');
      this.connection.connect({}, () => {});
  }

  public send(task: Task): void {
    if (this.connection && this.connection.connected) {
      this.connection.send('/app/message', {}, JSON.stringify(task));
    }
  }

  public listen(fun: ListenerCallBack): void {
    if (this.connection) {
      this.connection.connect({}, () => {
        this.subscription = this.connection!.subscribe('/topic/stock', message => fun(JSON.parse(message.body)));
      }); 
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
