import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-inner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-inner.component.html',
  styleUrl: './chat-inner.component.scss'
})
export class ChatInnerComponent {
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
    }
  ];
}
