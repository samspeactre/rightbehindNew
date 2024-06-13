import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { baseUrl } from '../../Services/http.service';
import { assetUrl } from '../../Services/helper.service';
@Component({
  standalone:true,
  imports:[CommonModule,MatIconModule,MatButtonModule, RouterModule],
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.scss'
})
export class PropertyCardComponent {
  src = assetUrl
  @Input() card!:any;
  @Input() showBadge:boolean = false;
  @Input() loader:boolean = true;
  @Input() type!:string;
  @Input() background!:string;
  constructor(private router:Router){}
  navigate(propertyData:any) {
    this.router.navigate(
      ['/preview'],
      { queryParams: { id: propertyData?.id,type:propertyData?.propertyType } }
    );
  }
  routeToContact(card:any){
    this.router.navigate(
      ['/contact-us'],
      { queryParams: { id: card?.id,type:card?.propertyType } }
    );
  }
}
