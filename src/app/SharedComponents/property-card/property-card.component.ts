import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  standalone:true,
  imports:[CommonModule,MatIconModule,MatButtonModule, RouterModule],
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.css'
})
export class PropertyCardComponent {
  @Input() card!:any;
  @Input() showBadge:boolean = false;
  @Input() loader:boolean = true;
  @Input() type!:string;
  @Input() background!:string;
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.card,this.background,this.type);
    
  }
}
