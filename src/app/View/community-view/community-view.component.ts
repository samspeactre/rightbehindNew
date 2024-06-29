import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faComment, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
@Component({
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  selector: 'app-community-view',
  templateUrl: './community-view.component.html',
  styleUrls: ['./community-view.component.scss'],
})
export class CommunityViewComponent {
  faHeart = faHeart
  faComment = faComment
  faShare = faShare
  arr=[1,2,3,4,5,6]
}
