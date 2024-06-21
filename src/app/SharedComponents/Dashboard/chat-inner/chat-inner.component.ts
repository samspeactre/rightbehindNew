import { CommonModule, Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chat-inner',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
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
  constructor(private location: Location) { }
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
}
