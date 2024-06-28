import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { selectUser } from '../../../Ngrx/data.reducer';
import { Store } from '@ngrx/store';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { HttpService } from '../../../Services/http.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  standalone:true,
  imports:[CommonModule,FormsModule, FontAwesomeModule,ReactiveFormsModule],
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public users : any = []
  public searchUsers : any = []
  public chatUser : any;
  public chats : any;
  public chatText! : string;
  public error : boolean = false;
  public notFound: boolean = false;
  public searchText! : string;
  faSearch=faSearch
  height: number = 0;
  user$ = this.store.select(selectUser);
  private destroy$ = new Subject<void>();
  user: any;
  constructor(private chatService: ChatService, private http:HttpService, private store:Store) {   
    this.chatService.getUsers().subscribe(users => { 
      this.searchUsers = users
      this.users = users
    })
    this.user$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((user) => {
        console.log(user);
        
        this.user = user
      })
  }
  ngOnInit() { 
    this.getInquiries()
    this.getHeight()
  }
  getInquiries(){
    this.http.loaderGet('ChatContact/get',true,true).subscribe((response)=>{
      this.searchUsers = response?.modelList;
    })
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getHeight() {
    var element: any = document.getElementsByClassName('fixedHeight')[0]
    if (element) {
      this.height = element.offsetHeight;
    }
  }
  // User Chat
  public userChat(){    
    this.chatService.chatToUser(1).subscribe(chatUser => this.chatUser = chatUser)
    this.chatService.getChatHistory(1).subscribe(chats => this.chats = chats)
  }
  
  // Send Message to User
  public sendMessage(form:any) {
    // this.error = false
    // let chat = {
    //   sender: this.profile.id,
    //   receiver: this.chatUser.id,
    //   receiver_name: this.chatUser.name,
    //   message: form.value.message
    // }
    // this.chatService.sendMessage(chat) 
    // this.chatText = ''
    // this.chatUser.seen = 'online'
    // this.chatUser.online = true
  }

  searchTerm(term: any) {
    // if(!term) return this.searchUsers = this.users
    // term = term.toLowerCase();
    // let user:any = []
    // this.users.filter((users:any) => {
    //   if(users.name.toLowerCase().includes(term)) {
    //     user.push(users)
    //   } 
    // })
    // this.searchUsers = user
  }
}
