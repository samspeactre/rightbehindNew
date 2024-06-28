import { CommonModule, Location } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from '../../../Services/http.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { selectUser } from '../../../Ngrx/data.reducer';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-chat-inner',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, FormsModule],
  templateUrl: './chat-inner.component.html',
  styleUrl: './chat-inner.component.scss'
})
export class ChatInnerComponent {
  faArrowLeft = faArrowLeft;
  faPaperPlane = faPaperPlane;
  height: number = 0;
  width = window.innerWidth;
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.getHeight();
  }
  messageForm = this.fb.group({
    message: ['', Validators.required],
  });
  contactId: any;
  user$ = this.store.select(selectUser);
  userDetails: any;
  messages: any = [];
  reciever: any;
  private destroy$ = new Subject<void>();
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  constructor(private location: Location, private store: Store, private http: HttpService, private fb: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((response: any) => {
      this.contactId = response?.id;
      this.reciever = response?.name
      this.getInquiry()
    })
    this.user$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)))
      .subscribe((user) => {
        this.userDetails = user;
      });
  }
  ngOnInit(): void {
    this.getHeight()
    this.width = window.innerWidth;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  routeBack() {
    this.location.back()
  };
  getHeight() {
    var element: any = document.getElementsByClassName('fixedHeight')[0]
    if (element) {
      this.height = element.offsetHeight;
    }
  }
  sendMessage() {
    const data = {
      chatContactId: this.contactId,
      message: this.messageForm.controls['message'].value
    }
    this.http.loaderPost('Chat/send', data, true).subscribe((response) => {
      this.messageForm.reset();
      this.messages.push({
        sender: this.userDetails?.fullName,
        receiver: this.reciever || null,
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
      this.reciever = response?.modelList?.[0]?.chatContact?.buyer?.fullName
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
}
