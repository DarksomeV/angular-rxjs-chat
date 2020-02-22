import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Message} from './message.model';
import {User} from '../user/user.model';
import {Thread} from '../thread/thread.model';
import {filter, publishReplay, refCount, scan} from 'rxjs/operators';

const initialMessages: Message[] = [];

interface IMessagesOperation extends Function {
  (messages: Message[]): Message[];
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  // a stream that publishes new messages only once
  newMessages: Subject<Message> = new Subject<Message>();

  // `messages` is a stream that emits an array of the most up to date messages
  messages: Observable<Message[]>;

  // `updates` receives _operations_ to be applied to our `messages`
  // it's a way we can perform changes on *all* messages (that are currently // stored in `messages`)
  updates: Subject<any> = new Subject<any>();


  constructor() {
    this.messages = this.updates.pipe(
      scan((messages: Message[], operation: IMessagesOperation) => operation(messages), initialMessages),
      publishReplay(1),
      refCount()
    );

  }

  addMessage(message: Message): void {
    this.newMessages.next(message);
  }

  messagesForThreadUser(thread: Thread, user: User): Observable<Message> {
    return this.newMessages.pipe(
      filter((message: Message) => { // belongs to this thread
        return (message.thread.id === thread.id) && (message.author.id !== user.id); // and isn't authored by this user
      }));
  }

}
