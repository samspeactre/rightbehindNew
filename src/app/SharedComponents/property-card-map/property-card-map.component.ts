import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBath,
  faBed,
  faMagnifyingGlassPlus,
  faMapMarkerAlt,
  faRulerCombined,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FontAwesomeModule,
    RouterModule,
  ],
  selector: 'app-property-card-map',
  templateUrl: './property-card-map.component.html',
  styleUrl: './property-card-map.component.scss',
})
export class PropertyCardMapComponent {
  faMagnifyingGlassPlus = faMagnifyingGlassPlus;
  faMapMarkerAlt = faMapMarkerAlt;
  faBed = faBed;
  faBath = faBath;
  faRuler = faRulerCombined;
  cardData!: any;
  @Input() set card(data: any) {
    this.cardData = data;
  }
  constructor(private router: Router) {}
  ngOnInit() {}
  openPopup(propertyData: any): void {
    this.router.navigate(['/preview'], {
      queryParams: { id: propertyData?.id, type: propertyData?.propertyType },
    });
  }
}
