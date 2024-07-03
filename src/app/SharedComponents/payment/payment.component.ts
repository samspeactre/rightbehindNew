import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatLabel, MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';
import { HttpService } from '../../Services/http.service';
import { PopupComponent } from '../popup/popup.component';
import { BannerComponent } from '../banner/banner.component';
import { MiniLoadingComponent } from '../loaders/mini-loader/mini-loading.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PropertyCardComponent } from '../property-card/property-card.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { MapComponent } from '../map/map.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HelperService, types } from '../../Services/helper.service';
import { MapDrawComponent } from '../mapDraw/mapDraw.component';
import { CardCarouselComponent } from '../card-carousel/card-carousel.component';
import { CommunityCardComponent } from '../community-card/community-card.component';
import { ResizeService } from '../../Services/resize.service';
import { faMap } from '@fortawesome/free-regular-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent {
}
