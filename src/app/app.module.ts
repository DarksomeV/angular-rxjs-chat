import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatNavbarComponent } from './chat-navbar/chat-navbar.component';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { UsersService } from './user/user.service';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { MessagesService } from './message/messages.service';
import { ThreadsService } from './thread/threads.service';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import {FormsModule} from '@angular/forms';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import {FromNowPipe} from './pipes/from-now.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ChatNavbarComponent,
    ChatThreadsComponent,
    ChatWindowComponent,
    ChatPageComponent,
    ChatThreadComponent,
    ChatMessageComponent,
    FromNowPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [UsersService, MessagesService, ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
