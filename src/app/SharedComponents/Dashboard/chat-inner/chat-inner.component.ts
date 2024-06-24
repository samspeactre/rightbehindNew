import { CommonModule, Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from '../../../Services/http.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
  contactId: any
  constructor(private location: Location, private http: HttpService, private fb: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((response: any) => {
      this.contactId = response?.id
    })
  }
  ngOnInit(): void {
    this.getHeight()
    this.width = window.innerWidth;
  }
  messages: any = [
    {
      sender: 'BOT',
      receiver: 'Sajad',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
      time: '12:45'
    },
    {
      sender: 'Sajad',
      receiver: 'BOT',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit...',
      time: '12:46'
    },
    {
      sender: 'BOT',
      receiver: 'Sajad',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
      time: '12:45'
    },
    {
      sender: 'Sajad',
      receiver: 'BOT',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit...',
      time: '12:46'
    },
    {
      sender: 'Sajad',
      receiver: 'BOT',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit...',
      time: '12:46'
    },
    {
      sender: 'Sajad',
      receiver: 'BOT',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit...',
      time: '12:46'
    },
    {
      sender: 'BOT',
      receiver: 'Sajad',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
      time: '12:45'
    }
  ];
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
      console.log('====================================');
      console.log(response);
      console.log('====================================');
      this.messageForm.reset()
    })
  }
}
