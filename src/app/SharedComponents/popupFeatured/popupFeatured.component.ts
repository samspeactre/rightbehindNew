import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsisVertical, faHeart, faShare, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { HelperService, assetUrl } from '../../Services/helper.service';
import { HttpService } from '../../Services/http.service';
import { MapComponent } from '../map/map.component';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  standalone: true,
  imports: [MatIconModule, MapComponent, FontAwesomeModule, CommonModule, MatDialogContent, MatButtonModule, RouterModule,FontAwesomeModule, NgbTooltipModule],
  selector: 'app-popup-featured',
  templateUrl: './popupFeatured.component.html',
  styleUrl: './popupFeatured.component.scss',
})
export class PopupFeaturedComponent implements OnInit {
  propertyData: any;
  faCheck=faCheckCircle
  private destroy$ = new Subject<void>();
  constructor(
    public dialogRef: MatDialogRef<PopupFeaturedComponent>,
    private router: Router,
    private store: Store,
    private http: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public helper:HelperService
  ) {
    this.propertyData = data?.card
    console.log(data);
    
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit() {
    this.getFeaturedList()
  }

  navigateAndClose() {
    this.dialogRef.close({ data:true });
  }
  getFeaturedList(){
    this.http.loaderGet('ProductPrice/prices/62',true).subscribe((response)=>{
      console.log(response);
    })
  }
}
