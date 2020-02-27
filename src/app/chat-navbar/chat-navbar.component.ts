import { Component, OnInit } from '@angular/core';
import {Message} from '../message/message.model';
import {ThreadsService} from '../thread/threads.service';
import {MessagesService} from '../message/messages.service';
import {Thread} from '../thread/thread.model';
import {combineLatest} from 'rxjs/operators';
import * as _ from 'lodash';


@Component({
  selector: 'app-chat-navbar',
  templateUrl: './chat-navbar.component.html',
  styleUrls: ['./chat-navbar.component.scss']
})
export class ChatNavbarComponent implements OnInit {
  unreadMessagesCount: number;

  constructor(public messagesService: MessagesService,
              public threadsService: ThreadsService) {
  }

  ngOnInit(): void {
    this.messagesService.messages.pipe(
      combineLatest(this.threadsService.currentThread,
        (messages: Message[], currentThread: Thread) => {
        return [currentThread, messages];
        })
    ).subscribe(([currentThread, messages]: [Thread, Message[]]) => {
        this.unreadMessagesCount =
          _.reduce(
            messages,
            (sum: number, m: Message) => {
              const messageIsInCurrentThread: boolean = m.thread &&
                currentThread &&
                (currentThread.id === m.thread.id);
              // note: in a "real" app you should also exclude
              // messages that were authored by the current user b/c they've
              // already been "read"
              if (m && !m.isRead && !messageIsInCurrentThread) {
                sum = sum + 1;
              }
              return sum;
            },
            0);
      });
  }
}
