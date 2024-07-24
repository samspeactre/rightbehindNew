import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faNewspaper,
  faPaperPlane,
  faPlusSquare,
} from '@fortawesome/free-regular-svg-icons';
import {
  faArrowDown,
  faArrowUp,
  faComment,
  faHeart,
  faShare,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { StarRatingModule } from 'angular-star-rating';
import { CountUpModule } from 'ngx-countup';
import { MomentModule } from 'ngx-moment';
import { Subject, distinctUntilChanged, finalize, takeUntil } from 'rxjs';
import { selectUser } from '../../../Ngrx/data.reducer';
import { assetUrl } from '../../../Services/helper.service';
import { HttpService } from '../../../Services/http.service';
import { ResizeService } from '../../../Services/resize.service';
import { LoginPopupComponent } from '../../../SharedComponents/login-popup/login-popup.component';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    StarRatingModule,
    MomentModule,
    FormsModule,
    CountUpModule,
    RouterModule,
    RouterOutlet,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  src = assetUrl;
  faHeart = faHeart;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faComment = faComment;
  faShare = faShare;
  faPaperPlane = faPaperPlane;
  faPlus = faPlusSquare;
  faUsers = faUsers;
  faNewsPaper = faNewspaper;
  title!: string;
  imagePath!: string;
  id: any;
  ratingDisabled: boolean = false;
  city!: string;
  inquiries: any;
  relatedInquiries: any[] = [];
  inquiry: any;
  posts: any;
  post: any;
  comment: any;
  private destroy$ = new Subject<void>();
  user$ = this.store.select(selectUser);
  userDetails: any;
  join: boolean = false;
  constructor(
    public resize: ResizeService,
    private activatedRoute: ActivatedRoute,
    private http: HttpService,
    private router: Router,
    private store: Store,
    public dialog: MatDialog
  ) {
    this.activatedRoute.queryParams.subscribe((param: any) => {
      this.title = param?.title;
      this.id = param?.id;
      this.imagePath = param?.imagePath;
      this.city = param?.city;
      this.join =
        param?.userExistInForum && JSON.parse(param?.userExistInForum);
    });
    this.user$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((user) => {
        this.userDetails = user;
      });
  }
  ngOnInit(){
    this.getInquiries()
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getInquiries() {
    this.http
      .loaderGet('Forum/get', false)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.getRelatedInquiries();
        })
      )
      .subscribe((response) => {
        this.inquiries = response?.model?.forums;
      });
  }
  getRelatedInquiries() {
    this.http
      .loaderGet(`Forum/get?city=${this.city}&pageNo=1&pageSize=10`, false)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        if (response?.model?.forums?.length) {
          this.relatedInquiries = response?.model?.forums;
        } else {
          let relatedInquiries = this.inquiries.slice(0, 10);
          for (let i = relatedInquiries.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [relatedInquiries[i], relatedInquiries[j]] = [
              relatedInquiries[j],
              relatedInquiries[i],
            ];
          }
          this.relatedInquiries = relatedInquiries;
        }
      });
  }
  routeToCommunity(
    id: any,
    title: string,
    city: string,
    imagePath: string,
    userExistInForum: string
  ) {
    this.router.navigate(['/communities/community'], {
      queryParams: { id, title, city, imagePath, userExistInForum },
    });
  }
  leave() {
    this.http
      .loaderGet(`forum/${this.id}/user/remove`, true)
      .subscribe((response) => {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: { userExistInForum: false },
          queryParamsHandling: 'merge',
        });
      });
  }
  joinNow() {
    console.log(this.userDetails);
    
    if (this.userDetails) {
      this.joining();
    } else {
      const dialogRef = this.dialog.open(LoginPopupComponent, {
        height: '490px',
        width: window.innerWidth > 1024 ? '350px' : '100%',
        data: 'joinRequest',
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result?.data) {
          this.joining();
        }
      });
    }
  }
  joining() {
    this.http
      .loaderPost(`forum/${this.id}/user`, {}, true)
      .subscribe((response) => {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: { userExistInForum: true },
          queryParamsHandling: 'merge',
        });
      });
  }
  rating(react: any) {
    if (react != null) {
      const data = {
        forumId: this.id,
        reaction: react?.rating,
      };
      this.http.loaderPost(`Forum/rating`, data, true).subscribe(() => {
        this.ratingDisabled = true;
      });
    }
  }
}
