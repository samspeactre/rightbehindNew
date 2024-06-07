import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
  Inject,
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
import { selectPopupState } from '../../Ngrx/data.reducer';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { HttpService } from '../../Services/http.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [MatIconModule, CommonModule, MatDialogContent, MatButtonModule, RouterModule],
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css',
})
export class PopupComponent implements OnInit {
  popUpId$ = this.store.select(selectPopupState);
  popUpId: any;
  propertyData:any;
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
    // this.getPropertyDetail(data?.card?.id);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  // getPropertyDetail(id: number) {
  //   this.http.loaderGet(`Property/get/${id}`, false).subscribe(
  //     (response) => {
  //       console.log(response);
  //     },
  //     (err) => {
  //       this.dialogRef.close();
  //     }
  //   );
  // }
  Appartment = [
    {
      propertyid: '123145',
      head: 'New Apartment Nice View',
      address: 'Quincy St, Brooklyn, NY, USA',
      bed: '03',
      bath: '02',
      sqft: '1,200',
      price: '25,000',
    },
  ];

  PropInfo = [
    {
      type: 'House',
      area: '2,160 sqft',
      price: 'USD 100K',
      purpose: 'For Sale',
      location: 'Miami, Florida',
      bedroom: '9',
      bath: '6',
      added: '2 days ago',
    },
  ];

  Propdetail = [
    {
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum.Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis. lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum.',
    },
  ];

  amenities = {
    facilities: [
      'Air Conditioning',
      'Lawn',
      'Swimming Pool',
      'Barbeque',
      'Microwave',
      'Wide-Open Spaces',
      'TV Cable',
      'Dryer',
      'Outdoor Shower',
      'Washer',
      'Gym',
    ],
  };

  Gallery: string[] = [
    '../../assets/img/popup-gallery.jpg',
    '../../assets/img/popup-gallery.jpg',
    '../../assets/img/popup-gallery.jpg',
    '../../assets/img/popup-gallery.jpg',
    '../../assets/img/popup-gallery.jpg',
    '../../assets/img/popup-gallery.jpg',
    // Add more image URLs as needed
  ];

  @ViewChild('videoPlayer') videoPlayer: any;
  videoSource: string = '../../assets/video/popup-video.mp4'; // Set the path to your video file
  thumbnailSource: string = '../../assets/img/popup-gallery.jpg'; // Set the path to your thumbnail image
  showVideo: boolean = false;

  // onMetadataLoaded() {
  //   this.videoPlayer.nativeElement.pause();
  // }

  toggleVideo() {
    this.showVideo = true;
    this.videoPlayer.nativeElement.play();
  }

  @ViewChild('sliderTrack') sliderTrack!: ElementRef;
  headings = [
    { id: 'Prop-info', title: 'Property Information' },
    { id: 'prop-deatil', title: 'Property Details' },
    { id: 'Ameneties', title: 'Amenities' },
    { id: 'Gallery', title: 'Gallery' },
    { id: 'Video', title: 'Videos' },
    { id: 'Map', title: 'map' },
  ];

  private isDragging = false;
  private startX = 0;
  private startScrollLeft = 0;
  chunkedFacilities: any[] = [];
  ngOnInit() {
    this.startAutoPlay();
    this.chunkedFacilities = this.chunkArray(this.amenities.facilities, 6);
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
    this.router.navigate(['/preview']);
  }
}
