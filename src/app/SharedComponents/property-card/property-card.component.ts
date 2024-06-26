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
  constructor(private router:Router, private store:Store,private dialog: MatDialog, private helper:HelperService){
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
  openPopup(card: any): void {
    this.dialog?.open(PopupComponent, {
      height: '650px',
      width: '98%',
      data: { card: card }
    });
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
