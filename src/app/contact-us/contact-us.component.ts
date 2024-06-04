import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  contact = [
    { num: '+12 3 456 789 ', email:'info@rightnehindme.com', location:'Office 123, Street abc, New york, USA' }
  ]
}
