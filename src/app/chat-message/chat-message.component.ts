import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../message/message.model';
import {User} from '../user/user.model';
import {UsersService} from '../user/user.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  @Input() message: Message;
  currentUser: User;
  incoming: boolean;

  constructor(public usersService: UsersService) { }

  ngOnInit() {
    this.usersService.currentUser
      .subscribe(
        (user: User) => {
          this.currentUser = user;
          if (this.message.author && user) {
            this.incoming = this.message.author.id !== user.id; }
        });
  }

}