import { Component } from '@angular/core';
import { assetUrl } from '../../../Services/helper.service';
import {
  faComment,
  faHeart,
  faPaperPlane,
  faPlusSquare,
} from '@fortawesome/free-regular-svg-icons';
import {
  faArrowDown,
  faArrowUp,
  faNewspaper,
  faShare,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { distinctUntilChanged, finalize, Subject, takeUntil } from 'rxjs';
import { selectUser } from '../../../Ngrx/data.reducer';
import { ResizeService } from '../../../Services/resize.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpService } from '../../../Services/http.service';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { LoginPopupComponent } from '../../../SharedComponents/login-popup/login-popup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { StarRatingModule } from 'angular-star-rating';
import { MomentModule } from 'ngx-moment';
import { FormsModule } from '@angular/forms';
import { CountUpModule } from 'ngx-countup';

@Component({
  selector: 'app-community-inside',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    StarRatingModule,
    MomentModule,
    FormsModule,
    CountUpModule,
    RouterModule,
  ],
  templateUrl: './community-inside.component.html',
  styleUrl: './community-inside.component.scss',
})
export class CommunityInsideComponent {
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
  post: any;
  comment: any;
  private destroy$ = new Subject<void>();
  user$ = this.store.select(selectUser);
  userDetails: any;
  join: boolean = false;
  postId: any;
  constructor(
    public resize: ResizeService,
    private activatedRoute: ActivatedRoute,
    private http: HttpService,
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
    this.activatedRoute.paramMap.subscribe((param: any) => {
      this.postId = param?.params?.id;
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
  ngOnInit() {
    this.getPosts();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getPosts() {
    this.http
      .loaderGet(`Forum/get/${this.id}/post`, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.post = response?.modelList?.find(
          (item: any) => item?.id == this.postId
        );
      });
  }
  createComment(commentId: any) {
    const data = {
      userId: this.userDetails?.id,
      forumPostId: Number(commentId),
      answer: this.comment,
    };
    this.http
      .loaderPost(`Forum/post/answer/create`, data, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        if (this.post) {
          if (this.post?.forumPostAnswers?.length) {
            this.post?.forumPostAnswers.unshift({
              id: response.id,
              forumPostId: commentId,
              userId: this.userDetails?.id,
              answer: this.comment,
              createdAt: new Date(),
              user: {
                imageUrl: this.userDetails?.imageUrl,
                fullName: this.userDetails?.fullName,
              },
            });
          } else {
            this.post?.forumPostAnswers.push({
              id: response.id,
              forumPostId: commentId,
              userId: this.userDetails?.id,
              answer: this.comment,
              createdAt: new Date(),
              user: {
                imageUrl: this.userDetails?.imageUrl,
                fullName: this.userDetails?.fullName,
              },
            });
          }
          this.comment = null;
        }
      });
  }
  react(react: boolean, postId: number) {
    const data = {
      forumPostId: postId,
      reaction: react,
    };
    this.http.loaderPost(`Forum/post/reaction`, data, true).subscribe(() => {
      if (this.post) {
        if (react) {
          if (this.post.userReaction) {
            if (this.post.isReactedByUser) {
              this.post.likeCount -= 1;
            } else {
              this.post.dislikeCount -= 1;
              this.post.likeCount += 1;
            }
          } else {
            this.post.likeCount += 1;
          }
          this.post.userReaction = true;
          this.post.isReactedByUser = true;
        } else {
          if (this.post.userReaction) {
            if (this.post.isReactedByUser) {
              this.post.likeCount -= 1;
              this.post.dislikeCount += 1;
            } else {
              this.post.dislikeCount -= 1;
            }
          } else {
            this.post.dislikeCount += 1;
          }
          this.post.userReaction = true;
          this.post.isReactedByUser = false;
        }
      }
    });
  }
}
