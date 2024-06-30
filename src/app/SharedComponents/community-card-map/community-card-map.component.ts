import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlassPlus, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { assetUrl } from '../../Services/helper.service';
import { MapComponent } from '../map/map.component';
@Component({
  standalone:true,
  imports:[CommonModule,MatIconModule,MatButtonModule, FontAwesomeModule, RouterModule, MapComponent],
  selector: 'app-community-card-map',
  templateUrl: './community-card-map.component.html',
  styleUrl: './community-card-map.component.scss'
})
export class CommunityCardMapComponent {
  faMagnifyingGlassPlus=faMagnifyingGlassPlus;
  faMapMarkerAlt=faMapMarkerAlt
  src = assetUrl
  @Input() card!:any;
  constructor(private router:Router){}
  ngOnInit(){}
  openPopup(propertyData: any): void {
    this.router.navigate(
      ['/preview'],
      { queryParams: { id: propertyData?.id,type:propertyData?.propertyType } }
    );
  }
}
