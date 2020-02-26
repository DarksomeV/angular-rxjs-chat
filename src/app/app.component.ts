import { Component } from '@angular/core';
import {UsersService} from './user/user.service';
import {ChatExampleData} from './data/chat-example-data';
import {ThreadsService} from './thread/threads.service';
import {MessagesService} from './message/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public messagesService: MessagesService,
              public threadsService: ThreadsService,
              public usersService: UsersService) {
    ChatExampleData.init(messagesService, threadsService, usersService);
  }
}
