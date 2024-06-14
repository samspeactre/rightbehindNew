import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dash-nav',
  templateUrl: './dash-nav.component.html',
  styleUrl: './dash-nav.component.css'
})
export class DashNavComponent {
  @Input() sectionName!: string;
}
