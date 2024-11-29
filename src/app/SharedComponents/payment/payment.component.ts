import { Component, OnDestroy } from '@angular/core';
import { PopupFeaturedComponent } from '../popupFeatured/popupFeatured.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnDestroy {
  previousData = JSON.parse(localStorage.getItem('propertyData') || 'null')
  constructor(public dialog: MatDialog, private router:Router, private toastr:ToastrService){}
  ngOnInit(){
    if(this.router.url?.includes('success')){
      if(this.previousData){
        this.showFeatured()
      }
      else{
        this.router.navigateByUrl('/dashboard/my-listings');
      }
    }
    else{
      this.router.navigateByUrl('/dashboard/my-listings');
      this.toastr.error("Payment Failed please try again later!")
    }
  }
  ngOnDestroy(){
    localStorage.removeItem('propertyData')
  }
  showFeatured() {
    const dialogRef = this.dialog.open(PopupFeaturedComponent, {
      height: '97%',
      width: window.innerWidth > 1024 ? '50%' : '100%',
      data: {id:this.previousData?.id,show:'Promotion'},
      scrollStrategy: new NoopScrollStrategy(),
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.data) {
        this.router.navigateByUrl('/dashboard/my-listings');
      }
    });
  }
}
