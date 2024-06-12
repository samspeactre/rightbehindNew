import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { selectPopupState } from '../../Ngrx/data.reducer';
import { HttpService } from '../../Services/http.service';
import { faEllipsisVertical, faHeart, faShare, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperService } from '../../Services/helper.service';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  imports: [MatIconModule, CommonModule, MatDialogContent, MatButtonModule, RouterModule,FontAwesomeModule, NgbTooltipModule],
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent implements OnInit {
  faHeart=faHeart;
  faShare=faShareAlt
  faEllipsisVertical=faEllipsisVertical
  faRedirect=faShare
  popUpId$ = this.store.select(selectPopupState);
  popUpId: any;
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
        { queryParams: { id: this.propertyData?.id, type: this.propertyData?.propertyType } }
      );
    });
  }
}
