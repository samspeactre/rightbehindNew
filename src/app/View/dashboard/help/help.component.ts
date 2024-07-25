import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HttpService } from '../../../Services/http.service';
import { selectUser } from '../../../Ngrx/data.reducer';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  standalone:true,
  imports:[FormsModule, ReactiveFormsModule],
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})
export class HelpComponent {
  text:any
  user$ = this.store.select(selectUser);
  userDetails: any;
  private destroy$ = new Subject<void>();
  constructor(private http:HttpService, private store:Store){
    this.user$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)))
      .subscribe((user) => {
        console.log(user);
        
        this.userDetails = user;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  submit(){
    const data = {
      name: this.userDetails?.fullName,
    email: this.userDetails?.email,
    contactNo: this.userDetails?.contact,
    message: this.text,
    } 
    this.http
      .loaderPost('ContactUs/create', data, true)
      .subscribe((response: any) => {
        this.text = null
      });
  }
}
