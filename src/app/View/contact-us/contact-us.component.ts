import { Component } from '@angular/core';
import { FooterComponent } from '../../SharedComponents/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { NavbarComponent } from '../../SharedComponents/navbar/navbar.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BannerComponent } from '../../SharedComponents/banner/banner.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpService } from '../../Services/http.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FooterComponent,
    MatIconModule,
    MatLabel,
    BannerComponent,
    MatFormFieldModule,
    MatInputModule,
    NavbarComponent,
    MatButtonModule,
  ],
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent {
  contact = [
    {
      num: '+12 3 456 789 ',
      email: 'info@rightnehindme.com',
      location: 'Office 123, Street abc, New york, USA',
    },
  ];
  contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contactNo: ['', Validators.required],
    message: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router
  ) {}
  onSubmit() {
    this.http
      .loaderPost('ContactUs/create', this.contactForm.value, true)
      .subscribe((response: any) => {
        this.router.navigateByUrl('/')
      });
  }
}
