import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { baseUrl } from '../../Services/http.service';
import { HelperService, assetUrl } from '../../Services/helper.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faMagnifyingGlassPlus, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { Store } from '@ngrx/store';
import { selectUser } from '../../Ngrx/data.reducer';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { ContactPopupComponent } from '../contact-popup/contact-popup.component';
import { ResizeService } from '../../Services/resize.service';
@Component({
  standalone:true,
  imports:[CommonModule,MatIconModule,MatButtonModule, FontAwesomeModule, RouterModule],
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.scss'
})
export class PropertyCardComponent {
  faMagnifyingGlassPlus=faMagnifyingGlassPlus;
  faMapMarkerAlt=faMapMarkerAlt
  src = assetUrl
  user$ = this.store.select(selectUser);
  userDetails: any;
  @Input() card!:any;
  @Input() showBadge:boolean = false;
  @Input() loader:boolean = true;
  @Input() type!:string;
  @Input() background!:string;
  @Input() page!:string;
  private destroy$ = new Subject<void>();
  constructor(private router:Router, public resize:ResizeService, private store:Store,private dialog: MatDialog, private helper:HelperService){
    this.user$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)))
      .subscribe((user) => {
        this.userDetails = user;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit(){}
  openPopup(): void {
    this.dialog?.open(ContactPopupComponent, {
      width: window.innerWidth > 1024 ? '33%' : '100%',
      data: {type:'property',id: this.card?.id}
    });
  }
  async navigateAndClose() {
    this.router.navigate(
      ['/preview'],
      { queryParams: { id: this.card?.id, type: this.card?.propertyType } }
    );
  }
  routeToContact(card:any){
    this.router.navigate(
      ['/contact-us'],
      { queryParams: { id: card?.id,type:card?.propertyType } }
    );
  }
  createContact() {
    this.helper.createContact(this.card?.id).subscribe((response) => {
      const id = response?.model?.id;
      if (id) {
        this.router.navigateByUrl(`/dashboard/inquiries/chat/${id}`);
      }
    })
  }
}
