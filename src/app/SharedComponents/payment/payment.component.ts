import { Component, OnDestroy } from '@angular/core';
import { PopupFeaturedComponent } from '../popupFeatured/popupFeatured.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnDestroy {
  previousData = JSON.parse(localStorage.getItem('propertyData') || 'null')
  constructor(public dialog: MatDialog, private router:Router){}
  ngOnInit(){
    if(this.previousData){
      this.showFeatured()
    }
    else{
      this.router.navigateByUrl('/dashboard/my-listings');
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
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.data) {
        this.router.navigateByUrl('/dashboard/my-listings');
      }
    });
  }
}
