import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPaperPlane,
  faPlusSquare,
} from '@fortawesome/free-regular-svg-icons';
import {
  faArrowDown,
  faArrowUp,
  faComment,
  faHeart,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import { ResizeService } from '../../Services/resize.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../Services/http.service';
import { Subject, distinctUntilChanged, finalize, takeUntil } from 'rxjs';
import { assetUrl } from '../../Services/helper.service';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { selectUser } from '../../Ngrx/data.reducer';
import { Store } from '@ngrx/store';

@Component({
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, MomentModule, FormsModule],
  selector: 'app-community-view',
  templateUrl: './community-view.component.html',
  styleUrls: ['./community-view.component.scss'],
})
export class CommunityViewComponent {
  src = assetUrl;
  faHeart = faHeart;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faComment = faComment;
  faShare = faShare;
  faPaperPlane = faPaperPlane;
  faPlus = faPlusSquare;
  title!: string;
  imagePath!:string;
  id: any;
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
  constructor(
    public resize: ResizeService,
    private activatedRoute: ActivatedRoute,
    private http: HttpService,
    private router: Router,
    private store: Store
  ) {
    this.activatedRoute.queryParams.subscribe((param: any) => {
      this.title = param?.title;
      this.id = param?.id;
      this.imagePath = param?.imagePath;
      this.city = param?.city;
      this.getInquiry();
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
        console.log(user);
      });
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
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.getPosts();
        })
      )
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
  getInquiry() {
    this.http
      .loaderGet(`Forum/get/${this.id}`, true)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.getInquiries();
        })
      )
      .subscribe((response) => {
        this.inquiry = response?.model;
      });
  }
  getPosts() {
    this.http
      .loaderGet(`Forum/get/${this.id}/post`, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.posts = response?.modelList;
      });
  }
  createPost() {
    const data = {
      forumId:  Number(this.id),
      title: this.post,
    };
    this.http
      .loaderPost(`Forum/post/create`, data, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.posts.unshift({
          user: {
            imageUrl: this.userDetails?.imageUrl,
            fullName: this.userDetails?.fullName,
          },
          createdAt: new Date(),
          title: this.post,
        });
        this.post = null;
      });
  }
  createComment(commentId: any) {
    const data = {
      id: commentId,
      userId: this.userDetails?.id,
      forumId: Number(this.id),
      answer: this.comment,
    };
    this.http
      .loaderPost(`Forum/post/answer/create`, data, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        const postToUpdate = this.posts.find(
          (post: any) => post.id === this.id
        );

        if (postToUpdate) {
          postToUpdate.forumPostAnswers.unshift({
            id: response.id,
            forumPostId: this.id,
            userId: this.userDetails?.id,
            answer: this.comment,
            createdAt: new Date(),
            user: {
              imageUrl: this.userDetails?.imageUrl,
              fullName: this.userDetails?.fullName,
            },
          });

          // Reset the comment input
          this.comment = null;
        }
      });
  }
  routeToCommunity(id: any, title: string, city: string, imagePath:string) {
    this.router.navigate(['/communities/community'], {
      queryParams: { id, title, city, imagePath },
    });
  }
}
