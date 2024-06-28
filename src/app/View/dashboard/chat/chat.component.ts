import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { selectUser } from '../../../Ngrx/data.reducer';
import { Store } from '@ngrx/store';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { HttpService } from '../../../Services/http.service';
import { faArrowLeft, faPaperPlane, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone:true,
  imports:[CommonModule,FormsModule, FontAwesomeModule,ReactiveFormsModule],
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  public users : any = []
  public searchUsers : any = []
  public chatUser : any;
  public chats : any;
  public chatText! : string;
  public error : boolean = false;
  public notFound: boolean = false;
  public searchText! : string;
  faSearch=faSearch;
  faPaperPlane=faPaperPlane
  faArrowLeft=faArrowLeft
  height: number = 0;
  width:number = window.innerWidth;
  user$ = this.store.select(selectUser);
  private destroy$ = new Subject<void>();
  user: any;
  contactId:any = null;
  recieverInfo:any;
  messages: any = [];
  showChat:boolean = window.innerWidth > 1024 ? true : false;
  showSidebar:boolean = window.innerWidth > 1024 ? true : false;
  messageForm = this.fb.group({
    message: ['', Validators.required],
  });
  constructor(private chatService: ChatService, private fb:FormBuilder, private http:HttpService, private store:Store, private router:Router, private activatedRoute:ActivatedRoute) {   
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
      this.activatedRoute.queryParams.subscribe((res:any)=>{
        this.contactId = res?.data?.id;
        this.recieverInfo = res?.data?.info;
        if(window.innerWidth <= 1024){
          if(res?.data){
            this.showChat = true;
            this.showSidebar = false;
          }
          else{
            this.showChat = false;
            this.showSidebar = true;
          }
        }
        console.log('====================================');
        console.log(res?.data?.id);
        console.log('====================================');
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
  selectChat(data:any) {
    this.router.navigate(['/dashboard/inquiries'], { queryParams: { data:JSON.stringify(data) } });
  }
  removeQueryParam() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        data: null
      },
      queryParamsHandling: 'merge' // keeps other query params untouched
    });
  }
  // User Chat
  public userChat(){    
    this.chatService.chatToUser(1).subscribe(chatUser => this.chatUser = chatUser)
    this.chatService.getChatHistory(1).subscribe(chats => this.chats = chats)
  }
  
  sendMessage() {
    const data = {
      chatContactId: this.contactId,
      message: this.messageForm.controls['message'].value
    }
    this.http.loaderPost('Chat/send', data, true).subscribe((response) => {
      this.messageForm.reset();
      this.messages.push({
        sender: this.user?.fullName,
        receiver: this.recieverInfo || null,
        text: data?.message,
        time: new Date()
      })
      setTimeout(() => {
        this.scrollToBottom();
      });
    })
  }
  getInquiry() {
    this.http.loaderGet(`Chat/get/${this.contactId}`, true, true).subscribe((response) => {
      this.recieverInfo = response?.modelList?.[0]?.chatContact?.buyer?.fullName
      response?.modelList?.map((item: any) => {
        this.messages.push({
          sender: item?.sender?.fullName,
          receiver: item?.chatContact?.buyer?.fullName,
          text: item?.message,
          time: item?.createdOn
        })
      })
      setTimeout(() => {
        this.scrollToBottom();
      });
    })
  }
  private scrollToBottom(): void {
    try {
      this.messagesContainer?.nativeElement.scrollTo({
        top: this.messagesContainer?.nativeElement.scrollHeight,
        behavior: 'smooth'
      });
    } catch (err) { }
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
