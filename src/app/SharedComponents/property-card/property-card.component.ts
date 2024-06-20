import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { baseUrl } from '../../Services/http.service';
import { assetUrl } from '../../Services/helper.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faMagnifyingGlassPlus, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
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
  @Input() card!:any;
  @Input() showBadge:boolean = false;
  @Input() loader:boolean = true;
  @Input() type!:string;
  @Input() background!:string;
  @Input() page!:string;
  constructor(private router:Router, private dialog: MatDialog){}
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
}
