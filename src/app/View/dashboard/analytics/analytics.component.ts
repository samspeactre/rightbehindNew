import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HttpService } from '../../../Services/http.service';
import { PropertyCardComponent } from '../../../SharedComponents/property-card/property-card.component';
import { finalize } from 'rxjs';

@Component({
  standalone:true,
  imports:[MatIconModule, MatButtonModule, PropertyCardComponent],
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {
  anylytics:any=[]
  loader:boolean = true
  constructor(private http:HttpService){

  }
  ngOnInit(){
    this.getData()
  }
  getData(){
    this.http.loaderGet('property/get/analytics',true)
    .pipe(finalize(()=>{
      this.loader = false
    }))
    .subscribe((response)=>{
      this.anylytics = response?.modelList
    })
  }
}
