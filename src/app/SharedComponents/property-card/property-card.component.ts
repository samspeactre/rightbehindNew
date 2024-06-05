import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone:true,
  imports:[CommonModule,MatIconModule,MatButtonModule],
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.css'
})
export class PropertyCardComponent {
  @Input() card!:any;
  @Input() showBadge:boolean = false;
  @Input() loader:boolean = true;
}
