import { Component } from '@angular/core';
import { FooterComponent } from '../../SharedComponents/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { NavbarComponent } from '../../SharedComponents/navbar/navbar.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone:true,
  imports: [FooterComponent, MatIconModule, MatLabel, MatFormFieldModule, MatInputModule, NavbarComponent, MatButtonModule],
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  contact = [
    { num: '+12 3 456 789 ', email:'info@rightnehindme.com', location:'Office 123, Street abc, New york, USA' }
  ]
}
