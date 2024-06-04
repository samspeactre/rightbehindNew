import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenu, MatMenuModule } from '@angular/material/menu';

@Component({
  standalone:true,
  imports:[MatIconModule,MatMenu,MatButtonModule, MatMenuModule, MatLabel, MatFormFieldModule, MatInputModule],
  selector: 'app-dash-nav',
  templateUrl: './dash-nav.component.html',
  styleUrl: './dash-nav.component.css'
})
export class DashNavComponent {

}
