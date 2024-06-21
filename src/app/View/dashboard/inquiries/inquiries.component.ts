import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from '../../../SharedComponents/input/input.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [MatIconModule, MatButtonModule, InputComponent, FormsModule, ReactiveFormsModule, FontAwesomeModule, RouterModule],
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrl: './inquiries.component.scss'
})
export class InquiriesComponent {
  searchForm = this.fb.group({
    search: ['']
  });
  faPlus = faPlus;
  heading:string;
  constructor(private fb: FormBuilder, private router:Router) {
    this.heading = this.router.url.includes('inquiries') ? 'Inquiries' : 'Community Groups'
   }
}
