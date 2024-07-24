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
import { HelperService } from '../../Services/helper.service';
import { HttpService } from '../../Services/http.service';
import { MapComponent } from '../map/map.component';

@Component({
  standalone: true,
  imports: [MatIconModule, MapComponent, CommonModule, MatDialogContent, MatButtonModule, RouterModule,FontAwesomeModule, NgbTooltipModule],
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent implements OnInit {
  faHeart=faHeart;
  faShare=faShareAlt
  faEllipsisVertical=faEllipsisVertical
  faRedirect=faShare
  propertyData: any;
  private destroy$ = new Subject<void>();
  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    private router: Router,
    private store: Store,
    private http: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public helper:HelperService
  ) {
    this.propertyData = data?.card
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  headings = [
    { id: 'Prop-info', title: 'Property Information' },
    { id: 'Ameneties', title: 'Amenities' },
    { id: 'Map', title: 'map' },
  ];
  chunkedFacilities: any[] = [];
  ngOnInit() {
  }

  onHeadingClick(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  chunkArray(array: any[], size: number) {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  }

  navigateAndClose() {
    this.dialogRef.close();
    setTimeout(() => {
      this.router.navigate(
        ['/preview'],
        { queryParams: { id: this.propertyData?.listingId || this.propertyData?.id, type: this.propertyData?.listingId ? 'mls' : '2' } }
      );
    });
  }
  async share() {
    try {
      await navigator.share({ title: this.propertyData?.title, url: `preview/?id=${this.propertyData?.listingId || this.propertyData?.id}&type=2` });
    } catch (err: any) {
      console.error("Share failed:", err?.message);
    }
  }

  closePopup(): void {
    this.dialogRef.close();
  }
}
