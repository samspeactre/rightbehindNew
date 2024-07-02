import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MiniLoadingComponent } from '../../../SharedComponents/loaders/mini-loader/mini-loading.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from '../../../Services/http.service';
import { ChatPopupComponent } from '../../../SharedComponents/add-chat-popup/add-chat-popup.component';
import { InputComponent } from '../../../SharedComponents/input/input.component';

@Component({
  standalone: true,
  imports: [CommonModule, InputComponent, FormsModule, FontAwesomeModule, ReactiveFormsModule, MiniLoadingComponent],
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent {
  searchForm = this.fb.group({
    search: ['']
  });
  faPlus = faPlus;
  heading: string;
  inquiries:any;
  constructor(private fb: FormBuilder, private router: Router, public dialog: MatDialog, private http:HttpService) {
    this.heading = this.router.url.includes('inquiries') ? 'Inquiries' : 'Community Groups'
    if(this.heading == 'Inquiries'){
      this.getInquiries()
    }
  }
  openPopup(): void {
    this.dialog.open(ChatPopupComponent, {
      width: window.innerWidth > 1024 ? '33%' : '100%'
    });
  }
  getInquiries(){
    this.http.loaderGet('ChatContact/get',true,true).subscribe((response)=>{
      this.inquiries = response?.modelList
    })
  }
}
