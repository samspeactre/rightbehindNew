import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatDB } from './chat';

var today = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public observer!: Subscriber<{}>;
  public chat: any[] = []
  public users: any[] = []

  constructor() {
    this.chat = ChatDB.chat
    this.users = ChatDB.chatUser
  }

  // Get User Data
  public getUsers(): Observable<any> {
    const users = new Observable(observer => {
      observer.next(this.users);
      observer.complete();
    });
    return <Observable<any>>users;
  }

  // Get cuurent user
  public getCurrentUser() {
    return this.getUsers().pipe(map(users => {
      return users.find((item:any) => {
        return item.authenticate === 0;
      });
    }));
  }

  // chat to user
  public chatToUser(id: number) {
    return this.getUsers().pipe(map(users => {
      return users.find((item:any) => {
        return item.id === id;
      });
    }));
  }

  // Get users chat
  public getUserChat(): Observable<any> {
    const chat = new Observable(observer => {
      observer.next(this.chat);
      observer.complete();
    });
    return <Observable<any>>chat;
  }

  // Get chat History
  public getChatHistory(id: number) {
    return this.getUserChat().pipe(map(users => {
      return users.find((item:any) => {
        return item.id === id;
      });
    }));
  }

  // Send Message to user
  public sendMessage(chat:any) {
    this.chat.filter(chats => {
      if (chats.id == chat.receiver) {
        chats.message.push({ sender: chat.sender, time: today.toLowerCase(), text: chat.message })
        // setTimeout(function () {
        //   document.querySelector(".chat-history").scrollBy({ top: 200, behavior: 'smooth' });
        // }, 310)
        this.responseMessage(chat)
      }
    })
  }

  public responseMessage(chat:any) {

    this.chat.filter(chats => {
      if (chats.id == chat.receiver) {
        setTimeout(() => {
          chats.message.push({ sender: chat.receiver, time: today.toLowerCase(), text: 'Hey This is ' + chat.receiver_name + ', Sorry I busy right now, I will text you later' })
        }, 2000);
        setTimeout(function () {
          // document.querySelector(".chat-history").scrollBy({ top: 200, behavior: 'smooth' });
        }, 2310)
      }
    })
  }

}
