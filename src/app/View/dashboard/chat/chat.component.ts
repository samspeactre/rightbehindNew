import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft, faEllipsisVertical, faPaperPlane, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, takeUntil } from 'rxjs/operators';
import { selectUser } from '../../../Ngrx/data.reducer';
import { assetUrl } from '../../../Services/helper.service';
import { HttpService } from '../../../Services/http.service';
import { ResizeService } from '../../../Services/resize.service';
import { MiniLoadingComponent } from '../../../SharedComponents/loaders/mini-loader/mini-loading.component';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, ReactiveFormsModule, MiniLoadingComponent],
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  public users: any[] = [];
  public searchUsers: any[] = [];
  public originalsearchUsers: any;
  public chatUser: any;
  public chats: any;
  public chatText!: string;
  public error = false;
  public notFound = false;
  public searchText!: string;
  searchQueryUpdate = new Subject<any>();
  public faSearch = faSearch;
  public faPaperPlane = faPaperPlane;
  public faArrowLeft = faArrowLeft;
  public faEye = faEye;
  public faTrash = faTrash;
  public faEllipsisVertical = faEllipsisVertical;
  public height = 0;
  public user$ = this.store.select(selectUser);
  public loader = false;
  public contactId: any = null;
  public recieverInfo: any;
  public propertyInfo: any;
  public messages: any[] = [];
  public showChat = window.innerWidth > 1024;
  public showSidebar = window.innerWidth > 1024;
  public user: any;
  src = assetUrl
  private destroy$ = new Subject<void>();
  messageForm = this.fb.group({
    message: ['', Validators.required],
  });
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.removeQueryParam()
  }
  constructor(
    private resize: ResizeService,
    private fb: FormBuilder,
    private http: HttpService,
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.searchQueryUpdate
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        this.filterChat(value)
      });
    this.user$.pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged()
    ).subscribe((user: any) => this.user = user);

    this.activatedRoute.queryParams.pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged()
    ).subscribe((res: any) => {
      const routeData = res?.data ? JSON.parse(res?.data) : null;
      this.contactId = routeData?.contactId;
      this.recieverInfo = routeData?.sender;
      this.propertyInfo = routeData?.property;
      console.log(this.propertyInfo);
      
      if (this.contactId) this.getInquiry();

      this.updateChatSidebarVisibility();
    });
  }

  ngOnInit() {
    this.getInquiries();
    this.getHeight();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.getHeight();
  }

  private updateChatSidebarVisibility() {
    if (window.innerWidth > 1024) {
      this.showChat = true;
      this.showSidebar = true;
    } else {
      this.showChat = !!this.contactId;
      this.showSidebar = !this.contactId;
    }
  }

  private getInquiries() {
    this.http.loaderGet('ChatContact/get', true, true).pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged()
    ).subscribe(response => {
      this.searchUsers = response?.modelList || [];
      this.originalsearchUsers = response?.modelList || [];
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getHeight() {
    const element = document.querySelector('.fixedHeight');
    if (element) this.height = element.clientHeight;
  }

  selectChat(data: any) {
    const routeData = {
      property: {
        id: data?.property?.id,
        title: data?.property?.title,
        type: data?.property?.propertyType
      },
      sender: { fullName: data?.sender?.fullName, imageUrl: data?.sender?.imageUrl && assetUrl + data?.sender?.imageUrl },
      contactId: data?.id
    };
    this.router.navigate(['/dashboard/inquiries'], { queryParams: { data: JSON.stringify(routeData) } });
  }

  removeQueryParam() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { data: null },
      queryParamsHandling: 'merge'
    });
  }

  sendMessage() {
    const message = this.messageForm.controls['message'].value;
    const data = { chatContactId: this.contactId, message };
    this.http.loaderPost('Chat/send', data, true).subscribe(() => {
      this.messageForm.reset();
      this.messages.push({
        sender: this.user?.fullName,
        receiver: this.recieverInfo?.fullName || null,
        imageUrl: this.user?.imageUrl || null,
        text: message,
        time: new Date()
      });
      setTimeout(() => this.scrollToBottom());
    });
  }

  private getInquiry() {
    this.loader = true;
    this.http.get(`Chat/get/${this.contactId}`, true, true).pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged(),
      finalize(() => this.loader = false)
    ).subscribe(response => {
      this.messages = response?.modelList?.map((item: any) => ({
        sender: item?.sender?.fullName,
        receiver: this.user?.fullName,
        imageUrl: item?.sender?.imageUrl || null,
        text: item?.message,
        time: item?.createdOn
      })) || [];
      setTimeout(() => this.scrollToBottom());
    });
  }

  private scrollToBottom(): void {
    this.messagesContainer?.nativeElement.scrollTo({
      top: this.messagesContainer.nativeElement.scrollHeight,
      behavior: 'smooth'
    });
  }

  searchTerm(term: string) {
    // Add your search logic here
  }
  route() {
    this.router.navigate(
      ['/preview'],
      { queryParams: { id: this.propertyInfo?.id, type: this.propertyInfo?.propertyType || this.propertyInfo?.type } }
    );
  }
  // deleteChat(){
  //   this.http.loaderPost('ChatContact/delete',{id:this.contactId},true).subscribe((response)=>{
  //     this.removeQueryParam();
  //     const index = this.searchUsers.findIndex(user => user.id === this.contactId);
  //       if (index !== -1) {
  //         this.searchUsers.splice(index, 1);
  //       }
  //   })
  // }
  private filterChat(searchTerm: string): void {
    console.log(searchTerm,'search reuly');
    
    if (!searchTerm) {
      this.searchUsers = this.originalsearchUsers;
    } else {
      this.searchUsers = this.originalsearchUsers.filter((inquiry: any) =>
        (inquiry?.sender?.fullName && inquiry?.sender?.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (inquiry?.chat?.message && inquiry?.chat?.message.toLowerCase().includes(searchTerm.toLowerCase()))
     );
    }
  }
}
