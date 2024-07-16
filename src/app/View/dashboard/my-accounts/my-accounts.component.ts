import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HttpService } from '../../../Services/http.service';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  standalone:true,
  imports:[MatIconModule, MatButtonModule],
  selector: 'app-my-accounts',
  templateUrl: './my-accounts.component.html',
  styleUrl: './my-accounts.component.scss'
})
export class MyAccountsComponent {
  private destroy$ = new Subject<void>();
  constructor(private http:HttpService){}
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit(){
    this.getTransaction()
  }
  getTransaction() {
    this.http.loaderGet('payment/get', true, true)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((response) => {
      console.log(response);
    })
  }
}
