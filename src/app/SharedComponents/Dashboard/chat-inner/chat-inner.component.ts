import { CommonModule, Location } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { LoaderService } from '../../../Services/loader.service';

@Component({
  selector: 'app-chat-inner',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './chat-inner.component.html',
  styleUrl: './chat-inner.component.scss'
})
export class ChatInnerComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faPaperPlane = faPaperPlane;
  height: number = 0;
  width = window.innerWidth;
  constructor(private location: Location, private cd: ChangeDetectorRef) {
    console.log('helo')
  }
  ngOnInit() {
    console.log('helo')
    this.observe()
  }
  ngAfterViewInit() {
    this.observe()
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
  }
  async observe() {
    LoaderService.dashboardHeight.subscribe((res: number) => {
      this.height = res;
      console.log('====================================');
      console.log(res);
      console.log('====================================');
      this.cd.detectChanges();
    });
  }
}
