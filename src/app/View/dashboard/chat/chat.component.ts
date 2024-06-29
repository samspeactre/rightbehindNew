import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPaperPlane, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { distinctUntilChanged, finalize, takeUntil } from 'rxjs/operators';
import { selectUser } from '../../../Ngrx/data.reducer';
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
  public chatUser: any;
  public chats: any;
  public chatText!: string;
  public error = false;
  public notFound = false;
  public searchText!: string;
  public faSearch = faSearch;
  public faPaperPlane = faPaperPlane;
  public faArrowLeft = faArrowLeft;
  public height = 0;
  public user$ = this.store.select(selectUser);
  public loader = false;
  public contactId: any = null;
  public recieverInfo: any;
  public propertyInfo: any;
  public messages: any[] = [];
  public showChat = window.innerWidth > 1024;
  public showSidebar = window.innerWidth > 1024;
  public user:any
  private destroy$ = new Subject<void>();

  messageForm = this.fb.group({
    message: ['', Validators.required],
  });

  constructor(
    private resize: ResizeService, 
    private fb: FormBuilder, 
    private http: HttpService, 
    private store: Store, 
    private router: Router, 
    private activatedRoute: ActivatedRoute
  ) {
    this.user$.pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged()
    ).subscribe((user:any) => this.user = user);

    this.activatedRoute.queryParams.pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged()
    ).subscribe((res:any) => {
      const routeData = res?.data ? JSON.parse(res?.data) : null;
      this.contactId = routeData?.contactId;
      this.recieverInfo = routeData?.sender;
      this.propertyInfo = routeData?.property;
      
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
      sender: { fullName: data?.sender?.fullName, imageUrl: data?.sender?.imageUrl },
      contactId: data?.chat?.chatContactId
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
}
