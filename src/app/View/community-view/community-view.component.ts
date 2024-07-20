import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
import { selectUser } from '../../Ngrx/data.reducer';
import { assetUrl } from '../../Services/helper.service';
import { HttpService } from '../../Services/http.service';
import { ResizeService } from '../../Services/resize.service';
@Component({
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
  userExistInForum:any;
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
        this.userExistInForum = param?.userExistInForum
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
  getInquiry() {
    this.http
      .loaderGet(`Forum/get/${this.id}`, true, true)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.getPosts();
        })
      )
      .subscribe((response) => {
        this.inquiry = response?.model;
      });
  }
  getPosts() {
    this.posts = [];
    this.http
      .loaderGet(`Forum/get/${this.id}/post`, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.posts = response?.modelList;
      });
  }
  createPost() {
    const data = {
      forumId: Number(this.id),
      title: this.post,
    };
    this.http
      .loaderPost(`Forum/post/create`, data, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        if (this.posts?.length) {
          this.posts.unshift({
            user: {
              imageUrl: this.userDetails?.imageUrl,
              fullName: this.userDetails?.fullName,
            },
            createdAt: new Date(),
            title: this.post,
            id: this.posts?.length + 2,
            forumPostAnswers: [],
          });
        } else {
          this.posts.push({
            user: {
              imageUrl: this.userDetails?.imageUrl,
              fullName: this.userDetails?.fullName,
            },
            createdAt: new Date(),
            title: this.post,
            id: this.posts?.length + 2,
            forumPostAnswers: [],
          });
        }
        this.post = null;
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
        const postToUpdate = this.posts.find(
          (post: any) => post.id === commentId
        );
        if (postToUpdate) {
          if (postToUpdate.forumPostAnswers?.length) {
            postToUpdate.forumPostAnswers.unshift({
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
            postToUpdate.forumPostAnswers.push({
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
          // Reset the comment input
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
      const post = this.posts.find((post: any) => post.id === postId);
      if (post) {
        if (react) {
          if (post.userReaction) {
            if (post.isReactedByUser) {
              post.likeCount -= 1;
            } else {
              post.dislikeCount -= 1;
              post.likeCount += 1;
            }
          } else {
            post.likeCount += 1;
          }
          post.userReaction = true;
          post.isReactedByUser = true;
        } else {
          if (post.userReaction) {
            if (post.isReactedByUser) {
              post.likeCount -= 1;
              post.dislikeCount += 1;
            } else {
              post.dislikeCount -= 1;
            }
          } else {
            post.dislikeCount += 1;
          }
          post.userReaction = true;
          post.isReactedByUser = false;
        }
      }
    });
  }
  routeToCommunity(
    id:any
  ) {
    this.router.navigate(['/communities/community/'+id], {
      queryParams: { id:this.id, title:this.title, city:this.city, imagePath:this.imagePath, userExistInForum:this.userExistInForum },
    });
  }
}
