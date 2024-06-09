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
import { faEllipsisVertical, faHeart, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  standalone: true,
  imports: [MatIconModule, CommonModule, MatDialogContent, MatButtonModule, RouterModule,FontAwesomeModule],
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent implements OnInit {
  faHeart=faHeart;
  faShare=faShareAlt
  faEllipsisVertical=faEllipsisVertical
  popUpId$ = this.store.select(selectPopupState);
  popUpId: any;
  propertyData: any;
  private destroy$ = new Subject<void>();
  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    private router: Router,
    private store: Store,
    private http: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data?.card);
    this.propertyData = data?.card
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  @ViewChild('sliderTrack') sliderTrack!: ElementRef;
  headings = [
    { id: 'Prop-info', title: 'Property Information' },
    { id: 'prop-deatil', title: 'Property Details' },
    { id: 'Ameneties', title: 'Amenities' },
    { id: 'Map', title: 'map' },
  ];

  private isDragging = false;
  private startX = 0;
  private startScrollLeft = 0;
  chunkedFacilities: any[] = [];
  ngOnInit() {
    this.startAutoPlay();
  }

  startAutoPlay() {
    if (this.sliderTrack) {
      this.sliderTrack.nativeElement.style.animationPlayState = 'running';
    }
  }

  stopAutoPlay() {
    if (this.sliderTrack) {
      this.sliderTrack.nativeElement.style.animationPlayState = 'paused';
    }
  }

  onHeadingClick(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.clientX;
    if (this.sliderTrack) {
      this.startScrollLeft = this.sliderTrack.nativeElement.scrollLeft;
    }
    this.stopAutoPlay();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    const distance = event.clientX - this.startX;
    if (this.sliderTrack) {
      this.sliderTrack.nativeElement.scrollLeft =
        this.startScrollLeft - distance;
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.isDragging = false;
    this.startAutoPlay();
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) {
    this.isDragging = false;
    this.startAutoPlay();
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
