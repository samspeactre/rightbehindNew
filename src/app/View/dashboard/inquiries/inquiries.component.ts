import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from '../../../SharedComponents/input/input.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterModule } from '@angular/router';
import { ChatPopupComponent } from '../../../SharedComponents/add-chat-popup/add-chat-popup.component';
import { HttpService } from '../../../Services/http.service';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';

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
  heading: string;
  inquiries:any;
  private destroy$ = new Subject<void>();
  constructor(private fb: FormBuilder, private router: Router, public dialog: MatDialog, private http:HttpService) {
    this.heading = this.router.url.includes('inquiries') ? 'Inquiries' : 'Community Groups'
    if(this.heading == 'Inquiries'){
      this.getInquiries()
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  openPopup(): void {
    let dialogRef = this.dialog.open(ChatPopupComponent, {
      height: '95%',
      width: window.innerWidth > 1024 ? '33%' : '100%'
    });
  }
  getInquiries(){
    this.http.loaderGet('ChatContact/get',true)
    .pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      )
    )
    .subscribe((response)=>{
      this.inquiries = response?.modelList
    })
  }
}
